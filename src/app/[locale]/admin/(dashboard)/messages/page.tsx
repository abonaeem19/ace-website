"use client";

import { useState, useEffect } from "react";
import { Loader2, MessageSquare, X, Mail, Phone, User } from "lucide-react";
import { updateMessageStatus } from "@/lib/actions";

interface Message { id: string; fullName: string; email: string; phone: string | null; subject: string; message: string; status: string; createdAt: string; }

export default function AdminMessagesPage({ params }: { params: { locale: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const locale = params.locale || "ar";
  const isAr = locale === "ar";

  useEffect(() => { fetchMessages(); }, []);
  async function fetchMessages() { const res = await fetch(`/api/admin/messages`); setMessages(await res.json()); setLoading(false); }
  async function changeStatus(id: string, status: string) { await updateMessageStatus(id, status); fetchMessages(); }

  const statusBadge = (status: string) => {
    const map: Record<string, { bg: string; color: string; label: string }> = {
      new: { bg: "rgba(91,92,255,0.1)", color: "#818cf8", label: isAr ? "جديد" : "New" },
      reviewed: { bg: "rgba(245,158,11,0.1)", color: "#fbbf24", label: isAr ? "تمت المراجعة" : "Reviewed" },
      closed: { bg: "rgba(16,185,129,0.1)", color: "#34d399", label: isAr ? "مغلق" : "Closed" },
    };
    const s = map[status] || map.new;
    return <span className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--primary)" }} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(245,158,11,0.1)" }}>
          <MessageSquare className="h-5 w-5" style={{ color: "#f59e0b" }} />
        </div>
        <h1 className="font-almarai text-2xl font-bold">{isAr ? "إدارة الرسائل" : "Messages"}</h1>
        <span className="rounded-lg px-3 py-1 text-sm font-bold" style={{ background: "rgba(91,92,255,0.1)", color: "var(--primary)" }}>{messages.length}</span>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-almarai text-xl font-bold">{selected.subject}</h2>
              <button onClick={() => setSelected(null)} className="rounded-xl p-2" style={{ color: "var(--text-muted)" }}><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: "var(--bg-soft)" }}>
                <User className="h-4 w-4" style={{ color: "var(--primary)" }} /><span className="text-sm">{selected.fullName}</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: "var(--bg-soft)" }}>
                <Mail className="h-4 w-4" style={{ color: "var(--primary)" }} /><span className="text-sm">{selected.email}</span>
              </div>
              {selected.phone && <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: "var(--bg-soft)" }}><Phone className="h-4 w-4" style={{ color: "var(--primary)" }} /><span className="text-sm" dir="ltr">{selected.phone}</span></div>}
              <div className="rounded-xl p-4" style={{ background: "var(--bg-soft)", border: "1px solid var(--border)" }}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>{selected.message}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <select value={selected.status} onChange={(e) => { changeStatus(selected.id, e.target.value); setSelected({ ...selected, status: e.target.value }); }} className="input-ace !w-auto !py-2.5">
                <option value="new">{isAr ? "جديد" : "New"}</option>
                <option value="reviewed">{isAr ? "تمت المراجعة" : "Reviewed"}</option>
                <option value="closed">{isAr ? "مغلق" : "Closed"}</option>
              </select>
              <button onClick={() => setSelected(null)} className="btn-secondary !py-2.5">{isAr ? "إغلاق" : "Close"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {messages.length === 0 ? (
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
            </tr></thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} onClick={() => setSelected(msg)} className="cursor-pointer transition-all duration-300 hover:bg-[rgba(255,255,255,0.02)]" style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-5 py-4"><p className="text-sm font-medium">{msg.fullName}</p><p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>{msg.email}</p></td>
                  <td className="px-5 py-4 text-sm" style={{ color: "var(--text-soft)" }}>{msg.subject}</td>
                  <td className="px-5 py-4 text-center">{statusBadge(msg.status)}</td>
                  <td className="px-5 py-4 text-center text-xs" style={{ color: "var(--text-muted)" }}>{new Date(msg.createdAt).toLocaleDateString(isAr ? "ar-SA" : "en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}