import { UserEntity } from "../entities/user-entity";
import { getManager } from "typeorm";

export class UserRepo {

    getAllusers() {
        // get User repository and find all users
        return getManager().getRepository(UserEntity).find();
    }

    saveuser(user: UserEntity) {
        return getManager().getRepository(UserEntity).save(user);
    }

    deleteuser(user: UserEntity) {
        return getManager().getRepository(UserEntity).remove(user);
    }

    getuserById(userId: number) {
        return getManager().getRepository(UserEntity).findOne(userId);
    }

}