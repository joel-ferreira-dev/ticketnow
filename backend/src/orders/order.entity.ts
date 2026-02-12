import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column()
    customerEmail: string;

    @Column("decimal", { precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ default: "pix" })
    paymentMethod: string;

    @Column({ default: "CONFIRMED" })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
    items: OrderItem[];
}
