import { serverBaseUrl } from "@/utils/serverUrl"

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
        return result;
    }
    catch (error) {
        console.log(error);
    }

}
