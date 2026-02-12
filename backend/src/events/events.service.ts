import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./event.entity";

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
    ) { }

    async findAll(): Promise<Event[]> {
        return this.eventsRepository.find({ order: { date: "ASC" } });
    }

    async findOne(id: number): Promise<Event> {
        const event = await this.eventsRepository.findOneBy({ id });
        if (!event) {
            throw new NotFoundException(`Evento #${id} não encontrado`);
        }
        return event;
    }

    async decreaseAvailableTickets(id: number, quantity: number): Promise<void> {
        await this.eventsRepository
            .createQueryBuilder()
            .update(Event)
            .set({ availableTickets: () => `"availableTickets" - ${quantity}` })
            .where("id = :id AND \"availableTickets\" >= :quantity", { id, quantity })
            .execute();
    }
}
