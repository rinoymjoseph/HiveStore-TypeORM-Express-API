import {Entity, Column,  PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { OrderEntity } from "./order-entity";
import { ProductEntity } from "./product-entity";

@Entity("order_details")
export class OrderDetailsEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;

    @Column({ name: "UnitPrice", type: "decimal", precision: 8, scale: 2, nullable: true })
    unitPrice: number;

    @Column({ name: "Quantity", type: "smallint" })
    quantity: number;

    @Column({ name: "Discount", type: "decimal", precision: 4, scale: 2, nullable: true })
    discount: number;

    @ManyToOne(type => OrderEntity, order => order.order_details)
    @JoinColumn({ name: "OrderId" })
    order: OrderEntity;

    @ManyToOne(type => ProductEntity, product => product.order_details)
    @JoinColumn({ name: "ProductId" })
    product: ProductEntity;
}