// lib/server/auth/requireAuth.ts
import { cookies } from "next/headers";
import { SimpleTokenService } from "@/lib/server/auth/simple-token";
import { UserPayload, AuthResult } from "@/lib/types";

const COOKIE_NAME = "skatershop-admin-token"; // Pasar al .env o const.ts

export async function requireAuth(allowedRoles?: string[]): Promise<AuthResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return { user: null, redirect: "/(auth)/login" };
  }

  try {
    const decoded = await SimpleTokenService.verifyToken(token);

    // ⚠️ convertir decoded → UserPayload
    const user: UserPayload = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      roles: decoded.roles
    };

    // Validar roles si se pasan
    if (allowedRoles && !allowedRoles.some(r => user.roles.includes(r))) {
      return { user, redirect: "/(admin)/unauthorized" };
    }

    return { user };

  } catch (err) {
    console.error("❌ requireAuth() token inválido", err);
    return { user: null, redirect: "/(auth)/login" };
  }
}