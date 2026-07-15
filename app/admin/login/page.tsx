"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAdmin, undefined);

  return (
    <main className="min-h-screen flex items-center justify-center bg-ranczo-charcoal px-6">
      <form
        action={action}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8"
      >
        <h1 className="font-serif text-2xl font-bold text-white mb-6">Panel Ranczo 44</h1>

        <label htmlFor="password" className="text-xs font-semibold tracking-widest uppercase text-ranczo-sand/70 mb-2 block">
          Hasło
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          autoFocus
          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ranczo-terracotta/60 focus:border-ranczo-terracotta/50 transition-all duration-300 text-sm mb-4"
        />

        {state?.error && <p className="text-sm text-red-400 mb-4">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full px-6 py-3 bg-ranczo-terracotta text-white font-semibold rounded-xl hover:bg-ranczo-terracotta/85 disabled:opacity-60 transition-all duration-300"
        >
          {pending ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
    </main>
  );
}
