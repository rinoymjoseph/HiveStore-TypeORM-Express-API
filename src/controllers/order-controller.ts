import { Request, Response } from "express";
import { inspect } from "util";
import { BaseResponse } from "../base-response";
import { OrderEntity } from "../entities/order-entity";
import { OrderDetailsEntity } from "../entities/order-details";
import { OrderRepo } from "../repositories/order-repository";
import { UserRepo } from "../repositories/user-repository";
import { ProductRepo } from "../repositories/product-repository";
import { OrderDetailsRepo } from "../repositories/order-details-repository";

export let getAllOrders = async (req: Request, res: Response) => {
  console.log("GET => GetAllOrders");
  let orderRepo : OrderRepo = new OrderRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  try{
    let orders = await orderRepo.getAllorders();
    baseResponse.isSuccess = true;
    baseResponse.response = JSON.stringify(orders);
  }
  catch(e){
    console.log(e);
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let saveOrder = async (req: Request, res: Response) => {
  console.log("POST => SaveOrder");
  //Create the Repo objects
  let orderRepo: OrderRepo = new OrderRepo();
  let userRepo : UserRepo = new UserRepo();
  let productRepo : ProductRepo = new ProductRepo();
  let orderDetailsRepo : OrderDetailsRepo = new OrderDetailsRepo();
  let orderEntity: OrderEntity = new OrderEntity();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    let order_req : OrderEntity = req.body;
    orderEntity.id = order_req.id;
    orderEntity.address = order_req.address;
    orderEntity.requiredDate = order_req.requiredDate;
    //Get User Entity which is already persisted in DB
    orderEntity.user = await userRepo.getuserById(order_req.user.id);
    //Save Order first
    let order_saved = await orderRepo.saveorder(orderEntity);
    console.log(order_saved);

    //Iterate through order details and save order details
    order_req.order_details.forEach(async (order_det) => {
      let orderDetails : OrderDetailsEntity = new OrderDetailsEntity();
      orderDetails.id = order_det.id;
      orderDetails.discount = order_det.discount;
      orderDetails.unitPrice = order_det.unitPrice;
      orderDetails.quantity = order_det.quantity;
      //Get product entity which is already peristed in DB
      orderDetails.product = await productRepo.getproductById(order_det.product.id);
      //Assign the saved order entity !!!Important
      orderDetails.order = order_saved;
      //Save order details
      let orderDetails_saved = await orderDetailsRepo.saveOrderDetails(orderDetails);
      console.log(orderDetails_saved);
    });

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

export let saveOrder_Cascade = async (req: Request, res: Response) => {
  console.log("POST => SaveOrder_Cascade");
  //Create the Repo objects
  let orderRepo: OrderRepo = new OrderRepo();
  let userRepo : UserRepo = new UserRepo();
  let productRepo : ProductRepo = new ProductRepo();
  let orderEntity: OrderEntity = new OrderEntity();
  let baseResponse: BaseResponse = new BaseResponse();

  try {
    let order_req : OrderEntity = req.body;
    orderEntity.id = order_req.id;
    orderEntity.address = order_req.address;
    orderEntity.requiredDate = order_req.requiredDate;
    //Get User Entity which is already persisted in DB
    orderEntity.user = await userRepo.getuserById(order_req.user.id);
    orderEntity.order_details = [];

    //Iterate through order details and save order details
    order_req.order_details.forEach(async (order_det) => {
      let orderDetails : OrderDetailsEntity = new OrderDetailsEntity();
      orderDetails.id = order_det.id;
      orderDetails.discount = order_det.discount;
      orderDetails.unitPrice = order_det.unitPrice;
      orderDetails.quantity = order_det.quantity;
      //Get product entity which is already peristed in DB
      orderDetails.product = await productRepo.getproductById(order_det.product.id);
      orderEntity.order_details.push(orderDetails);
    });

    //Save Order first
    let order_saved = await orderRepo.saveorder(orderEntity);
    console.log(order_saved);

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

export let deleteOrder = async (req: any, res: Response) => {
  console.log("DELETE ==> DeleteOrder");
}