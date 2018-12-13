import { Request, Response } from "express";
import { inspect } from "util";
import { ProductRepo } from "../repositories/product-repository";
import { ProductEntity } from "../entities/product-entity";
import { BaseResponse } from "../base-response";

export let getAllProducts = async (req: Request, res: Response) => {
  console.log("GET => GetAllProducts");
  let productRepo : ProductRepo = new ProductRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  try{
    let products = await productRepo.getAllproducts();
    baseResponse.isSuccess = true;
    baseResponse.response = JSON.stringify(products);
  }
  catch(e){
    console.log(e);
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let saveProduct = async (req: Request, res: Response) => {
  console.log("POST => SaveProduct");
  let productRepo: ProductRepo = new ProductRepo();
  let productEntity: ProductEntity = new ProductEntity();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    productEntity.id = req.body.id;
    productEntity.name = req.body.name;
    productEntity.unitPrice = req.body.unitPrice;
    let result = await productRepo.saveproduct(productEntity);
    console.log(result);
    baseResponse.isSuccess = true;
    baseResponse.response = JSON.stringify('success');
  }
  catch (e) {
    console.log(inspect(e));
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(inspect(e));
  }
  res.send(baseResponse);
}

export let deleteProduct = async (req: any, res: Response) => {
  console.log("DELETE ==> DeleteProduct");
}