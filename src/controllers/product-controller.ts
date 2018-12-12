import { Request, Response } from "express";

export let getAllProducts = (req: Request, res: Response) => {
  console.log("GET => GetAllProducts");
};

export let saveProduct = async (req: Request, res: Response) => {
  console.log("POST => SaveProduct");
}

export let deleteProduct = async (req: any, res: Response) => {
  console.log("DELETE ==> DeleteProduct");
}