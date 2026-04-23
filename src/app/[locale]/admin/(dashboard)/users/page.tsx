"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, Users, X, Shield, ShieldCheck, ShieldAlert, UserCheck, UserX, Eye, EyeOff, Key } from "lucide-react";
import { createUser, updateUser, deleteUser, toggleUserActive } from "@/lib/actions";

interface User { id: string; name: string; email: string; role: string; isActive: boolean; createdAt: string; }

const ROLES = [
  { value: "super_admin", labelAr: "مدير عام", labelEn: "Super Admin", color: "#EF4444", icon: ShieldAlert },
  { value: "admin", labelAr: "مدير", labelEn: "Admin", color: "#00F0FF", icon: ShieldCheck },
  { value: "editor", labelAr: "محرر", labelEn: "Editor", color: "#F59E0B", icon: Shield },
  { value: "viewer", labelAr: "مشاهد", labelEn: "Viewer", color: "#64748B", icon: Eye },
];

const PERMISSIONS: Record<string, { labelAr: string; labelEn: string; perms: string[] }> = {
  super_admin: { labelAr: "كل الصلاحيات", labelEn: "Full Access", perms: ["services", "projects", "messages", "quotes", "settings", "users"] },
  admin: { labelAr: "إدارة المحتوى والرسائل", labelEn: "Content & Messages", perms: ["services", "projects", "messages", "quotes", "settings"] },
  editor: { labelAr: "تعديل المحتوى فقط", labelEn: "Edit Content Only", perms: ["services", "projects"] },
  viewer: { labelAr: "عرض فقط", labelEn: "View Only", perms: [] },
};

