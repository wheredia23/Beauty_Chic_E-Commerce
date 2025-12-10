// Alias básicos
export type Id = number;          // para ids BigInt en JS
export type DecimalString = string; // por si usamos strings al serializar decimales

// lib/admin/types.ts
// Reexporta los tipos base del proyecto (lib/types.ts)
// para que el panel de admin use los mismos sin duplicar. "esto estara de prueba"

// export * from "@/lib/types";

/************************************************************
 * ADMIN / DATOS DE SESSION DE USUARIO JWT
 ************************************************************/
// 
export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  roles: string[];
  iat: number;
  exp: number;
}

// Interface para el hooks
export interface UseAdminAuthReturn {
  user: UserPayload | null;
  isLogged: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

//
export interface UserPayload {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

// Interface para el AuthProvider
export interface AuthContextType {
  user: UserPayload | null;
  isAdmin: boolean;
  isSeller: boolean;
  logout: () => void;
}

//
export interface AuthResult {
  user: UserPayload | null;
  redirect?: string;
}