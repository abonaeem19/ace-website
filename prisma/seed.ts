import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@123456", 12);

  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@ace.com" },
    update: {},
    create: {
      name: "مدير النظام",
      email: process.env.ADMIN_EMAIL || "admin@ace.com",
      passwordHash: hashedPassword,
      role: "admin",
      isActive: true,
    },
  });
  console.log("✅ Admin user created");

  const services = [
    { titleAr: "تطوير المواقع الإلكترونية", titleEn: "Website Development", shortDescriptionAr: "تصميم وتطوير مواقع إلكترونية احترافية عالية الأداء بأحدث التقنيات", shortDescriptionEn: "Professional high-performance website design and development with latest technologies", descriptionAr: "نقدم خدمات تطوير مواقع إلكترونية متكاملة تشمل التصميم والبرمجة والنشر، باستخدام أحدث التقنيات وأفضل الممارسات لضمان أداء عالٍ وتجربة مستخدم استثنائية تعكس هوية عملك.", descriptionEn: "We provide comprehensive website development services including design, programming, and deployment, using the latest technologies and best practices to ensure high performance and exceptional user experience that reflects your brand identity.", icon: "globe", slug: "website-development", sortOrder: 1 },
    { titleAr: "تطوير تطبيقات الجوال", titleEn: "Mobile App Development", shortDescriptionAr: "تطبيقات جوال ذكية ومتقدمة لمنصات iOS وAndroid", shortDescriptionEn: "Smart and advanced mobile applications for iOS and Android platforms", descriptionAr: "نطوّر تطبيقات جوال عالية الجودة تعمل على منصتي iOS وAndroid، مع التركيز على سرعة الأداء وجمال التصميم وسهولة الاستخدام وتجربة المستخدم المتميزة.", descriptionEn: "We develop high-quality mobile applications for both iOS and Android platforms, focusing on performance speed, beautiful design, ease of use, and outstanding user experience.", icon: "smartphone", slug: "mobile-development", sortOrder: 2 },
    { titleAr: "تطوير الأنظمة والمنصات", titleEn: "Systems & Platforms Development", shortDescriptionAr: "بناء أنظمة ومنصات رقمية متكاملة وقابلة للتوسع", shortDescriptionEn: "Building integrated and scalable digital systems and platforms", descriptionAr: "نبني أنظمة ومنصات رقمية متكاملة مصممة خصيصًا لتلبية احتياجات عملك، مع ضمان القابلية للتوسع والأمان والأداء العالي والتكامل مع الأنظمة القائمة.", descriptionEn: "We build integrated digital systems and platforms specifically designed to meet your business needs, ensuring scalability, security, high performance, and integration with existing systems.", icon: "server", slug: "systems-platforms", sortOrder: 3 },
    { titleAr: "حلول تقنية المعلومات", titleEn: "IT Solutions", shortDescriptionAr: "حلول تقنية شاملة للبنية التحتية والشبكات والأمن السيبراني", shortDescriptionEn: "Comprehensive IT solutions for infrastructure, networking, and cybersecurity", descriptionAr: "نقدم حلول تقنية المعلومات الشاملة التي تغطي البنية التحتية والشبكات والأمن السيبراني وإدارة الأنظمة، لضمان استمرارية أعمالك بأعلى مستوى من الأمان والكفاءة.", descriptionEn: "We provide comprehensive IT solutions covering infrastructure, networking, cybersecurity, and systems management, ensuring your business continuity with the highest level of security and efficiency.", icon: "shield", slug: "it-solutions", sortOrder: 4 },
    { titleAr: "الأتمتة والتكامل بين الأنظمة", titleEn: "Automation & Systems Integration", shortDescriptionAr: "أتمتة العمليات وربط الأنظمة المختلفة لتعزيز الكفاءة التشغيلية", shortDescriptionEn: "Process automation and system integration to enhance operational efficiency", descriptionAr: "نساعدك في أتمتة العمليات وربط الأنظمة المختلفة لتقليل الجهد اليدوي وزيادة الكفاءة والإنتاجية وتسريع العمليات التشغيلية في مؤسستك.", descriptionEn: "We help you automate processes and integrate different systems to reduce manual effort, increase efficiency and productivity, and accelerate operational processes in your organization.", icon: "workflow", slug: "automation-integration", sortOrder: 5 },
    { titleAr: "الدعم التقني والصيانة", titleEn: "Technical Support & Maintenance", shortDescriptionAr: "دعم فني مستمر وصيانة دورية شاملة لأنظمتك ومنصاتك", shortDescriptionEn: "Continuous technical support and comprehensive maintenance for your systems", descriptionAr: "نوفر خدمات الدعم التقني والصيانة الدورية لضمان استمرارية عمل أنظمتك بأعلى كفاءة، مع فريق متخصص متاح لحل أي مشكلة تقنية بسرعة واحترافية.", descriptionEn: "We provide technical support and regular maintenance services to ensure your systems operate at peak efficiency, with a specialized team available to solve any technical issue quickly and professionally.", icon: "headphones", slug: "technical-support", sortOrder: 6 },
    { titleAr: "الحلول الذكية والذكاء الاصطناعي", titleEn: "AI & Smart Solutions", shortDescriptionAr: "حلول ذكية مدعومة بالذكاء الاصطناعي لتحسين أعمالك وقراراتك", shortDescriptionEn: "AI-powered smart solutions to improve your business and decisions", descriptionAr: "نطوّر حلولاً ذكية مدعومة بتقنيات الذكاء الاصطناعي والتعلم الآلي لمساعدتك في اتخاذ قرارات أفضل وتحسين عملياتك وتقديم تجربة متميزة لعملائك.", descriptionEn: "We develop smart solutions powered by AI and machine learning to help you make better decisions, optimize your operations, and deliver an outstanding experience to your customers.", icon: "brain", slug: "ai-solutions", sortOrder: 7 },
    { titleAr: "إنشاء وتطوير الموظفين الافتراضيين", titleEn: "Virtual Employee Development", shortDescriptionAr: "تصميم وبناء موظفين افتراضيين ذكيين لدعم الأعمال ورفع الكفاءة", shortDescriptionEn: "Design and build smart virtual employees to support business and boost efficiency", descriptionAr: "نصمم ونبني موظفين افتراضيين ذكيين قادرين على التفاعل مع عملائك وتقديم الخدمات على مدار الساعة، مما يساهم في تحسين الأداء وتسريع العمليات ورفع جودة الخدمات.", descriptionEn: "We design and build smart virtual employees capable of interacting with your customers and providing 24/7 services, contributing to performance improvement, process acceleration, and service quality enhancement.", icon: "bot", slug: "virtual-employees", sortOrder: 8 },
    { titleAr: "الاستشارات التقنية والتحول الرقمي", titleEn: "Tech Consulting & Digital Transformation", shortDescriptionAr: "استشارات تقنية متخصصة لقيادة التحول الرقمي بكفاءة وابتكار", shortDescriptionEn: "Specialized tech consulting to lead digital transformation with efficiency and innovation", descriptionAr: "نقدم استشارات تقنية متخصصة تساعدك في وضع استراتيجية التحول الرقمي المناسبة واختيار التقنيات الأنسب لعملك، مع خارطة طريق واضحة للتنفيذ.", descriptionEn: "We provide specialized tech consulting to help you develop the right digital transformation strategy and choose the most suitable technologies for your business, with a clear implementation roadmap.", icon: "lightbulb", slug: "consulting-digital-transformation", sortOrder: 9 },
  ];

  for (const service of services) {
    await prisma.service.upsert({ where: { slug: service.slug }, update: service, create: service });
  }
  console.log("✅ 9 Services created");

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {
      siteNameAr: "محركات الأكواد المتقدمة",
      siteNameEn: "Advanced Code Engines",
      taglineAr: "نبني المستقبل الرقمي بأكواد متقدمة",
      taglineEn: "Building the Digital Future with Advanced Code",
      aboutAr: "شركة تقنية متخصصة في البرمجة وتقنية المعلومات، تقدم حلولًا رقمية متقدمة تشمل تطوير المواقع والتطبيقات، برمجة الأنظمة والمنصات، الأتمتة والتكامل بين الأنظمة، الحلول الذكية والذكاء الاصطناعي، إضافة إلى إنشاء وتطوير الموظفين الافتراضيين لدعم الأعمال ورفع الكفاءة التشغيلية.",
      aboutEn: "A technology company specializing in programming and information technology, providing advanced digital solutions including website and application development, systems and platforms programming, automation and systems integration, smart solutions and artificial intelligence, as well as creating and developing virtual employees to support businesses and enhance operational efficiency.",
      visionAr: "أن تكون ACE من الشركات الرائدة في تقديم الحلول التقنية الذكية، وتمكين الأفراد والمنشآت من التحول الرقمي بكفاءة وابتكار واستدامة.",
      visionEn: "For ACE to be among the leading companies in providing smart technology solutions, empowering individuals and organizations for digital transformation with efficiency, innovation, and sustainability.",
      missionAr: "تقديم خدمات تقنية متقدمة وموثوقة تساعد العملاء على تطوير أعمالهم، عبر بناء أنظمة وحلول رقمية ذكية، وابتكار موظفين افتراضيين يساهمون في تحسين الأداء، تسريع العمليات، ورفع جودة الخدمات.",
      missionEn: "Providing advanced and reliable technology services that help clients develop their businesses, through building smart digital systems and solutions, and innovating virtual employees that contribute to improving performance, accelerating processes, and raising service quality.",
    },
    create: {
      id: "default",
      siteNameAr: "محركات الأكواد المتقدمة",
      siteNameEn: "Advanced Code Engines",
      taglineAr: "نبني المستقبل الرقمي بأكواد متقدمة",
      taglineEn: "Building the Digital Future with Advanced Code",
      aboutAr: "شركة تقنية متخصصة في البرمجة وتقنية المعلومات، تقدم حلولًا رقمية متقدمة تشمل تطوير المواقع والتطبيقات، برمجة الأنظمة والمنصات، الأتمتة والتكامل بين الأنظمة، الحلول الذكية والذكاء الاصطناعي، إضافة إلى إنشاء وتطوير الموظفين الافتراضيين لدعم الأعمال ورفع الكفاءة التشغيلية.",
      aboutEn: "A technology company specializing in programming and information technology, providing advanced digital solutions including website and application development, systems and platforms programming, automation and systems integration, smart solutions and artificial intelligence, as well as creating and developing virtual employees to support businesses and enhance operational efficiency.",
      visionAr: "أن تكون ACE من الشركات الرائدة في تقديم الحلول التقنية الذكية، وتمكين الأفراد والمنشآت من التحول الرقمي بكفاءة وابتكار واستدامة.",
      visionEn: "For ACE to be among the leading companies in providing smart technology solutions, empowering individuals and organizations for digital transformation with efficiency, innovation, and sustainability.",
      missionAr: "تقديم خدمات تقنية متقدمة وموثوقة تساعد العملاء على تطوير أعمالهم، عبر بناء أنظمة وحلول رقمية ذكية، وابتكار موظفين افتراضيين يساهمون في تحسين الأداء، تسريع العمليات، ورفع جودة الخدمات.",
      missionEn: "Providing advanced and reliable technology services that help clients develop their businesses, through building smart digital systems and solutions, and innovating virtual employees that contribute to improving performance, accelerating processes, and raising service quality.",
      phone: "+966500000000",
      whatsapp: "+966500000000",
      email: "info@ace.com",
      addressAr: "المملكة العربية السعودية",
      addressEn: "Saudi Arabia",
      primaryColor: "#3378ff",
      secondaryColor: "#91919f",
socialLinks: { twitter: "https://twitter.com/ace", linkedin: "https://linkedin.com/company/ace" },
    },
  });
  console.log("✅ Site settings created with official data");
  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => { console.error("❌ Seeding failed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });