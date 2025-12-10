// 
import { TokenPayload } from "@/app/lib/types";

export class SimpleTokenService {

  static async generateToken(payload: { sub: string; email: string; name: string; roles: string[] }): Promise<string> {
    // Crear token con expiración
    const tokenData: TokenPayload = {
      ...payload,
      iat: Date.now(),
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 días en milisegundos
    };

    // Codificar como base64 seguro
    const tokenString = JSON.stringify(tokenData);
    const encoded = btoa(unescape(encodeURIComponent(tokenString)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return `stk_${encoded}`;
  }

  static async verifyToken(token: string): Promise<TokenPayload> {
    if (!token.startsWith('stk_')) {
      throw new Error('Invalid token format');
    }

    try {
      const encoded = token.slice(4);
      // Agregar padding si es necesario
      const padded = encoded + '='.repeat((4 - encoded.length % 4) % 4);
      const decoded = decodeURIComponent(escape(atob(padded.replace(/-/g, '+').replace(/_/g, '/'))));
      const tokenData: TokenPayload = JSON.parse(decoded);

      // Verificar expiración
      if (tokenData.exp && tokenData.exp < Date.now()) {
        throw new Error('Token expired');
      }

      return tokenData;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static decodeToken(token: string): TokenPayload | null {
    try {
      if (!token.startsWith('stk_')) return null;
      
      const encoded = token.slice(4);
      const padded = encoded + '='.repeat((4 - encoded.length % 4) % 4);
      const decoded = decodeURIComponent(escape(atob(padded.replace(/-/g, '+').replace(/_/g, '/'))));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
  
}
