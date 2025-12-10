"use client";

import { useContext } from "react";
import { UserPayload, UseAdminAuthReturn } from "@/app/lib/types";
import { AdminAuthContext } from "@/app/(admin)/AdminAuthProvider";

export function useAdminAuth(): UseAdminAuthReturn {

    const { user } = useContext(AdminAuthContext);
    const isLogged = !!user;
    const loading = false; // SSR ya entrega el usuario listo, nunca hay flicker

    // login
    async function login(email: string, password: string) {
        try {
            /* 
            
                  const res = await fetch("/api/admin/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                  });
            
                  const data = await res.json();
            
                  if (!data.success) {
                    return { success: false, error: data.error };
                  }
            
                  // El backend setea cookie HttpOnly automáticamente
                  // Recargamos para que SSR/requireAuth lea el nuevo estado
                  window.location.href = "/admin/dashboard";
            
                  
            
            */
            return { success: true };
        } catch (err) {
            return { success: false, error: "Error de conexión" };
        }
    }

    //logout
    async function logout() {

        await fetch("/api/admin/auth/logout", { method: "POST" });
        // Después redirigir
        window.location.href = "/login";
    }

    return {
        user,
        isLogged,
        loading,
        login,
        logout,
    };
    
}