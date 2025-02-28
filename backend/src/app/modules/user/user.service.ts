import { TUser } from "./user.interface";
import { User } from "./user.model";

//register new user to mongodb
const registerNewUser = async (payload: TUser) => {
    const result = await User.create(payload);
    console.log(result);
    return result;
}

export const userServices = {
    registerNewUser,
}