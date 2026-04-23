"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Layers, X } from "lucide-react";
import { createService, updateService, deleteService, toggleServicePublish } from "@/lib/actions";

interface Service { id: string; titleAr: string; titleEn: string; shortDescriptionAr: string; shortDescriptionEn: string; descriptionAr: string; descriptionEn: string; icon: string; slug: string; sortOrder: number; isPublished: boolean; }

export default function AdminServicesPage({ params }: { params: { locale: string } }) {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const locale = params.locale || "ar";
  const isAr = locale === "ar";

  useEffect(() => { fetchServices(); }, []);
  async function fetchServices() { const res = await fetch(`/api/admin/services`); setServices(await res.json()); setLoading(false); }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editing) await updateService(editing.id, formData); else await createService(formData);
    setShowForm(false); setEditing(null); fetchServices();
  }
  async function handleDelete(id: string) { if (!confirm(isAr ? "هل أنت متأكد؟" : "Are you sure?")) return; await deleteService(id); fetchServices(); }
  async function handleTogglePublish(id: string) { await toggleServicePublish(id); fetchServices(); }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--primary)" }} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(0,240,255,0.08)" }}>
            <Layers className="h-5 w-5" style={{ color: "var(--primary)" }} />
          </div>
          <h1 className="font-almarai text-2xl font-bold">{isAr ? "إدارة الخدمات" : "Manage Services"}</h1>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary !py-3 !px-6 !text-sm">
          <Plus className="h-4 w-4" />{isAr ? "إضافة خدمة" : "Add Service"}
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-almarai text-xl font-bold">{editing ? (isAr ? "تعديل خدمة" : "Edit") : (isAr ? "إضافة خدمة" : "Add Service")}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="rounded-xl p-2 transition-all" style={{ color: "var(--text-muted)" }}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>العنوان بالعربية</label><input name="titleAr" defaultValue={editing?.titleAr} required className="input-ace" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Title (English)</label><input name="titleEn" defaultValue={editing?.titleEn} required className="input-ace" /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>الوصف المختصر عربي</label><textarea name="shortDescriptionAr" defaultValue={editing?.shortDescriptionAr} required rows={2} className="input-ace resize-none" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Short Description EN</label><textarea name="shortDescriptionEn" defaultValue={editing?.shortDescriptionEn} required rows={2} className="input-ace resize-none" /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>الوصف الكامل عربي</label><textarea name="descriptionAr" defaultValue={editing?.descriptionAr} required rows={4} className="input-ace resize-none" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Full Description EN</label><textarea name="descriptionEn" defaultValue={editing?.descriptionEn} required rows={4} className="input-ace resize-none" /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Icon</label><input name="icon" defaultValue={editing?.icon || "code"} className="input-ace" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Slug</label><input name="slug" defaultValue={editing?.slug} required className="input-ace" dir="ltr" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>الترتيب</label><input name="sortOrder" type="number" defaultValue={editing?.sortOrder || 0} className="input-ace" /></div>
              </div>
              <div className="flex items-center gap-2"><input name="isPublished" type="checkbox" defaultChecked={editing?.isPublished ?? true} value="true" className="rounded" /><label className="text-sm" style={{ color: "var(--text-soft)" }}>{isAr ? "نشر" : "Published"}</label></div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary !py-3">{isAr ? "حفظ" : "Save"}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="btn-secondary !py-3">{isAr ? "إلغاء" : "Cancel"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>#</th>
              <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "العنوان" : "Title"}</th>
              <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>Slug</th>
              <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "الحالة" : "Status"}</th>
              <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "إجراءات" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => (
              <tr key={service.id} className="transition-all duration-300 hover:bg-[rgba(0,240,255,0.02)]" style={{ borderBottom: "1px solid var(--border)" }}>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                <td className="px-5 py-4 text-sm font-medium">{isAr ? service.titleAr : service.titleEn}</td>
                <td className="px-5 py-4 text-sm" dir="ltr" style={{ color: "var(--text-muted)" }}>{service.slug}</td>
                <td className="px-5 py-4 text-center">
                  <span className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{
                    background: service.isPublished ? "rgba(16,185,129,0.1)" : "rgba(107,122,153,0.1)",
                    color: service.isPublished ? "#34d399" : "var(--text-muted)",
                  }}>{service.isPublished ? (isAr ? "منشور" : "Published") : (isAr ? "مسودة" : "Draft")}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => handleTogglePublish(service.id)} className="rounded-xl p-2 transition-all hover:bg-[rgba(255,255,255,0.05)]" style={{ color: "var(--text-muted)" }}>{service.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                    <button onClick={() => { setEditing(service); setShowForm(true); }} className="rounded-xl p-2 transition-all hover:bg-[rgba(0,240,255,0.08)]" style={{ color: "var(--primary)" }}><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(service.id)} className="rounded-xl p-2 transition-all hover:bg-[rgba(239,68,68,0.1)]" style={{ color: "#f87171" }}><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}