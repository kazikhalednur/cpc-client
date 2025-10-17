import { Session, User } from "next-auth";

export type SessionStatus = "authenticated" | "unauthenticated" | "loading";

export function useSession(): {
    data: Session | null;
    status: SessionStatus;
    update: (data?: { user?: Partial<User> }) => Promise<Session | null>;
} {
    return {
        data: null,
        status: "unauthenticated",
        update: async () => null
    };
}

export async function signIn(): Promise<void> {
    return;
}

export async function signOut(): Promise<void> {
    return;
}


