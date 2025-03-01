import { TUser } from "./user.interface";
import { User } from "./user.model";

//register new user to mongodb
const registerNewUser = async (payload: TUser) => {
    const result = await User.create(payload);
    console.log(result);
    return result;
}

//get user info
const getUserInfo = async (email: string) => {
    const result = await User.find({ email: email });
    return result;
}

export const userServices = {
    registerNewUser,
    getUserInfo,
}