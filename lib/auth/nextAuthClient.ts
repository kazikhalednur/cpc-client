export type SessionStatus = "authenticated" | "unauthenticated" | "loading";

export function useSession(): { data: null; status: SessionStatus } {
    return { data: null, status: "unauthenticated" };
}

export async function signIn(): Promise<void> {
    return;
}

export async function signOut(): Promise<void> {
    return;
}


