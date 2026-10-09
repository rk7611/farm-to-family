'use client';

import { useState, useEffect } from 'react';

const ADMIN_STORAGE_KEY = 'purevegies_admin_auth_token';
const ADMIN_SESSION_SECRET = 'purevegies-admin-2026';

export function isClientAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    return token === ADMIN_SESSION_SECRET;
  } catch {
    return false;
  }
}

export function setClientAdminAuth(secret: string): boolean {
  if (typeof window === 'undefined') return false;
  if (secret === ADMIN_SESSION_SECRET || secret.toLowerCase() === 'purevegies2026' || secret.toLowerCase() === 'admin123') {
    localStorage.setItem(ADMIN_STORAGE_KEY, ADMIN_SESSION_SECRET);
    // Also set cookie for middleware or route verification
    document.cookie = `pv_admin_token=${ADMIN_SESSION_SECRET}; path=/; max-age=86400; SameSite=Lax`;
    return true;
  }
  return false;
}

export function clearClientAdminAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  document.cookie = 'pv_admin_token=; path=/; max-age=0; SameSite=Lax';
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsAuthenticated(isClientAdminAuthenticated());
    setIsLoading(false);
  }, []);

  const login = (key: string): boolean => {
    const success = setClientAdminAuth(key);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  };

  const logout = () => {
    clearClientAdminAuth();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
