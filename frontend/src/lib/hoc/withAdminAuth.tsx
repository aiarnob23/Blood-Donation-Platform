"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function withAdminAuth(Component: any) {
  return function WithAdminAuth(props: any) {
    const path = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [admin, setAdmin] = useState<any>(null);

    const getAdminData = useCallback(async () => {
      try {
        const adminData = localStorage.getItem('admin');
        if (adminData) {
          setAdmin(JSON.parse(adminData));
        } else {
          setAdmin(null);
        }
      } catch (error) {
        console.error("Failed to find admin", error);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      getAdminData();
    }, [getAdminData]);

    useEffect(() => {
      if (!loading && !admin) {
        router.replace(`/auth/admin-login?redirect=${encodeURIComponent(path)}`);
      }
    }, [loading, admin, router, path]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="spinner">
              <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-red-500 animate-spin"></div>
            </div>
          </div>
        </div>
      );
    }

    if (!admin) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="spinner">
              <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-red-500 animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600">Redirecting to admin login...</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
