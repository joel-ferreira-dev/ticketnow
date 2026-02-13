import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { OrderItem } from "../orders/order-item.entity";

@Entity("events")
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column("timestamp")
    date: Date;

    @Column()
    location: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column()
    imageUrl: string;

    @Column("int")
    capacity: number;

    @Column("int")
    availableTickets: number;

    @Column()
    category: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => OrderItem, (item) => item.event)
    orderItems: OrderItem[];
}
