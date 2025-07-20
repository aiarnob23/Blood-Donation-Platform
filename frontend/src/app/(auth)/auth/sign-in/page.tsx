"use client";

import { AuthContext } from "@/context/AuthContext";
import { getAdditionalUserInfo } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
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
      console.log(additionalUserInfo);
      if (additionalUserInfo?.isNewUser) {
        router.push("/auth/register");
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center font-sans text-gray-800 p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Banner Section */}
        <div className="relative h-60 md:h-72">
          <Image
            src="/images/login-page/login-banner.jpg"
            alt="Blood Donation Banner"
            fill
            className="object-cover object-center rounded-t-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
            <h1 className="text-white font-extrabold text-3xl md:text-4xl tracking-tight">
              Life Saver Connect
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            Welcome to the Platform
          </h2>

          <div className="space-y-5 mb-8">
            {[
              {
                title: "Donate Blood",
                description: "Your donation can save lives. Join our community.",
                iconColor: "bg-red-100 text-red-600",
                path: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",
              },
              {
                title: "Request Blood",
                description: "Emergency? Get immediate response from donors.",
                iconColor: "bg-blue-100 text-blue-600",
                path: "M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z",
              },
              {
                title: "Track Donations",
                description: "Monitor your history and see your impact.",
                iconColor: "bg-green-100 text-green-600",
                path: "M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z",
              },
            ].map(({ title, description, iconColor, path }, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className={`p-3 rounded-full ${iconColor} flex-shrink-0`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d={path} clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-0.5">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-base">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full cursor-pointer flex items-center justify-center gap-3 bg-slate-800 text-white font-bold py-3 md:py-4 px-5 rounded-xl shadow-lg
                       hover:bg-slate-700 hover:shadow-xl transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-4 focus:ring-slate-300 active:scale-98"
          >
            <span className="text-xl font-semibold">
              Continue with{" "}
              <span className="text-2xl font-bold">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#DB4437]">o</span>
                <span className="text-[#F4B400]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#0F9D58]">l</span>
                <span className="text-[#DB4437]">e</span>
              </span>
            </span>
          </button>

          <span className="flex justify-center items-center my-5 text-gray-600">
            <Link
              href="/auth/admin-login"
              className="text-blue-600 hover:text-blue-800 font-medium text-base transition-colors duration-200"
            >
              Are you Admin?
            </Link>
          </span>

          {/* Terms & Conditions */}
          <div className="mt-5 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}