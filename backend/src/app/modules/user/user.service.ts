import { TUser } from "./user.interface";
import { User } from "./user.model";

//register new user to mongodb
const registerNewUser = async (payload: TUser) => {
    const result = await User.create(payload);
    console.log(result);
    return result;
}

//get user info (self)
const getUserInfo = async (email: string) => {
    const result = await User.find({ email: email });
    return result;
}

//get user info (others)
const viewUsersDetails = async (id: any) => {
    const result = await User.findById(id, { conversation: 0, notificationPreference: 0 });
    return result;
}

//update user info
const updateUserInfo = async (id: any, payload:any) => {
    const result = await User.findByIdAndUpdate({ _id: id }, { payload });
    console.log(result);
}

//get users chat lists
const getUserChatLists = async (email: any) => {
    const result = await User.findOne({email:email} , {conversation:1}).populate('conversation');
    return result;
}

export const userServices = {
    registerNewUser,
    getUserInfo,
    updateUserInfo,
    viewUsersDetails,
    getUserChatLists,
}