# ACE | Advanced Code Engines

موقع شركة **ACE** الرسمي — شركة تقنية متخصصة في تطوير البرمجيات والحلول الرقمية المتقدمة.

## التقنيات المستخدمة

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes + Server Actions
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT (jose + bcryptjs)
- **Language:** TypeScript
- **Deployment:** Vercel

## التشغيل المحلي

### 1. تثبيت الحزم

```bash
cd ACE
npm install
```

### 2. إعداد قاعدة البيانات

انسخ `.env.example` إلى `.env` وعدّل بيانات الاتصال:

```bash
cp .env.example .env
```

تأكد أن PostgreSQL يعمل ثم نفّذ:

```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 3. تشغيل المشروع

```bash
npm run dev
```

الموقع يعمل على: http://localhost:3000

### 4. الوصول للوحة التحكم

- الرابط: http://localhost:3000/ar/admin/login
- البريد: admin@ace.com
- كلمة المرور: القيمة في ملف `.env` (ADMIN_PASSWORD)

## هيكلة المشروع

```
ACE/
├── prisma/
│   ├── schema.prisma          # هيكل قاعدة البيانات
│   └── seed.ts                # بيانات أولية
├── src/
│   ├── app/
│   │   ├── [locale]/          # صفحات ثنائية اللغة
│   │   │   ├── page.tsx       # الرئيسية
│   │   │   ├── about/         # من نحن
│   │   │   ├── services/      # الخدمات
│   │   │   ├── projects/      # المشاريع
│   │   │   ├── quote/         # طلب عرض سعر
│   │   │   ├── contact/       # تواصل معنا
│   │   │   └── admin/         # لوحة التحكم
│   │   │       ├── login/
│   │   │       └── (dashboard)/
│   │   │           ├── services/
│   │   │           ├── projects/
│   │   │           ├── messages/
│   │   │           ├── quotes/
│   │   │           └── settings/
│   │   └── api/admin/         # API Routes
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── forms/             # ContactForm, QuoteForm
│   │   └── admin/             # AdminSidebar
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   ├── auth.ts            # JWT authentication
│   │   ├── utils.ts           # Helper functions
│   │   ├── i18n/              # ثنائية اللغة
│   │   ├── validations/       # Zod schemas
│   │   ├── queries/           # Database queries
│   │   └── actions/           # Server actions
│   ├── types/
│   └── styles/
├── package.json
├── tailwind.config.ts
└── .env.example
```

## الصفحات

### الواجهة العامة
- **الرئيسية** — Hero + خدمات + لماذا ACE + CTA
- **من نحن** — الرؤية + الرسالة + القيم
- **الخدمات** — 9 خدمات ديناميكية من القاعدة
- **المشاريع** — معرض مشاريع ديناميكي
- **طلب عرض سعر** — نموذج مرتبط بالقاعدة
- **تواصل معنا** — نموذج تواصل + بيانات الاتصال

### لوحة التحكم
- **Dashboard** — إحصائيات + آخر الرسائل والطلبات
- **إدارة الخدمات** — CRUD كامل
- **إدارة المشاريع** — CRUD كامل
- **الرسائل** — عرض + تغيير الحالة
- **طلبات العروض** — عرض + تغيير الحالة
- **الإعدادات** — هوية + تواصل + محتوى + ألوان

## النشر على Vercel

```bash
npx vercel
```

تأكد من إضافة متغيرات البيئة في Vercel Dashboard.

---

**ACE — Advanced Code Engines** © 2024