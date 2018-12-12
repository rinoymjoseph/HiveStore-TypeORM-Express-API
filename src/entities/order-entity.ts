import {Entity, Column,  PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { OrderDetailsEntity } from "./order-details";
import { UserEntity } from "./user-entity";

@Entity("order")
export class OrderEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;

    @Column({ name: "RequiredDate",  nullable: true  })
    requiredDate: Date;

    @Column({ name: "Address", length: 200 })
    address: string;

    @OneToMany(type => OrderDetailsEntity, order_details => order_details.order)
    order_details: OrderDetailsEntity[];

    @ManyToOne(type => UserEntity, user => user.orders)
    @JoinColumn({ name: "UserId" })
    user: UserEntity;
}