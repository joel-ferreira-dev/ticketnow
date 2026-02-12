import { Controller, Post, Body, Get, Param, ParseIntPipe } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./order.entity";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    create(@Body() dto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(dto);
    }

    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Order> {
        return this.ordersService.findOne(id);
    }
}
