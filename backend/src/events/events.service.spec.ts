import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EventsService } from "./events.service";
import { Event } from "./event.entity";
import { NotFoundException } from "@nestjs/common";

const mockEvent: Partial<Event> = {
    id: 1,
    title: "Test Event",
    description: "A test event",
    date: new Date("2025-06-15T20:00:00"),
    location: "Test Venue",
    price: 100,
    imageUrl: "https://example.com/image.jpg",
    capacity: 1000,
    availableTickets: 500,
    category: "Show",
};

const mockRepository = {
    find: jest.fn().mockResolvedValue([mockEvent]),
    findOneBy: jest.fn().mockResolvedValue(mockEvent),
    createQueryBuilder: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ affected: 1 }),
    }),
};

describe("EventsService", () => {
    let service: EventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventsService,
                { provide: getRepositoryToken(Event), useValue: mockRepository },
            ],
        }).compile();

        service = module.get<EventsService>(EventsService);
    });

    it("should return all events", async () => {
        const result = await service.findAll();
        expect(result).toEqual([mockEvent]);
        expect(mockRepository.find).toHaveBeenCalledWith({ order: { date: "ASC" } });
    });

    it("should return a single event by id", async () => {
        const result = await service.findOne(1);
        expect(result).toEqual(mockEvent);
        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it("should throw NotFoundException when event not found", async () => {
        mockRepository.findOneBy.mockResolvedValueOnce(null);
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it("should decrease available tickets", async () => {
        await service.decreaseAvailableTickets(1, 2);
        expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    });
});
