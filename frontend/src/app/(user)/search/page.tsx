"use client";

import { useRouter } from "next/navigation"; 
import Cookies from "js-cookie";

export default function Search() {
  const userEmail = Cookies.get("userEmail"); 
  const users = ["aminulislamarnob709@gmail.com", "aminul.arnob24@gmail.com"];

  const router = useRouter(); 

  // Function to handle click and navigate to the chat page
    const handleUserClick = (email: string) => {
    router.push(`/chat/${email}`); // Navigate to the user details page (for example: /user/aminulislamarnob709@gmail.com)
  };

  return (
    <div>
      Search result:
      {users.map((user) => (
        <div key={user}>
          {/* Show user if it's not the logged-in user's email */}
          {userEmail !== user && (
            <span
              style={{ cursor: "pointer", color: "blue" }} // Style the user as clickable
              onClick={() => handleUserClick(user)} // Handle click event
            >
              {user}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
