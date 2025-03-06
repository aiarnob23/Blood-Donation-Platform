import { serverBaseUrl } from "@/utils/serverUrl";

export const getAllUers = async () => {
  try {
    const response = await fetch(`${serverBaseUrl}/admin/all-users`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
