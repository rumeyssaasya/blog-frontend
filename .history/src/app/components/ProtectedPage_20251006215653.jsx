"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Admin rotalarında bu guard devre dışı
    if (pathname?.startsWith("/admin")) {
      setAuthorized(true);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid token");
      const payload = JSON.parse(atob(parts[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);

      if (exp < now) {
        localStorage.removeItem("token");
        setTimeout(() => router.push("/login"), 100);
        return;
      }

      setAuthorized(true);
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router, pathname]);

  if (!authorized) return
  return <>{children}</>;
}
