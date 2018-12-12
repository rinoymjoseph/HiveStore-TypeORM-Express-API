import { Request, Response } from "express";
import { inspect } from 'util';
import { UserEntity } from "../entities/user-entity";
import { UserRepo } from "../repositories/user-repository";
import { BaseResponse } from "../base-response";

export let getAllUsers = (req: Request, res: Response) => {
  console.log("GET => GetAllUsers");
  let userRepo : UserRepo = new UserRepo();
  let baseResponse : BaseResponse = new BaseResponse();

  try{
    let users = userRepo.getAllusers();
    baseResponse.isSuccess = true;
    baseResponse.response = JSON.stringify(users);
  }
  catch(e){
    console.log(e);
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(e);
  }

  res.send(baseResponse);
};

export let saveUser = async (req: Request, res: Response) => {
  console.log("POST => SaveUser");
  let userRepo : UserRepo = new UserRepo();
  let userEntity : UserEntity = new UserEntity();
  let baseResponse : BaseResponse = new BaseResponse();

  try{
    userEntity.id = req.body.id;
    userEntity.firstName = req.body.firstName;
    userEntity.lastName = req.body.lastName;
    userEntity.email = req.body.email;
    let result = await userRepo.saveuser(userEntity);
    console.log(result);
    baseResponse.isSuccess = true;
    baseResponse.response = JSON.stringify('success');
  }
  catch(e){
    console.log(inspect(e));
    baseResponse.isSuccess = false;
    baseResponse.response = JSON.stringify(inspect(e));
  }
  res.send(baseResponse);
}

export let deleteUser = async (req: any, res: Response) => {
  console.log("DELETE ==> DeleteUser");
}