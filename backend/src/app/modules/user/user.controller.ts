import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

//create new user
const RegisterUser = catchAsync(async (req, res) => {
  const payload = req?.body;
  console.log(req?.body);
  console.log(payload);
  const result = await userServices.registerNewUser(payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User registration successfull",
    data: result,
  });
});

//get user info by user email
const FindUserInfoByUserEmail = catchAsync(async (req, res) => {
  const email = req?.query?.email || null;
  if (!email) {
    sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Details not found",
      data: [],
    });
  } else {
    const result = await userServices.getUserInfo(email as string);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User details found",
      data: result,
    });
  }
});

export const userController = {
  RegisterUser,
  FindUserInfoByUserEmail,
};
