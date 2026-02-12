import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { OrderItem } from "./order-item.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { EventsService } from "../events/events.service";

import { Event } from "../events/event.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemsRepository: Repository<OrderItem>,
        private readonly eventsService: EventsService,
    ) { }

    async create(dto: CreateOrderDto): Promise<Order> {
        if (!dto.items || dto.items.length === 0) {
            throw new BadRequestException("O pedido deve conter pelo menos um item");
        }

        // Validate all items first
        const eventDetails: Array<{ event: Event; quantity: number }> = [];
        for (const item of dto.items) {
            const event = await this.eventsService.findOne(item.eventId);
            if (event.availableTickets < item.quantity) {
                throw new BadRequestException(
                    `Ingressos insuficientes para "${event.title}". Disponível: ${event.availableTickets}`,
                );
            }
            eventDetails.push({ event, quantity: item.quantity });
        }

        // Calculate total
        const totalPrice = eventDetails.reduce(
            (sum, { event, quantity }) => sum + Number(event.price) * quantity,
            0,
        );

        // Create order with items
        const order = this.ordersRepository.create({
            customerName: dto.customerName,
            customerEmail: dto.customerEmail,
            paymentMethod: dto.paymentMethod || "pix",
            totalPrice,
            status: "CONFIRMED",
            items: eventDetails.map(({ event, quantity }) => {
                const orderItem = new OrderItem();
                orderItem.eventId = event.id;
                orderItem.quantity = quantity;
                orderItem.unitPrice = Number(event.price);
                return orderItem;
            }),
        });

        const savedOrder = await this.ordersRepository.save(order);

        // Decrease available tickets
        for (const { event, quantity } of eventDetails) {
            await this.eventsService.decreaseAvailableTickets(event.id, quantity);
        }

        return this.findOne(savedOrder.id);
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ["items", "items.event"],
        });
        if (!order) {
            throw new NotFoundException(`Pedido #${id} não encontrado`);
        }
        return order;
    }

    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find({
            relations: ["items", "items.event"],
            order: { createdAt: "DESC" },
        });
    }
}
