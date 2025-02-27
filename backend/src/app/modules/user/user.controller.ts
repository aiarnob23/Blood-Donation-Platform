import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";


//create new user
const RegisterUser = catchAsync((req, res) => {
    const payload = req?.body;
    const result = userServices.registerNewUser(payload);
    
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User registration successfull",
        data:result,
    })
})
 
export const userController = {
    RegisterUser,
}