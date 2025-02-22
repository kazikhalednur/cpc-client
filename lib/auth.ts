import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function checkRole(allowedRoles: Role[]) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.role || !allowedRoles.includes(session.user.role)) {
    redirect("/");
  }
}
