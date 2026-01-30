import React from 'react';
import { useAuthStore } from '@/store/auth-store';
import { Redirect } from 'wouter';

export default function ProtectedRoute({
  component: Component,
}: {
  component: React.ComponentType;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Component />;
}
