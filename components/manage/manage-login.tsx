"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, LockKeyhole, ArrowLeft } from "lucide-react";

interface ManageLoginProps {
  onSuccess: () => void;
}

export default function ManageLogin({ onSuccess }: ManageLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim()) {
      setError("أدخل كلمة المرور");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/manage/artworks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "حدث خطأ ما");
        return;
      }

      onSuccess();
    } catch {
      setError("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-5 text-[#181816]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full border border-black/10 bg-white">
            <LockKeyhole className="size-4 text-black/60" />
          </div>

          <h1 className="text-3xl font-light tracking-tight">
            لوحة التحكم
          </h1>

          <p className="mt-2 text-sm text-black/40">
            أدخل كلمة المرور لإدارة الأعمال
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)]"
        >
          <label className="mb-2 block text-sm text-black/60">
            كلمة المرور
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-12 w-full rounded-xl border border-black/10 bg-[#faf9f6] px-4 pl-12 text-sm outline-none transition-colors placeholder:text-black/20 focus:border-black/30"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35 transition-colors hover:text-black/70"
              aria-label={
                showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
              }
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {error ? (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#181816] text-sm text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>{loading ? "جاري الدخول..." : "دخول"}</span>
            {!loading ? <ArrowLeft className="size-4" /> : null}
          </button>
        </form>
      </motion.div>
    </main>
  );
}