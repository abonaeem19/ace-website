"use client";

import { useState, useEffect } from "react";
import { Loader2, MessageSquare, X, Mail, Phone, User, Trash2, Search, Filter } from "lucide-react";
import { updateMessageStatus, deleteMessage } from "@/lib/actions";

interface Message { id: string; fullName: string; email: string; phone: string | null; subject: string; message: string; status: string; createdAt: string; }

export default function AdminMessagesPage({ params }: { params: { locale: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const locale = params.locale || "ar";
  const isAr = locale === "ar";

  useEffect(() => { fetchMessages(); }, []);
  async function fetchMessages() { const res = await fetch(`/api/admin/messages`); setMessages(await res.json()); setLoading(false); }
  async function changeStatus(id: string, status: string) { await updateMessageStatus(id, status); fetchMessages(); }
  async function handleDelete(id: string) {
    if (!confirm(isAr ? "هل أنت متأكد من حذف هذه الرسالة؟" : "Delete this message?")) return;
    await deleteMessage(id); setSelected(null); fetchMessages();
  }

  const filtered = messages.filter(m => {
    if (filter !== "all" && m.status !== filter) return false;
    if (search && !m.fullName.includes(search) && !m.email.includes(search) && !m.subject.includes(search)) return false;
    return true;
  });

  const counts = { all: messages.length, new: messages.filter(m => m.status === "new").length, reviewed: messages.filter(m => m.status === "reviewed").length, closed: messages.filter(m => m.status === "closed").length };

  const statusBadge = (status: string) => {
    const map: Record<string, { bg: string; color: string; label: string }> = {
      new: { bg: "rgba(0,240,255,0.1)", color: "#00F0FF", label: isAr ? "جديد" : "New" },
      reviewed: { bg: "rgba(245,158,11,0.1)", color: "#fbbf24", label: isAr ? "تمت المراجعة" : "Reviewed" },
      closed: { bg: "rgba(16,185,129,0.1)", color: "#34d399", label: isAr ? "مغلق" : "Closed" },
    };
    const s = map[status] || map.new;
    return <span className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
  };

  const filterTabs = [
    { key: "all", label: isAr ? "الكل" : "All", count: counts.all },
    { key: "new", label: isAr ? "جديد" : "New", count: counts.new },
    { key: "reviewed", label: isAr ? "مراجعة" : "Reviewed", count: counts.reviewed },
    { key: "closed", label: isAr ? "مغلق" : "Closed", count: counts.closed },
  ];

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--primary)" }} /></div>;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(0,240,255,0.08)" }}>
          <MessageSquare className="h-5 w-5" style={{ color: "var(--primary)" }} />
        </div>
        <h1 className="font-almarai text-2xl font-bold">{isAr ? "إدارة الرسائل" : "Messages"}</h1>
        <span className="rounded-lg px-3 py-1 text-sm font-bold" style={{ background: "rgba(0,240,255,0.1)", color: "var(--primary)" }}>{messages.length}</span>
      </div>

      {/* Filter Tabs + Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {filterTabs.map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)} className="rounded-lg px-4 py-2 text-sm font-medium transition-all" style={{
              background: filter === tab.key ? "rgba(0,240,255,0.1)" : "transparent",
              color: filter === tab.key ? "var(--primary)" : "var(--text-muted)",
              border: filter === tab.key ? "1px solid rgba(0,240,255,0.2)" : "1px solid transparent",
            }}>
              {tab.label} <span className="ms-1 text-xs">({tab.count})</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={isAr ? "بحث..." : "Search..."} className="input-ace !py-2.5 !ps-10" style={{ maxWidth: 250 }} />
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-8" style={{ background: "var(--bg-soft)", border: "1px solid var(--border)" }}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-almarai text-xl font-bold">{selected.subject}</h2>
              <button onClick={() => setSelected(null)} className="rounded-xl p-2" style={{ color: "var(--text-muted)" }}><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: "var(--bg-card)" }}><User className="h-4 w-4" style={{ color: "var(--primary)" }} /><span className="text-sm">{selected.fullName}</span></div>
              <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: "var(--bg-card)" }}><Mail className="h-4 w-4" style={{ color: "var(--primary)" }} /><span className="text-sm">{selected.email}</span></div>
              {selected.phone && <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: "var(--bg-card)" }}><Phone className="h-4 w-4" style={{ color: "var(--primary)" }} /><span className="text-sm" dir="ltr">{selected.phone}</span></div>}
              <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>{selected.message}</p>
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{new Date(selected.createdAt).toLocaleString(isAr ? "ar-SA" : "en-US")}</div>
            </div>
            <div className="mt-6 flex gap-3">
              <select value={selected.status} onChange={(e) => { changeStatus(selected.id, e.target.value); setSelected({ ...selected, status: e.target.value }); }} className="input-ace !w-auto !py-2.5">
                <option value="new">{isAr ? "جديد" : "New"}</option>
                <option value="reviewed">{isAr ? "تمت المراجعة" : "Reviewed"}</option>
                <option value="closed">{isAr ? "مغلق" : "Closed"}</option>
              </select>
              <button onClick={() => handleDelete(selected.id)} className="rounded-xl px-4 py-2.5 text-sm font-medium transition-all" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.15)" }}>
                <Trash2 className="inline h-4 w-4" /> {isAr ? "حذف" : "Delete"}
              </button>
              <button onClick={() => setSelected(null)} className="btn-secondary !py-2.5">{isAr ? "إغلاق" : "Close"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl py-20 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <MessageSquare className="mx-auto mb-4 h-12 w-12" style={{ color: "var(--text-muted)" }} />
          <p style={{ color: "var(--text-muted)" }}>{isAr ? "لا توجد رسائل" : "No messages"}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <table className="w-full">
            <thead><tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "الاسم" : "Name"}</th>
              <th className="px-5 py-4 text-start text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "الموضوع" : "Subject"}</th>
              <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "الحالة" : "Status"}</th>
              <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "التاريخ" : "Date"}</th>
              <th className="px-5 py-4 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>{isAr ? "إجراءات" : "Actions"}</th>
            </tr></thead>
            <tbody>
              {filtered.map((msg) => (
                <tr key={msg.id} className="cursor-pointer transition-all duration-300 hover:bg-[rgba(0,240,255,0.02)]" style={{ borderBottom: "1px solid var(--border)" }} onClick={() => setSelected(msg)}>
                  <td className="px-5 py-4"><p className="text-sm font-medium">{msg.fullName}</p><p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>{msg.email}</p></td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--text-soft)" }}>{msg.subject}</td>
                  <td className="px-5 py-4 text-center">{statusBadge(msg.status)}</td>
                  <td className="px-5 py-4 text-center text-xs" style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}>{new Date(msg.createdAt).toLocaleDateString(isAr ? "ar-SA" : "en-US")}</td>
                  <td className="px-5 py-4 text-center" onClick={e => e.stopPropagation()}>
                    <button onClick={() => handleDelete(msg.id)} className="rounded-xl p-2 transition-all hover:bg-[rgba(239,68,68,0.1)]" style={{ color: "#f87171" }}><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}