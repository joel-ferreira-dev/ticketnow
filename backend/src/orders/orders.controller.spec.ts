import { Test, TestingModule } from "@nestjs/testing";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Order } from "./order.entity";
import { OrderItem } from "./order-item.entity";

const mockOrder: Partial<Order> = {
    id: 1,
    customerName: "João Silva",
    customerEmail: "joao@email.com",
    paymentMethod: "pix",
    totalPrice: 300,
    status: "CONFIRMED",
    createdAt: new Date("2025-01-01"),
    items: [
        { id: 1, eventId: 1, quantity: 2, unitPrice: 100, orderId: 1 } as OrderItem,
        { id: 2, eventId: 2, quantity: 1, unitPrice: 100, orderId: 1 } as OrderItem,
    ],
};

const mockOrdersService = {
    create: jest.fn().mockResolvedValue(mockOrder),
    findOne: jest.fn().mockResolvedValue(mockOrder),
    findAll: jest.fn().mockResolvedValue([mockOrder]),
};

describe("OrdersController", () => {
    let controller: OrdersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [
                { provide: OrdersService, useValue: mockOrdersService },
            ],
        }).compile();

        controller = module.get<OrdersController>(OrdersController);
        jest.clearAllMocks();
    });

    describe("POST /orders", () => {
        it("should create an order with cart items", async () => {
            const dto = {
                customerName: "João Silva",
                customerEmail: "joao@email.com",
                paymentMethod: "pix",
                items: [
                    { eventId: 1, quantity: 2 },
                    { eventId: 2, quantity: 1 },
                ],
            };

            const result = await controller.create(dto);
            expect(result).toEqual(mockOrder);
            expect(mockOrdersService.create).toHaveBeenCalledWith(dto);
        });
    });

    describe("GET /orders", () => {
        it("should return all orders", async () => {
            const result = await controller.findAll();
            expect(result).toEqual([mockOrder]);
            expect(mockOrdersService.findAll).toHaveBeenCalled();
        });
    });

    describe("GET /orders/:id", () => {
        it("should return an order by id", async () => {
            const result = await controller.findOne(1);
            expect(result).toEqual(mockOrder);
            expect(mockOrdersService.findOne).toHaveBeenCalledWith(1);
        });
    });
});
