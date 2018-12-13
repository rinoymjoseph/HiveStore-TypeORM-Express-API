import { OrderDetailsEntity } from "../entities/order-details";
import { getManager } from "typeorm";

export class OrderDetailsRepo {

    getAllOrderDetails() {
        // get OrderDetails repository and find all orderDetailss
        return getManager().getRepository(OrderDetailsEntity).find();
    }

    saveOrderDetails(orderDetails: OrderDetailsEntity) {
        return getManager().getRepository(OrderDetailsEntity).save(orderDetails);
    }

    deleteOrderDetails(orderDetails: OrderDetailsEntity) {
        return getManager().getRepository(OrderDetailsEntity).remove(orderDetails);
    }

    getOrderDetailsById(orderDetailsId: number) {
        return getManager().getRepository(OrderDetailsEntity).findOne(orderDetailsId);
    }

}