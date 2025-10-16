import { useSession } from "@/lib/auth/nextAuthClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Role } from "@/types/role";

export function useRole(allowedRoles: Role[]) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    const userRole = (session as any)?.user?.role as Role | undefined;
    if (!userRole) {
      setIsAllowed(false);
      setIsLoading(false);
      return;
    }

    setIsAllowed(allowedRoles.includes(userRole));
    setIsLoading(false);
  }, [session, status, allowedRoles]);

  useEffect(() => {
    if (status === "loading") return;

    const userRole = (session as any)?.user?.role as Role | undefined;
    if (!userRole || !allowedRoles.includes(userRole)) {
      router.push("/");
    }
  }, [session, status, router, allowedRoles]);

  return { isAllowed, isLoading };
}
