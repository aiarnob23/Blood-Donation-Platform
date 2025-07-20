import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const path = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null); 

    const getUserData = useCallback(async () => {
      try {
        const userEmail = Cookies.get("userEmail");
        const userId = Cookies.get("selfId");
        console.log('attempting redirect : ', userEmail, userId);

        if (!userId && userEmail) {
          setUser("needs_registration"); 
          router.push("/auth/register");
        } else if (userId && userEmail) {
          setUser(userId);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to find user", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }, [router]);

    useEffect(() => {
      getUserData();
    }, [getUserData]);

    useEffect(() => {
    
      if (!loading && !user && user !== "needs_registration") {
        router.push(`/auth/sign-in?redirect=${encodeURIComponent(path)}`);
      }
    }, [loading, user, router, path]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="spinner">
              <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-red-500 animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600">Verifying authentication...</p>
          </div>
        </div>
      );
    }

    if (!user || user === "needs_registration") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="spinner">
                        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-red-500 animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-600">
                        {user === "needs_registration" ? "Redirecting to registration..." : "Redirecting to login..."}
                    </p>
                </div>
            </div>
        );
    }


    return <Component {...props} />;
  };
}