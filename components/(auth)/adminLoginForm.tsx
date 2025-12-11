"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useAdminAuth } from '@/hooks/auth/useAdminAuth';

export default function adminLoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isLogged } = useAdminAuth();

  useEffect(() => {
    if (isLogged) {
      window.location.href = '/admin/dashboard';
    }
  }, [isLogged]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        window.location.href = '/admin/dashboard';
      } else {
        throw new Error(result.error || 'Error al iniciar sesión');
      }
    } catch (err: any) {
      setError(err?.message || 'Error al iniciar sesión');
    } finally {
      setSubmitting(false);
    }
  }

  if (isLogged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-white">Redirigiendo al dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: "url('/bg-login.png')" }}>

      <div className="w-full max-w-md rounded-2xl bg-neutral-900/70 p-6 shadow-xl border border-yellow-400 relative">

        {/* ====================== LOGO REDONDO ========================== */}
        <div className="w-full flex justify-center -mt-16 mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg">
            <Image
              src="/logo.png"
              alt="Beauty Chic Logo"
              width={128}
              height={128}
              className="object-cover"
              priority
            />
          </div>
        </div>
        {/* ============================================================= */}

        <h1 className="text-xl font-semibold text-white mb-4 text-center">
          Acceso Administrativo
        </h1>

        <p className="text-xs text-neutral-400 mb-4 text-center">
          Ingresa tus credenciales de administrador
        </p>

        {error && (
          <div className="mb-3 rounded-lg border border-red-500/60 bg-red-900/40 px-3 py-2 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="text-neutral-300">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-700 px-3 py-2 text-sm text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              placeholder="admin@example.com"
              disabled={submitting}
            />
          </label>

          <label className="block text-sm">
            <span className="text-neutral-300">Contraseña</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-700 px-3 py-2 text-sm text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              placeholder="123456"
              disabled={submitting}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-lg bg-yellow-400 text-black font-semibold py-2 text-sm hover:bg-yellow-300 disabled:opacity-60 transition-colors"
          >
            {submitting ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-neutral-800">
          <p className="text-xs text-neutral-500 text-center">
            Panel Administrativo Beauty-chic
          </p>
        </div>

      </div>
    </div>
  );
}
