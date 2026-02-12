import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { EventsService } from "./events.service";
import { Event } from "./event.entity";

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    findAll(): Promise<Event[]> {
        return this.eventsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Event> {
        return this.eventsService.findOne(id);
    }
}
