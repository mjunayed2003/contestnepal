    "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useSelector((state: any) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/sign-in");
    }
  }, [isAuthenticated, loading, router]);

  if (!isAuthenticated) {
    return null; 
  }

  return <>{children}</>;
}