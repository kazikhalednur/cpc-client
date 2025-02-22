import { useSession } from "next-auth/react";
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

    if (!session?.user?.role) {
      setIsAllowed(false);
      setIsLoading(false);
      return;
    }

    setIsAllowed(allowedRoles.includes(session.user.role as Role));
    setIsLoading(false);
  }, [session, status, allowedRoles]);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.role || !allowedRoles.includes(session.user.role)) {
      router.push("/");
    }
  }, [session, status, router, allowedRoles]);

  return { isAllowed, isLoading };
}
