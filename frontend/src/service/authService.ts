import { serverBaseUrl } from "@/utils/serverUrl"
import Cookies from "js-cookie";
import { useId } from "react";

export const registerNewUser = async (formData: any) => {
    try {
        const response = await fetch(`${serverBaseUrl}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      const result = await response.json();
      const userId = result?.data?._id;
      if (userId) {
        Cookies.set("selfId", userId, { expires: 14 })
        return result;
      }
        
    }
    catch (error) {
        console.log(error);
    }

}
