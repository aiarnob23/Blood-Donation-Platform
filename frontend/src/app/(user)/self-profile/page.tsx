"use client";

import { AuthContext } from "@/context/AuthContext";
import { getUserInfoByEmail } from "@/service/userService";
import { useContext, useEffect } from "react";

export default function SelfProfile() {
     const authContext = useContext(AuthContext);
     if (!authContext) {
       throw new Error("AuthContext is not provided.");
     }
    const { user } = authContext;
    
    useEffect(() => {
        const getUserDetails = async () => {
            const data = await getUserInfoByEmail(user?.email);
            console.log(data);
        }
        getUserDetails();
    }, [user])
  return (
    <div>
      <div>
        <img src={user?.photoURL} alt="Display Image" />
              <div>{user?.displayName}</div>
      </div>
    </div>
  );
}