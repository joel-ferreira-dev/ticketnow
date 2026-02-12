import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
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
        private readonly dataSource: DataSource,
    ) { }

    async create(dto: CreateOrderDto): Promise<Order> {
        if (!dto.items || dto.items.length === 0) {
            throw new BadRequestException("O pedido deve conter pelo menos um item");
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const eventIds = dto.items.map(i => i.eventId);
            const events = await this.eventsService.findByIds(eventIds);

            const eventMap = new Map(events.map(e => [e.id, e]));
            const orderItems: OrderItem[] = [];
            let totalPrice = 0;

            for (const item of dto.items) {
                const event = eventMap.get(item.eventId);
                if (!event) {
                    throw new BadRequestException(`Evento #${item.eventId} não encontrado`);
                }

                if (event.availableTickets < item.quantity) {
                    throw new BadRequestException(
                        `Ingressos insuficientes para "${event.title}". Disponíveis: ${event.availableTickets}`,
                    );
                }

                const orderItem = new OrderItem();
                orderItem.eventId = event.id;
                orderItem.quantity = item.quantity;
                orderItem.unitPrice = Number(event.price);
                orderItems.push(orderItem);

                totalPrice += orderItem.unitPrice * item.quantity;

                const updateResult = await queryRunner.manager
                    .createQueryBuilder()
                    .update(Event)
                    .set({ availableTickets: () => `"availableTickets" - ${item.quantity}` })
                    .where("id = :id AND \"availableTickets\" >= :quantity", {
                        id: event.id,
                        quantity: item.quantity
                    })
                    .execute();

                if (updateResult.affected === 0) {
                    throw new BadRequestException(`Não foi possível reservar ingressos para "${event.title}". Talvez tenham esgotado.`);
                }
            }

            const order = queryRunner.manager.create(Order, {
                customerName: dto.customerName,
                customerEmail: dto.customerEmail,
                paymentMethod: dto.paymentMethod || "pix",
                totalPrice,
                status: "CONFIRMED",
                items: orderItems,
            });

            const savedOrder = await queryRunner.manager.save(order);
            await queryRunner.commitTransaction();

            return this.findOne(savedOrder.id);
        } catch (err) {
            await queryRunner.rollbackTransaction();
            if (err instanceof BadRequestException) throw err;
            throw new InternalServerErrorException("Erro ao processar o pedido: " + err.message);
        } finally {
            await queryRunner.release();
        }
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
