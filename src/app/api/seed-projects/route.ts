import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const projects = [
      {
        titleAr: "DLAF — منصة التوصيل واللوجستيات",
        titleEn: "DLAF — Delivery & Logistics Platform",
        shortDescriptionAr: "نظام متكامل لإدارة التوصيل واللوجستيات يشمل تطبيق عملاء، تطبيق سائقين، ولوحة تحكم إدارية",
        shortDescriptionEn: "Comprehensive delivery and logistics management system with customer app, driver app, and admin dashboard",
        descriptionAr: "منصة DLAF هي نظام متكامل لإدارة التوصيل واللوجستيات، مبني بتقنيات حديثة تشمل NestJS وPostgreSQL وRedis للخادم، Flutter لتطبيقات الجوال (تطبيق عملاء + تطبيق سائقين)، وNext.js للوحة التحكم الإدارية. النظام يدعم تتبع الطلبات بشكل مباشر، إدارة السائقين والمناطق، وتقارير أداء شاملة.",
        descriptionEn: "DLAF is a comprehensive delivery and logistics management platform built with modern technologies including NestJS, PostgreSQL, and Redis for the backend, Flutter for mobile apps (customer + driver), and Next.js for the admin dashboard. The system supports real-time order tracking, driver and zone management, and comprehensive performance reports.",
        icon: "truck",
        slug: "dlaf-delivery-logistics",
        sortOrder: 1,
        isPublished: true,
        coverImage: null,
        projectUrl: null,
      },
      {
        titleAr: "IAP — منصة تقييم الابتكار",
        titleEn: "IAP — Innovation Assessment Platform",
        shortDescriptionAr: "أداة تقييم وتحليل القدرات الابتكارية للأفراد والمنشآت مع تقارير تفصيلية وتوصيات مخصصة",
        shortDescriptionEn: "Assessment and analysis tool for innovation capabilities with detailed reports and personalized recommendations",
        descriptionAr: "منصة IAP (مقياس الابتكار) هي أداة متقدمة لتقييم وتحليل القدرات الابتكارية للأفراد والمنشآت. تتضمن نظام أسئلة ذكي متعدد المهارات، تحليل فوري للنتائج، تقارير تفصيلية مع توصيات مخصصة لتطوير الابتكار، ولوحة إحصائيات عامة. مبنية بـ Python وSQLite وواجهة SPA تفاعلية.",
        descriptionEn: "IAP (Innovation Assessment Platform) is an advanced tool for assessing and analyzing innovation capabilities for individuals and organizations. It includes a smart multi-skill question system, real-time results analysis, detailed reports with personalized innovation development recommendations, and a general statistics dashboard. Built with Python, SQLite, and an interactive SPA interface.",
        icon: "lightbulb",
        slug: "iap-innovation-assessment",
        sortOrder: 2,
        isPublished: true,
        coverImage: null,
        projectUrl: null,
      },
      {
        titleAr: "نهج — نظام أتمتة الطلبات",
        titleEn: "Nahj — Orders Automation System",
        shortDescriptionAr: "نظام آلي لربط طلبات متجر سلة مع تيليجرام وGoogle Sheet مع تقارير يومية تلقائية",
        shortDescriptionEn: "Automated system connecting Salla store orders with Telegram and Google Sheet with automatic daily reports",
        descriptionAr: "نظام نهج هو حل أتمتة متقدم يربط طلبات متجر سلة مع تيليجرام وGoogle Sheet بشكل آلي. يستقبل الطلبات عبر Webhooks، يرسلها لمجموعة المندوبين على تيليجرام مع أزرار تفاعلية (إسناد/استلام/تسليم)، يحدّث Google Sheet تلقائياً، ويرسل تقرير إحصائي يومي. مبني بـ Node.js وExpress وPostgreSQL وTelegram Bot API.",
        descriptionEn: "Nahj is an advanced automation solution connecting Salla store orders with Telegram and Google Sheet automatically. It receives orders via Webhooks, sends them to the drivers' Telegram group with interactive buttons (assign/pickup/deliver), auto-updates Google Sheet, and sends daily statistical reports. Built with Node.js, Express, PostgreSQL, and Telegram Bot API.",
        icon: "workflow",
        slug: "nahj-orders-automation",
        sortOrder: 3,
        isPublished: true,
        coverImage: null,
        projectUrl: null,
      },
      {
        titleAr: "DataHub — مركز تحليل البيانات الذكي",
        titleEn: "DataHub — Smart Analytics Center",
        shortDescriptionAr: "منصة تحليل بيانات ذكية مع لوحات تحكم تفاعلية ودعم Power BI وSpark وHadoop وKafka",
        shortDescriptionEn: "Smart data analytics platform with interactive dashboards supporting Power BI, Spark, Hadoop, and Kafka",
        descriptionAr: "DataHub هو مركز تحليل بيانات ذكي متكامل يدعم تقنيات البيانات الضخمة مثل Power BI وSpark وHadoop وKafka. يتضمن لوحات تحكم تفاعلية، تقارير متقدمة، نظام إدارة مستخدمين، ومعالجة بيانات فورية. مبني بـ Python مع واجهة ويب تفاعلية وقاعدة بيانات متقدمة.",
        descriptionEn: "DataHub is a comprehensive smart data analytics center supporting big data technologies like Power BI, Spark, Hadoop, and Kafka. It includes interactive dashboards, advanced reports, user management system, and real-time data processing. Built with Python with an interactive web interface and advanced database.",
        icon: "brain",
        slug: "datahub-analytics",
        sortOrder: 4,
        isPublished: true,
        coverImage: null,
        projectUrl: null,
      },
    ];

    let added = 0;
    for (const project of projects) {
      const existing = await prisma.project.findUnique({ where: { slug: project.slug } });
      if (!existing) {
        await prisma.project.create({ data: project });
        added++;
      }
    }

    const total = await prisma.project.count();
    await prisma.$disconnect();

    return NextResponse.json({
      status: "success",
      message: `Added ${added} new projects. Total: ${total}`,
      projects: total,
    });
  } catch (error: unknown) {
    await prisma.$disconnect();
    return NextResponse.json({ status: "error", message: error instanceof Error ? error.message : "Unknown" }, { status: 500 });
  }
}