import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postServices } from "./post.service";

//add blood request post 
const addBloodNeededPost = catchAsync(async (req, res) => {
    const formData = req?.body;
    const result = await postServices.addBloodRquestPost(formData);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Posts created successfully",
        data:result,
    })
})

export const postControllers = {
    addBloodNeededPost,
}