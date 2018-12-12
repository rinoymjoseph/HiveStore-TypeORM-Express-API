import { OrderEntity } from "../entities/order-entity";
import { getManager } from "typeorm";

export class OrderRepo {

    getAllorders() {
        // get Order repository and find all orders
        return getManager().getRepository(OrderEntity).find();
    }

    saveorder(order: OrderEntity) {
        return getManager().getRepository(OrderEntity).save(order);
    }

    deleteorder(order: OrderEntity) {
        return getManager().getRepository(OrderEntity).remove(order);
    }

    getorderById(orderId: number) {
        return getManager().getRepository(OrderEntity).findOne(orderId);
    }

}