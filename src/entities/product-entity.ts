import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { OrderDetailsEntity } from "./order-details";

@Entity("product")
export class ProductEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;

    @Column({ name: "Name", length: 100 })
    name: string;

    @Column({ name: "UnitPrice", type: "decimal", precision: 8, scale: 2, nullable: true })
    unitPrice: number;

    @OneToMany(type => OrderDetailsEntity, order_details => order_details.product)
    order_details: OrderDetailsEntity[];
}