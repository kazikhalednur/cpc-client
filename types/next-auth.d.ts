import "next-auth";
import { Role } from "@/types/role";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    email: string;
    name?: string | null;
    image?: string | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    email: string;
    name?: string | null;
  }
}
