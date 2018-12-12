import { Request, Response } from "express";

export let getAllOrders = (req: Request, res: Response) => {
  console.log("GET => GetAllOrders");
};

export let saveOrder = async (req: Request, res: Response) => {
  console.log("POST => SaveOrder");
}

export let deleteOrder = async (req: any, res: Response) => {
  console.log("DELETE ==> DeleteOrder");
}