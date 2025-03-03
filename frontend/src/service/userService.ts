import { serverBaseUrl } from "@/utils/serverUrl";

export const getUserInfoByEmail = async (email: string) => {
  try {
    const response = await fetch(`${serverBaseUrl}/user/info?email=${email}`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
