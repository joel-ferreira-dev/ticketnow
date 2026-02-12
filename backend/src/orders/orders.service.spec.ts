import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Order } from "./order.entity";
import { OrderItem } from "./order-item.entity";
import { EventsService } from "../events/events.service";
import { Repository, DataSource } from "typeorm";

const mockEvent1 = {
    id: 1,
    title: "Rock in Rio",
    price: 100,
    availableTickets: 500,
};

const mockEvent2 = {
    id: 2,
    title: "Lollapalooza",
    price: 200,
    availableTickets: 300,
};

const mockSavedOrder: Partial<Order> = {
    id: 1,
    customerName: "João Silva",
    customerEmail: "joao@email.com",
    paymentMethod: "pix",
    totalPrice: 400,
    status: "CONFIRMED",
    items: [
        { id: 1, eventId: 1, quantity: 2, unitPrice: 100, orderId: 1 } as OrderItem,
        { id: 2, eventId: 2, quantity: 1, unitPrice: 200, orderId: 1 } as OrderItem,
    ],
};

const mockOrderRepository = {
    create: jest.fn().mockReturnValue(mockSavedOrder),
    save: jest.fn().mockResolvedValue(mockSavedOrder),
    findOne: jest.fn().mockResolvedValue(mockSavedOrder),
    find: jest.fn().mockResolvedValue([mockSavedOrder]),
};

const mockOrderItemRepository = {};

const mockEventsService = {
    findOne: jest.fn(),
    findByIds: jest.fn(),
    decreaseAvailableTickets: jest.fn().mockResolvedValue(undefined),
};

const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
        createQueryBuilder: jest.fn(() => ({
            update: jest.fn().mockReturnThis(),
            set: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue({ affected: 1 }),
        })),
        create: jest.fn().mockReturnValue(mockSavedOrder),
        save: jest.fn().mockResolvedValue(mockSavedOrder),
    },
};

const mockDataSource = {
    createQueryRunner: jest.fn(() => mockQueryRunner),
};

describe("OrdersService", () => {
    let service: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                { provide: getRepositoryToken(Order), useValue: mockOrderRepository },
                { provide: getRepositoryToken(OrderItem), useValue: mockOrderItemRepository },
                { provide: EventsService, useValue: mockEventsService },
                { provide: DataSource, useValue: mockDataSource },
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("should create an order with multiple items", async () => {
            mockEventsService.findByIds.mockResolvedValueOnce([mockEvent1, mockEvent2]);
            mockQueryRunner.manager.create.mockReturnValueOnce(mockSavedOrder);
            mockQueryRunner.manager.save.mockResolvedValueOnce(mockSavedOrder);
            mockOrderRepository.findOne.mockResolvedValueOnce(mockSavedOrder);

            const result = await service.create({
                customerName: "João Silva",
                customerEmail: "joao@email.com",
                paymentMethod: "pix",
                items: [
                    { eventId: 1, quantity: 2 },
                    { eventId: 2, quantity: 1 },
                ],
            });

            expect(result).toEqual(mockSavedOrder);
            expect(mockEventsService.findByIds).toHaveBeenCalledWith([1, 2]);
            expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
            expect(mockQueryRunner.release).toHaveBeenCalled();
        });

        it("should create an order with a single item", async () => {
            mockEventsService.findByIds.mockResolvedValueOnce([mockEvent1]);
            const singleOrder = { ...mockSavedOrder, totalPrice: 300, items: [mockSavedOrder.items![0]] };
            mockQueryRunner.manager.create.mockReturnValueOnce(singleOrder);
            mockQueryRunner.manager.save.mockResolvedValueOnce(singleOrder);
            mockOrderRepository.findOne.mockResolvedValueOnce(singleOrder);

            const result = await service.create({
                customerName: "Maria",
                customerEmail: "maria@email.com",
                items: [{ eventId: 1, quantity: 3 }],
            });

            expect(result).toEqual(singleOrder);
            expect(mockEventsService.findByIds).toHaveBeenCalledWith([1]);
        });

        it("should throw BadRequestException when items is empty", async () => {
            await expect(
                service.create({
                    customerName: "João",
                    customerEmail: "joao@email.com",
                    items: [],
                }),
            ).rejects.toThrow(BadRequestException);
        });

        it("should throw BadRequestException when not enough tickets", async () => {
            mockEventsService.findByIds.mockResolvedValueOnce([{
                ...mockEvent1,
                availableTickets: 1,
            }]);

            await expect(
                service.create({
                    customerName: "João",
                    customerEmail: "joao@email.com",
                    items: [{ eventId: 1, quantity: 5 }],
                }),
            ).rejects.toThrow(BadRequestException);
            expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
        });

        it("should throw when second item has insufficient tickets in DB", async () => {
            mockEventsService.findByIds.mockResolvedValueOnce([mockEvent1, mockEvent2]);

            mockQueryRunner.manager.createQueryBuilder()
                .execute
                .mockResolvedValueOnce({ affected: 1 })
                .mockResolvedValueOnce({ affected: 0 });

            await expect(
                service.create({
                    customerName: "João",
                    customerEmail: "joao@email.com",
                    items: [
                        { eventId: 1, quantity: 1 },
                        { eventId: 2, quantity: 1 },
                    ],
                }),
            ).rejects.toThrow(BadRequestException);
            expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
        });

        it("should default paymentMethod to pix", async () => {
            mockEventsService.findByIds.mockResolvedValueOnce([mockEvent1]);
            mockQueryRunner.manager.create.mockReturnValueOnce(mockSavedOrder);
            mockQueryRunner.manager.save.mockResolvedValueOnce(mockSavedOrder);
            mockOrderRepository.findOne.mockResolvedValueOnce(mockSavedOrder);

            await service.create({
                customerName: "João",
                customerEmail: "joao@email.com",
                items: [{ eventId: 1, quantity: 1 }],
            });

            expect(mockQueryRunner.manager.create).toHaveBeenCalledWith(
                expect.any(Function),
                expect.objectContaining({ paymentMethod: "pix" }),
            );
        });
    });

    describe("findOne", () => {
        it("should return an order with items and events", async () => {
            mockOrderRepository.findOne.mockResolvedValueOnce(mockSavedOrder);
            const result = await service.findOne(1);
            expect(result).toEqual(mockSavedOrder);
            expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
                relations: ["items", "items.event"],
            });
        });

        it("should throw NotFoundException when order not found", async () => {
            mockOrderRepository.findOne.mockResolvedValueOnce(null);
            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe("findAll", () => {
        it("should return all orders ordered by createdAt DESC", async () => {
            mockOrderRepository.find.mockResolvedValueOnce([mockSavedOrder]);
            const result = await service.findAll();
            expect(result).toEqual([mockSavedOrder]);
            expect(mockOrderRepository.find).toHaveBeenCalledWith({
                relations: ["items", "items.event"],
                order: { createdAt: "DESC" },
            });
        });
    });
});
