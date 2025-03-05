import { serverBaseUrl } from "@/utils/serverUrl";

//get user info by email (self)
export const getUserInfoByEmail = async (email: string) => {
  try {
    const response = await fetch(`${serverBaseUrl}/user/info?email=${email}`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

//get users profile image url
export const getUersProfileImage = async (email: string) => {
  try {
    const response = await fetch(`${serverBaseUrl}/user/profile-image/${email}`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};