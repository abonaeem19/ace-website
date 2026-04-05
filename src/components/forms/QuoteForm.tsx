"use client";
import { useState } from "react";
import { submitQuoteForm } from "@/lib/actions";
import { CheckCircle, Loader2, Send } from "lucide-react";

interface QuoteFormProps { dict: Record<string, any>; services: { id: string; titleAr: string; titleEn: string }[]; locale: string; preselectedService?: string; }

export default function QuoteForm({ dict, services, locale, preselectedService }: QuoteFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const t = dict.quote;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const formData = new FormData(e.currentTarget);
    const result = await submitQuoteForm(formData);
    if (result.success) setSuccess(true); else setError(result.error || "Error");
    setLoading(false);
  }

  if (success) return (
    <div className="card-ace flex flex-col items-center py-20 text-center">
      <div className="relative z-10">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <p className="text-xl font-bold">{t.success}</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="card-ace space-y-5 !p-8">
      <div className="relative z-10 space-y-5">
        {error && <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.12)" }}>{error}</div>}
        <div className="grid gap-5 md:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{t.form.fullName}</label><input name="fullName" required className="input-ace" /></div>
          <div><label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{t.form.companyName}</label><input name="companyName" className="input-ace" /></div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{t.form.email}</label><input name="email" type="email" required className="input-ace" /></div>
          <div><label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{t.form.phone}</label><input name="phone" type="tel" dir="ltr" className="input-ace" /></div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{t.form.service}</label>
          <select name="serviceId" defaultValue={preselectedService || ""} className="input-ace">
            <option value="">{t.form.selectService}</option>
            {services.map((s) => <option key={s.id} value={s.id}>{locale === "ar" ? s.titleAr : s.titleEn}</option>)}
          </select>
        </div>
        <div><label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{t.form.projectDescription}</label><textarea name="projectDescription" required rows={5} className="input-ace resize-none" /></div>
        <div className="grid gap-5 md:grid-cols-2">
          <div><label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{t.form.budgetRange}</label>
            <select name="budgetRange" className="input-ace"><option value="">{t.form.selectBudget}</option>{Object.entries(t.budgets).map(([k, v]) => <option key={k} value={k}>{v as string}</option>)}</select>
          </div>
          <div><label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{t.form.timeline}</label>
            <select name="timeline" className="input-ace"><option value="">{t.form.selectTimeline}</option>{Object.entries(t.timelines).map(([k, v]) => <option key={k} value={k}>{v as string}</option>)}</select>
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-4">
          {loading ? <><Loader2 className="h-5 w-5 animate-spin" />{t.form.submitting}</> : <><Send className="h-4 w-4" />{t.form.submit}</>}
        </button>
      </div>
    </form>
  );
}