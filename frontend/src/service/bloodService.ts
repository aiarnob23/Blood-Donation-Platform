import { serverBaseUrl } from "@/utils/serverUrl";
import Cookies from "js-cookie";
const userEmail = Cookies.get("userEmail");

//post blood request
export const postBloodRequest = async (formData: any) => {
  try {
    const response = await fetch(
      `${serverBaseUrl}/user/info?email=${userEmail}`
    );
    const userDetails = await response.json();
    const user = userDetails?.data[0]?._id;
    const postBody = { ...formData, user };
    console.log(postBody);
    if (user) {
      const response = await fetch(`${serverBaseUrl}/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });
      const res = await response.json();
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
};
