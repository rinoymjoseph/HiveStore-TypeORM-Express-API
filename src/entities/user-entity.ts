import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { OrderEntity } from "./order-entity";

@Entity("user")
export class UserEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;

    @Column({ name: "FirstName", length: 100 })
    firstName: string;

    @Column({ name: "LastName", length: 100 })
    lastName: string;

    @Column({ name: "Email", length: 100 })
    email: string;

    @OneToMany(type => OrderEntity, order => order.user)
    orders: OrderEntity[];
}