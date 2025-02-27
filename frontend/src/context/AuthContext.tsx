"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
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
  EmailPassSignUp: (email: string, password: string) => Promise<UserCredential>;
  EmailPassLogIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  ResetPassword: (email: string) => Promise<void>;
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
  //Email-Password SignUp
  const EmailPassSignUp = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  //Email-Password LogIn
  const EmailPassLogIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  //Sign-Out
  const logOut = async () => {
    return await signOut(auth);
  };
  //Password-reset
  const ResetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  };

  //onAuth state change handler
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      //setUser(currentUser as any);
      setLoading(false);
      if (currentUser) {
        // setUser(currentUser?.email);
        // console.log(currentUser);
        // const email: string = currentUser?.email || "";
        // const res = await baseUrl.post("auth/login", { email });
        // const token = res?.data?.data;
        // Cookies.set("accessToken", token, { expires: 7 });
        // Cookies.set("email", email, { expires: 7 });
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
    EmailPassSignUp,
    EmailPassLogIn,
    logOut,
    user,
    loading,
    ResetPassword,
  };

  //return
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
