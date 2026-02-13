import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Event } from "../events/event.entity";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    quantity: number;

    @Column("decimal", { precision: 10, scale: 2 })
    unitPrice: number;

    @Column()
    eventId: number;

    @Column()
    orderId: number;

    @ManyToOne(() => Event, (event) => event.orderItems)
    @JoinColumn({ name: "eventId" })
    event: Event;

    @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId" })
    order: Order;
}
