"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginAction } from "@/lib/actions";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage({ params }: { params: { locale: string } }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const locale = params.locale || "ar";
  const isAr = locale === "ar";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    if (result.success) { router.push(`/${locale}/admin`); router.refresh(); }
    else { setError(result.error || "Login failed"); setLoading(false); }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4" style={{ background: "var(--bg-main)" }}>
      {/* Background Effects */}
      <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(91,92,255,0.06)", top: "-15%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="absolute inset-0 bg-grid-ace" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex justify-center">
            <Image src="/images/ace-logo.png" alt="ACE" width={200} height={60} className="h-14 w-auto object-contain" />
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{isAr ? "لوحة تحكم ACE — تسجيل الدخول" : "ACE Dashboard — Sign In"}</p>
        </div>
        <div className="card-ace !p-8">
          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            {error && <div className="rounded-xl p-3 text-center text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.15)" }}>{error}</div>}
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{isAr ? "البريد الإلكتروني" : "Email"}</label>
              <input name="email" type="email" required autoComplete="email" className="input-ace" placeholder="admin@ace.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{isAr ? "كلمة المرور" : "Password"}</label>
              <input name="password" type="password" required autoComplete="current-password" className="input-ace" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-4">
              {loading ? <><Loader2 className="h-5 w-5 animate-spin" />{isAr ? "جارٍ الدخول..." : "Signing in..."}</> : <><Lock className="h-4 w-4" />{isAr ? "دخول" : "Sign In"}</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}