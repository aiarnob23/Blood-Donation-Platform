"use client";

import Link from "next/link";
import { useContext } from "react";

import styles from "./Navbar.module.css";

export default function Navbar() {
//   if (!authContext) {
//     throw new Error("AuthContext is not provided.");
//   }

    const user = false;

  const NavLinks = (
    <ul className="flex justify-center items-center gap-4">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/user/following">Donors</Link>
      </li>
      <li>
        <Link href="/user/blogs/search">Posts</Link>
      </li>
      {/* {user && (
        <li>
          <Link href="/user/profile">Profile</Link>
        </li>
      )} */}
    </ul>
  );

  return (
    <nav className=" bg-opacity-30 backdrop-blur-sm shadow-sm">
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
          <Link href="/" className="text-2xl text-red-500 font-bold">
            RedLife
          </Link>
        </div>
        <div className="hidden lg:flex">{NavLinks}</div>
        <div>
          {!user ? (
            <Link href="/auth/login" className="btn">
              Login
            </Link>
          ) : (
            <button className="btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
