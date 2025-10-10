'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireRole?: string;
    redirectTo?: string;
}

export function AuthGuard({
    children,
    requireAuth = true,
    requireRole,
    redirectTo = '/auth/signin'
}: AuthGuardProps) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        if (requireAuth && !isAuthenticated) {
            router.push(redirectTo);
            return;
        }

        if (requireRole && user?.role !== requireRole) {
            router.push('/unauthorized');
            return;
        }
    }, [isAuthenticated, user, isLoading, requireAuth, requireRole, redirectTo, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner />
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (requireAuth && !isAuthenticated) {
        return null; // Will redirect
    }

    if (requireRole && user?.role !== requireRole) {
        return null; // Will redirect
    }

    return <>{children}</>;
}

// Higher-order component for protecting pages
export function withAuthGuard<P extends object>(
    Component: React.ComponentType<P>,
    options?: Omit<AuthGuardProps, 'children'>
) {
    return function AuthGuardedComponent(props: P) {
        return (
            <AuthGuard {...options}>
                <Component {...props} />
            </AuthGuard>
        );
    };
}

// Hook for role-based access control
export function useRequireRole(requiredRole: string) {
    const { user, isAuthenticated } = useAuth();

    return {
        hasRole: user?.role === requiredRole,
        isAuthorized: isAuthenticated && user?.role === requiredRole,
        userRole: user?.role,
    };
}
