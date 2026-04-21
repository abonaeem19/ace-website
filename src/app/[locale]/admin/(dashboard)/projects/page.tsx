"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, FolderKanban, X, Upload, Image as ImageIcon } from "lucide-react";
import { createProject, updateProject, deleteProject, toggleProjectPublish } from "@/lib/actions";

interface Project { id: string; titleAr: string; titleEn: string; shortDescriptionAr: string; shortDescriptionEn: string; descriptionAr: string; descriptionEn: string; coverImage: string | null; projectUrl: string | null; slug: string; sortOrder: number; isPublished: boolean; }

export default function AdminProjectsPage({ params }: { params: { locale: string } }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const locale = params.locale || "ar";
  const isAr = locale === "ar";

  useEffect(() => { fetchProjects(); }, []);
  async function fetchProjects() { const res = await fetch(`/api/admin/projects`); setProjects(await res.json()); setLoading(false); }

  function openForm(project?: Project) {
    setEditing(project || null);
    setCoverImageUrl(project?.coverImage || "");
    setShowForm(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) setCoverImageUrl(data.url);
    } catch (err) { console.error("Upload failed:", err); }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("coverImage", coverImageUrl);
    if (editing) await updateProject(editing.id, formData); else await createProject(formData);
    setShowForm(false); setEditing(null); setCoverImageUrl(""); fetchProjects();
  }

  async function handleDelete(id: string) { if (!confirm(isAr ? "هل أنت متأكد؟" : "Are you sure?")) return; await deleteProject(id); fetchProjects(); }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--primary)" }} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(16,185,129,0.1)" }}>
            <FolderKanban className="h-5 w-5" style={{ color: "#10b981" }} />
          </div>
          <h1 className="font-almarai text-2xl font-bold">{isAr ? "إدارة المشاريع" : "Manage Projects"}</h1>
        </div>
        <button onClick={() => openForm()} className="btn-primary !py-3 !px-6 !text-sm"><Plus className="h-4 w-4" />{isAr ? "إضافة مشروع" : "Add Project"}</button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-almarai text-xl font-bold">{editing ? (isAr ? "تعديل مشروع" : "Edit") : (isAr ? "إضافة مشروع" : "Add Project")}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null); setCoverImageUrl(""); }} className="rounded-xl p-2" style={{ color: "var(--text-muted)" }}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>العنوان بالعربية</label><input name="titleAr" defaultValue={editing?.titleAr} required className="input-ace" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Title (EN)</label><input name="titleEn" defaultValue={editing?.titleEn} required className="input-ace" /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>وصف مختصر عربي</label><textarea name="shortDescriptionAr" defaultValue={editing?.shortDescriptionAr} required rows={2} className="input-ace resize-none" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Short Desc (EN)</label><textarea name="shortDescriptionEn" defaultValue={editing?.shortDescriptionEn} required rows={2} className="input-ace resize-none" /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>وصف كامل عربي</label><textarea name="descriptionAr" defaultValue={editing?.descriptionAr} required rows={4} className="input-ace resize-none" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Full Desc (EN)</label><textarea name="descriptionEn" defaultValue={editing?.descriptionEn} required rows={4} className="input-ace resize-none" /></div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>{isAr ? "صورة الغلاف" : "Cover Image"}</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex w-full items-center justify-center gap-2 rounded-xl py-4 transition-all duration-300" style={{ background: "var(--input-bg)", border: "2px dashed var(--border)", color: "var(--text-muted)" }}>
                      {uploading ? <><Loader2 className="h-5 w-5 animate-spin" />{isAr ? "جارٍ الرفع..." : "Uploading..."}</> : <><Upload className="h-5 w-5" />{isAr ? "اختر صورة من الملفات" : "Choose image file"}</>}
                    </button>
                  </div>
                  {coverImageUrl && (
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl" style={{ border: "1px solid var(--border)" }}>
                      <img src={coverImageUrl} alt="Preview" className="h-full w-full object-cover" />
                      <button type="button" onClick={() => setCoverImageUrl("")} className="absolute -top-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: "#ef4444", fontSize: "10px" }}>✕</button>
                    </div>
                  )}
                </div>
                <input type="hidden" name="coverImage" value={coverImageUrl} />
              </div>

              <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>{isAr ? "رابط المشروع (اتركه فارغاً إذا قيد التطوير)" : "Project URL (leave empty if in development)"}</label><input name="projectUrl" defaultValue={editing?.projectUrl || ""} className="input-ace" dir="ltr" placeholder="https://..." /></div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>Slug</label><input name="slug" defaultValue={editing?.slug} required className="input-ace" dir="ltr" /></div>
                <div><label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>{isAr ? "الترتيب" : "Order"}</label><input name="sortOrder" type="number" defaultValue={editing?.sortOrder || 0} className="input-ace" /></div>
                <div className="flex items-end gap-2 pb-1"><input name="isPublished" type="checkbox" defaultChecked={editing?.isPublished ?? true} value="true" /><label className="text-sm" style={{ color: "var(--text-soft)" }}>{isAr ? "نشر" : "Published"}</label></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary !py-3">{isAr ? "حفظ" : "Save"}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); setCoverImageUrl(""); }} className="btn-secondary !py-3">{isAr ? "إلغاء" : "Cancel"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <table className="w-full">
          <thead><tr style={{ borderBottom: "1px solid var(--border)" }}>
            <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>#</th>
            <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "الصورة" : "Image"}</th>
            <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "العنوان" : "Title"}</th>
            <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "الحالة" : "Status"}</th>
            <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "إجراءات" : "Actions"}</th>
          </tr></thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={p.id} className="transition-all duration-300 hover:bg-[rgba(91,92,255,0.02)]" style={{ borderBottom: "1px solid var(--border)" }}>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                <td className="px-5 py-4">
                  {p.coverImage ? (
                    <div className="h-10 w-14 overflow-hidden rounded-lg"><img src={p.coverImage} alt="" className="h-full w-full object-cover" /></div>
                  ) : (
                    <div className="flex h-10 w-14 items-center justify-center rounded-lg" style={{ background: "var(--bg-soft)" }}><ImageIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} /></div>
                  )}
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium">{isAr ? p.titleAr : p.titleEn}</p>
                  {!p.projectUrl && <span className="mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>{isAr ? "قيد التطوير" : "In Dev"}</span>}
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: p.isPublished ? "rgba(16,185,129,0.1)" : "rgba(107,122,153,0.1)", color: p.isPublished ? "#34d399" : "var(--text-muted)" }}>{p.isPublished ? (isAr ? "منشور" : "Published") : (isAr ? "مسودة" : "Draft")}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => toggleProjectPublish(p.id).then(fetchProjects)} className="rounded-xl p-2 transition-all hover:bg-[rgba(91,92,255,0.05)]" style={{ color: "var(--text-muted)" }}>{p.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                    <button onClick={() => openForm(p)} className="rounded-xl p-2 transition-all hover:bg-[rgba(91,92,255,0.1)]" style={{ color: "var(--primary)" }}><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="rounded-xl p-2 transition-all hover:bg-[rgba(239,68,68,0.1)]" style={{ color: "#f87171" }}><Trash2 className="h-4 w-4" /></button>
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