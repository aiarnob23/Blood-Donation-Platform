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

//get user info by user email (self)
const selfProfileInfo = catchAsync(async (req, res) => {
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
      message: "Profile details found",
      data: result,
    });
  }
});

//view user details (others profile)
const getUserDetails = catchAsync(async (req, res) => {
  const id = req?.params?.userId;
  const result = await userServices.viewUsersDetails(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User details found",
    data: result,
  });
})

//get users chat lists
const findUsersChatLists = catchAsync(async (req, res) => {
  const email = req?.params?.email;
  if (!email) {
    sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Request error please try again after login",
      data: null,
    })
  }

    const result = await userServices.getUserChatLists(email);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Chat lists fetched successfully",
      data: result,
    });
  
});

export const userController = {
  RegisterUser,
  selfProfileInfo,
  getUserDetails,
  findUsersChatLists,
};
