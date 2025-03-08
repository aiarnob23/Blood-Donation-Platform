"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getUersProfileImage } from "@/service/userService";

export default function Navbar() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided.");
  }
  const { user } = authContext;
  const unReadMessages = 4;
  const [profileURL, setProfileURL] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUsersProfileURL = async () => {
      const result = await getUersProfileImage(user?.email);
      setProfileURL(result?.photoURL);
    };
    getUsersProfileURL();
  }, [user?.email]);

  // Centralized Menu Items
  const menuItems = [
    { name: "Home", href: "/" },
    ...(user ? [{ name: "Donate", href: "/user/following" }] : []),
    ...(user ? [{ name: "Request", href: "/request" }] : []),
    { name: "Donors", href: "/donors" },
    ...(user ? [{ name: "Appointments", href: "/appointments" }] : []),
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl text-primary font-bold">
              Life Drop 🩸
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-red-500"
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/chat"
                className="flex items-center gap-1 hover:text-red-500"
              >
                Messages{" "}
                {unReadMessages > 0 && (
                  <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                    {unReadMessages}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* User Profile / Login */}
          <div className="hidden lg:flex">
            {!user ? (
              <Link
                href="/auth/sign-in"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Sign In
              </Link>
            ) : (
              <Link href="/self-profile" className="flex items-center gap-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src={profileURL || "/images/profile/default-profile.png"}
                  alt="profile"
                />
                <div>{user?.displayName}</div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-gray-100 shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        <div className="flex flex-col items-start p-6 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-red-500"
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <Link
              href="/chat"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1 hover:text-red-500"
            >
              Messages{" "}
              {unReadMessages > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                  {unReadMessages}
                </span>
              )}
            </Link>
          )}
          {!user ? (
            <Link
              href="/auth/sign-in"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </Link>
          ) : (
            <Link
              href="/self-profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <img
                className="h-8 w-8 rounded-full"
                src={profileURL || "/images/profile/default-profile.png"}
                alt="profile"
              />
              <div>{user?.displayName}</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
