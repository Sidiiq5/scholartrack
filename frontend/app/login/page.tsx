"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-blue-400/30 bg-gradient-to-tr from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20">
        <span className="text-sm font-bold text-white">ST</span>
      </div>
      <span className="text-lg font-bold tracking-tight text-white">Scholar<span className="text-blue-400">Track</span></span>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(email && password ? "Login API is the next backend slice." : "Enter your email and password.");
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#0b0f19] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.14),transparent_60%),radial-gradient(circle_at_85%_90%,rgba(29,78,216,0.08),transparent_50%)] p-4 text-white sm:p-6 lg:p-8">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link href="/" aria-label="ScholarTrack home" className="focus-ring rounded-lg"><Logo /></Link>
        <Link href="/" className="text-sm font-medium text-slate-400 transition hover:text-white">Back to scholarships</Link>
      </header>

      <section className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-gray-400">Sign in to manage your scholarship discovery and preparation.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-300">Email address</label>
                <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" autoComplete="email" className="w-full rounded-xl border border-white/10 bg-[#0d111d]/70 px-3.5 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20" />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-300">Password</label>
                <div className="relative">
                  <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete="current-password" className="w-full rounded-xl border border-white/10 bg-[#0d111d]/70 px-3.5 py-3 pr-12 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20" />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-white">{showPassword ? "Hide" : "Show"}</button>
                </div>
              </div>

              {message && <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3.5 py-3 text-sm leading-5 text-blue-200">{message}</div>}

              <button type="submit" className="w-full rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-px hover:from-blue-500 hover:to-blue-600">Sign in</button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-5 text-center text-xs leading-5 text-slate-500">One login for students and administrators. Access is determined by your account role.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
