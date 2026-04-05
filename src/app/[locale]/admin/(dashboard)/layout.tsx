import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getDictionary, type Locale } from "@/lib/i18n";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  if (!session) redirect(`/${locale}/admin/login`);
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-main)" }}>
      <AdminSidebar locale={locale} dict={dict} />
      <main className="ps-64">
        <div className="p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}