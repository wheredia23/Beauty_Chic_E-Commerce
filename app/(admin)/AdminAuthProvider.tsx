"use client";

import { createContext, useContext, ReactNode } from "react";
import { UserPayload, AuthContextType } from "@/app/lib/types";

export const AdminAuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isSeller: false,
  logout: () => {},
});

export function AdminAuthProvider({
  user,
  children,
}: {
  user: UserPayload | null;
  children: ReactNode;
}) {
  const roles = user?.roles ?? [];

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAdmin: roles.includes("admin"),
        isSeller: roles.includes("seller"),
        logout: () => {
          window.location.href = "/login";
        },
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuthProvider() {
  return useContext(AdminAuthContext);
}
