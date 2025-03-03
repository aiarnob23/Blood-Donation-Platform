"use client";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";

import Cookies from "js-cookie";
import { GoogleAuthProvider } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import auth from "@/firebase/firebase.config";


//Type for the context
interface AuthContextType {
  GoogleSignIn: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  user: any;
  loading: boolean;
}

//Context
export const AuthContext = createContext<AuthContextType | null>(null);

//AuthProvider main function
const AuthProvider = ({ children }: { children: ReactNode }) => {
  //handle states
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();
  //Google SignIn
  const GoogleSignIn = async () => {
    return await signInWithPopup(auth, provider);
  };
  //Sign-Out
  const logOut = async () => {
    return await signOut(auth);
  };


  //onAuth state change handler
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser as any);
      setLoading(false);
      if (currentUser) {
         setUser(currentUser);
         console.log(currentUser);
         const email: string = currentUser?.email || "";
         Cookies.set("userEmail", email, { expires: 14 });
      }
      if (!currentUser) {
        setLoading(false);
      }
    });
    return () => unSubscribe();
  });

  // auth info
  const authInfo: AuthContextType = {
    GoogleSignIn,
    logOut,
    user,
    loading,
  };

  //return
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
