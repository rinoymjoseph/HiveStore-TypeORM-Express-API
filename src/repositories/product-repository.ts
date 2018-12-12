import { ProductEntity } from "../entities/product-entity";
import { getManager } from "typeorm";

export class ProductRepo {

    getAllproducts() {
        // get Product repository and find all products
        return getManager().getRepository(ProductEntity).find();
    }

    saveproduct(product: ProductEntity) {
        return getManager().getRepository(ProductEntity).save(product);
    }

    deleteproduct(product: ProductEntity) {
        return getManager().getRepository(ProductEntity).remove(product);
    }

    getproductById(productId: number) {
        return getManager().getRepository(ProductEntity).findOne(productId);
    }

}