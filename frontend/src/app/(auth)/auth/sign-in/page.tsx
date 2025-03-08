"use client";

import { AuthContext } from "@/context/AuthContext";
import { getAdditionalUserInfo } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function SignIn() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    router.push("/auth/sign-in");
    throw new Error("AuthContext is not provided.");
  }
  const { GoogleSignIn } = authContext;
  const handleGoogleSignIn = async () => {
    try {
      const response = await GoogleSignIn();
      const additionalUserInfo = getAdditionalUserInfo(response);
      if (additionalUserInfo?.isNewUser) {
        router.push("/auth/register");
      }
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
      <div className="max-w-lg w-full p-6 shadow-lg rounded-2xl bg-white">
        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src="/images/login-page/login-banner.jpg"
            alt="Login banner"
            width={300}
            height={300}
            className="rounded-xl shadow-md"
          />
          <h2 className="text-2xl font-bold text-red-700">
            Welcome to Blood Donation Platform
          </h2>
          <p className="text-gray-700">Donate to save lives</p>
          <p className="text-gray-600">Request blood for instant response</p>
          <button
            onClick={handleGoogleSignIn}
            className="bg-red-200 text-xl font-semibold hover:scale-105 cursor-pointer px-6 py-3 rounded-lg transition-all "
          >
            Sign in with{" "}
            <span>
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#DB4437]">o</span>
              <span className="text-[#F4B400]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#0F9D58]">l</span>
              <span className="text-[#DB4437]">e</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