export default function AdminUsersPage({ params }: { params: { locale: string } }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [error, setError] = useState("");
  const locale = params.locale || "ar";
  const isAr = locale === "ar";

  useEffect(() => { fetchUsers(); }, []);
  async function fetchUsers() { const res = await fetch("/api/admin/users"); setUsers(await res.json()); setLoading(false); }

  function openForm(user?: User) { setEditing(user || null); setError(""); setShowForm(true); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError("");
    const formData = new FormData(e.currentTarget);
    let result;
    if (editing) { result = await updateUser(editing.id, formData); }
    else { result = await createUser(formData); }
    if (result?.error) { setError(result.error); return; }
    setShowForm(false); setEditing(null); fetchUsers();
  }

  async function handleDelete(id: string) {
    if (!confirm(isAr ? "هل أنت متأكد من حذف هذا المستخدم؟" : "Delete this user?")) return;
    const result = await deleteUser(id);
    if (result?.error) { alert(result.error); return; }
    fetchUsers();
  }

  async function handleToggleActive(id: string) {
    const result = await toggleUserActive(id);
    if (result?.error) { alert(result.error); return; }
    fetchUsers();
  }

  function getRoleInfo(role: string) { return ROLES.find(r => r.value === role) || ROLES[3]; }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--primary)" }} /></div>;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(236,72,153,0.1)" }}>
            <Users className="h-5 w-5" style={{ color: "#EC4899" }} />
          </div>
          <div>
            <h1 className="font-almarai text-2xl font-bold">{isAr ? "إدارة المستخدمين" : "User Management"}</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{isAr ? "إضافة مستخدمين وتعيين الصلاحيات" : "Add users and assign permissions"}</p>
          </div>
        </div>
        <button onClick={() => openForm()} className="btn-primary !py-3 !px-6 !text-sm">
          <Plus className="h-4 w-4" />{isAr ? "إضافة مستخدم" : "Add User"}
        </button>
      </div>

      {/* Permissions Legend */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ROLES.map(role => {
          const perms = PERMISSIONS[role.value];
          return (
            <div key={role.value} className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="mb-2 flex items-center gap-2">
                <role.icon className="h-4 w-4" style={{ color: role.color }} />
                <span className="text-sm font-bold" style={{ color: role.color }}>{isAr ? role.labelAr : role.labelEn}</span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{isAr ? perms.labelAr : perms.labelEn}</p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-8" style={{ background: "var(--bg-soft)", border: "1px solid var(--border)" }}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-almarai text-xl font-bold">{editing ? (isAr ? "تعديل مستخدم" : "Edit User") : (isAr ? "إضافة مستخدم جديد" : "Add New User")}</h2>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="rounded-xl p-2" style={{ color: "var(--text-muted)" }}><X className="h-5 w-5" /></button>
            </div>

            {error && (
              <div className="mb-4 rounded-xl p-3 text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.15)" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>{isAr ? "الاسم الكامل" : "Full Name"}</label>
                <input name="name" defaultValue={editing?.name} required className="input-ace" />
              </div>
              <div>
                <label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>{isAr ? "البريد الإلكتروني" : "Email"}</label>
                <input name="email" type="email" defaultValue={editing?.email} required className="input-ace" dir="ltr" />
              </div>
              <div>
                <label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>
                  {editing ? (isAr ? "كلمة المرور (اتركها فارغة للإبقاء)" : "Password (leave empty to keep)") : (isAr ? "كلمة المرور" : "Password")}
                </label>
                <input name="password" type="password" required={!editing} minLength={6} className="input-ace" dir="ltr" placeholder="••••••••" />
              </div>
              <div>
                <label className="mb-2 block text-sm" style={{ color: "var(--text-soft)" }}>{isAr ? "الصلاحية" : "Role"}</label>
                <select name="role" defaultValue={editing?.role || "editor"} className="input-ace">
                  {ROLES.map(r => (
                    <option key={r.value} value={r.value}>{isAr ? r.labelAr : r.labelEn}</option>
                  ))}
                </select>
              </div>

              {/* Permission preview */}
              <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="mb-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "صلاحيات هذا الدور:" : "Role permissions:"}</p>
                <div className="flex flex-wrap gap-2" id="perm-preview">
                  {(["services", "projects", "messages", "quotes", "settings", "users"] as const).map(p => (
                    <span key={p} className="rounded px-2 py-1 text-[11px] font-medium" style={{
                      background: "rgba(0,240,255,0.05)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }}>
                      {p === "services" ? (isAr ? "الخدمات" : "Services") :
                       p === "projects" ? (isAr ? "المشاريع" : "Projects") :
                       p === "messages" ? (isAr ? "الرسائل" : "Messages") :
                       p === "quotes" ? (isAr ? "العروض" : "Quotes") :
                       p === "settings" ? (isAr ? "الإعدادات" : "Settings") :
                       (isAr ? "المستخدمين" : "Users")}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary !py-3">{isAr ? "حفظ" : "Save"}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="btn-secondary !py-3">{isAr ? "إلغاء" : "Cancel"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <table className="w-full">
          <thead><tr style={{ borderBottom: "1px solid var(--border)" }}>
            <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>#</th>
            <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "المستخدم" : "User"}</th>
            <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "الصلاحية" : "Role"}</th>
            <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "الحالة" : "Status"}</th>
            <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "التاريخ" : "Date"}</th>
            <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "إجراءات" : "Actions"}</th>
          </tr></thead>
          <tbody>
            {users.map((u, i) => {
              const roleInfo = getRoleInfo(u.role);
              const RoleIcon = roleInfo.icon;
              return (
                <tr key={u.id} className="transition-all duration-300 hover:bg-[rgba(0,240,255,0.02)]" style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold" style={{ background: `${roleInfo.color}15`, color: roleInfo.color, border: `1px solid ${roleInfo.color}30` }}>
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: `${roleInfo.color}15`, color: roleInfo.color, border: `1px solid ${roleInfo.color}25` }}>
                      <RoleIcon className="h-3 w-3" />
                      {isAr ? roleInfo.labelAr : roleInfo.labelEn}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium" style={{
                      background: u.isActive ? "rgba(16,185,129,0.1)" : "rgba(107,122,153,0.1)",
                      color: u.isActive ? "#34d399" : "var(--text-muted)",
                    }}>
                      {u.isActive ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                      {u.isActive ? (isAr ? "نشط" : "Active") : (isAr ? "معطّل" : "Disabled")}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-xs" style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}>
                    {new Date(u.createdAt).toLocaleDateString(isAr ? "ar-SA" : "en-US")}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleToggleActive(u.id)} className="rounded-xl p-2 transition-all hover:bg-[rgba(0,240,255,0.05)]" style={{ color: "var(--text-muted)" }} title={u.isActive ? "Deactivate" : "Activate"}>
                        {u.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openForm(u)} className="rounded-xl p-2 transition-all hover:bg-[rgba(0,240,255,0.1)]" style={{ color: "var(--primary)" }} title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(u.id)} className="rounded-xl p-2 transition-all hover:bg-[rgba(239,68,68,0.1)]" style={{ color: "#f87171" }} title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}