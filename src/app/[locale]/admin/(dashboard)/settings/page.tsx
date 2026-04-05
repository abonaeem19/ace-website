"use client";

import { useState, useEffect } from "react";
import { Loader2, Check, Settings as SettingsIcon } from "lucide-react";
import { updateSettings } from "@/lib/actions";

export default function AdminSettingsPage({ params }: { params: { locale: string } }) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const locale = params.locale || "ar";
  const isAr = locale === "ar";

  useEffect(() => { fetch("/api/admin/settings").then(r => r.json()).then(data => { setSettings(data || {}); setLoading(false); }); }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true); setSaved(false);
    const formData = new FormData(e.currentTarget);
    await updateSettings(formData);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--primary)" }} /></div>;

  const Field = ({ label, name, type = "text", dir }: { label: string; name: string; type?: string; dir?: string }) => (
    <div>
      <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{label}</label>
      {type === "textarea" ? <textarea name={name} defaultValue={settings[name] || ""} rows={4} className="input-ace resize-none" dir={dir} /> : <input name={name} defaultValue={settings[name] || ""} className="input-ace" dir={dir} />}
    </div>
  );

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="px-7 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <h2 className="font-almarai text-lg font-bold">{title}</h2>
      </div>
      <div className="p-7">{children}</div>
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(91,92,255,0.1)" }}>
          <SettingsIcon className="h-5 w-5" style={{ color: "var(--primary)" }} />
        </div>
        <h1 className="font-almarai text-2xl font-bold">{isAr ? "إعدادات الموقع" : "Site Settings"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SectionCard title={isAr ? "هوية الموقع" : "Site Identity"}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={isAr ? "اسم الموقع (عربي)" : "Site Name (AR)"} name="siteNameAr" />
            <Field label={isAr ? "اسم الموقع (إنجليزي)" : "Site Name (EN)"} name="siteNameEn" />
            <Field label={isAr ? "الشعار النصي (عربي)" : "Tagline (AR)"} name="taglineAr" />
            <Field label={isAr ? "الشعار النصي (إنجليزي)" : "Tagline (EN)"} name="taglineEn" />
          </div>
        </SectionCard>

        <SectionCard title={isAr ? "بيانات التواصل" : "Contact Info"}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={isAr ? "الهاتف" : "Phone"} name="phone" dir="ltr" />
            <Field label={isAr ? "واتساب" : "WhatsApp"} name="whatsapp" dir="ltr" />
            <Field label={isAr ? "البريد" : "Email"} name="email" dir="ltr" />
            <Field label={isAr ? "العنوان (عربي)" : "Address (AR)"} name="addressAr" />
            <Field label={isAr ? "العنوان (إنجليزي)" : "Address (EN)"} name="addressEn" />
          </div>
        </SectionCard>

        <SectionCard title={isAr ? "من نحن" : "About"}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={isAr ? "نبذة (عربي)" : "About (AR)"} name="aboutAr" type="textarea" />
            <Field label={isAr ? "نبذة (إنجليزي)" : "About (EN)"} name="aboutEn" type="textarea" />
            <Field label={isAr ? "الرؤية (عربي)" : "Vision (AR)"} name="visionAr" type="textarea" />
            <Field label={isAr ? "الرؤية (إنجليزي)" : "Vision (EN)"} name="visionEn" type="textarea" />
            <Field label={isAr ? "الرسالة (عربي)" : "Mission (AR)"} name="missionAr" type="textarea" />
            <Field label={isAr ? "الرسالة (إنجليزي)" : "Mission (EN)"} name="missionEn" type="textarea" />
          </div>
        </SectionCard>

        <SectionCard title={isAr ? "المظهر" : "Appearance"}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{isAr ? "اللون الأساسي" : "Primary Color"}</label>
              <div className="flex gap-3"><input name="primaryColor" defaultValue={settings.primaryColor || "#5b5cff"} className="input-ace flex-1" dir="ltr" /><input type="color" defaultValue={settings.primaryColor || "#5b5cff"} className="h-12 w-12 cursor-pointer rounded-xl border-0" style={{ background: "var(--bg-soft)" }} /></div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium" style={{ color: "var(--text-soft)" }}>{isAr ? "اللون الثانوي" : "Secondary Color"}</label>
              <div className="flex gap-3"><input name="secondaryColor" defaultValue={settings.secondaryColor || "#7a5cff"} className="input-ace flex-1" dir="ltr" /><input type="color" defaultValue={settings.secondaryColor || "#7a5cff"} className="h-12 w-12 cursor-pointer rounded-xl border-0" style={{ background: "var(--bg-soft)" }} /></div>
            </div>
          </div>
        </SectionCard>

        <div className="flex items-center gap-4 pt-2">
          <button type="submit" disabled={saving} className="btn-primary !py-3.5">
            {saving ? <><Loader2 className="h-5 w-5 animate-spin" />{isAr ? "جارٍ الحفظ..." : "Saving..."}</>
              : saved ? <><Check className="h-5 w-5" />{isAr ? "تم الحفظ" : "Saved"}</>
              : (isAr ? "حفظ التغييرات" : "Save Changes")}
          </button>
        </div>
      </form>
    </div>
  );
}