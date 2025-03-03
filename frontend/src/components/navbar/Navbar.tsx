"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getAdditionalUserInfo } from "firebase/auth";
import { useRouter } from "next/navigation";



export default function Navbar() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided.");
  }
  const { GoogleSignIn , user } = authContext;
  const router = useRouter();

  // handle google based signIn
  const handleGoogleSignIn = async () => {
    try {
      const response = await GoogleSignIn();
      const additionalUserInfo =getAdditionalUserInfo(response);
      if (additionalUserInfo?.isNewUser) {
        router.push('/auth/register');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const NavLinks = (
    <ul className="flex justify-center items-center gap-4">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/user/following">Donate</Link>
      </li>
      <li>
        <Link href="/request">Request</Link>
      </li>
      <li>
        <Link href="/search">Search</Link>
      </li>
    </ul>
  );

  return (
    <nav className="">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <Link href="/" className="text-2xl text-primary font-bold">
            Life Drop 🩸
          </Link>
        </div>
        <div className="hidden lg:flex">{NavLinks}</div>
        <div>
          {!user ? (
            <button onClick={handleGoogleSignIn}>Login</button>
          ) : (
              <>
                {
                  user && <Link href='/self-profile' className="flex items-center gap-2">
                    <img className="h-8 w-8 rounded-[50%]" src={user?.photoURL} alt={user?.photoURL} />
                    <div>{user?.displayName}</div>
                  </Link>
                }
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
