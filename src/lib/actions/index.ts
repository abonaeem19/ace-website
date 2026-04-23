"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { login as authLogin, logout as authLogout, requireAuth } from "@/lib/auth";
import { contactSchema, quoteSchema, serviceSchema, projectSchema } from "@/lib/validations";

// ── Auth ──
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const result = await authLogin(email, password);
  if (!result.success) return { error: result.error };
  return { success: true };
}

export async function logoutAction() {
  await authLogout();
  redirect("/ar/admin/login");
}

// ── Contact ──
export async function submitContactForm(formData: FormData) {
  const data = { fullName: formData.get("fullName") as string, email: formData.get("email") as string, phone: (formData.get("phone") as string) || undefined, subject: formData.get("subject") as string, message: formData.get("message") as string };
  const validated = contactSchema.safeParse(data);
  if (!validated.success) return { error: validated.error.errors[0].message };
  await prisma.contactMessage.create({ data: { fullName: validated.data.fullName, email: validated.data.email, phone: validated.data.phone || null, subject: validated.data.subject, message: validated.data.message } });
  return { success: true };
}

// ── Quote ──
export async function submitQuoteForm(formData: FormData) {
  const data = { fullName: formData.get("fullName") as string, companyName: (formData.get("companyName") as string) || undefined, email: formData.get("email") as string, phone: (formData.get("phone") as string) || undefined, serviceId: (formData.get("serviceId") as string) || undefined, projectDescription: formData.get("projectDescription") as string, budgetRange: (formData.get("budgetRange") as string) || undefined, timeline: (formData.get("timeline") as string) || undefined };
  const validated = quoteSchema.safeParse(data);
  if (!validated.success) return { error: validated.error.errors[0].message };
  await prisma.quoteRequest.create({ data: { fullName: validated.data.fullName, companyName: validated.data.companyName || null, email: validated.data.email, phone: validated.data.phone || null, serviceId: validated.data.serviceId || null, projectDescription: validated.data.projectDescription, budgetRange: validated.data.budgetRange || null, timeline: validated.data.timeline || null } });
  return { success: true };
}

// ── Admin Services ──
export async function createService(formData: FormData) {
  await requireAuth();
  const data = { titleAr: formData.get("titleAr") as string, titleEn: formData.get("titleEn") as string, shortDescriptionAr: formData.get("shortDescriptionAr") as string, shortDescriptionEn: formData.get("shortDescriptionEn") as string, descriptionAr: formData.get("descriptionAr") as string, descriptionEn: formData.get("descriptionEn") as string, icon: (formData.get("icon") as string) || "code", slug: formData.get("slug") as string, sortOrder: parseInt(formData.get("sortOrder") as string) || 0, isPublished: formData.get("isPublished") === "true" };
  const validated = serviceSchema.safeParse(data);
  if (!validated.success) return { error: validated.error.errors[0].message };
  await prisma.service.create({ data: validated.data });
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, formData: FormData) {
  await requireAuth();
  const data = { titleAr: formData.get("titleAr") as string, titleEn: formData.get("titleEn") as string, shortDescriptionAr: formData.get("shortDescriptionAr") as string, shortDescriptionEn: formData.get("shortDescriptionEn") as string, descriptionAr: formData.get("descriptionAr") as string, descriptionEn: formData.get("descriptionEn") as string, icon: (formData.get("icon") as string) || "code", slug: formData.get("slug") as string, sortOrder: parseInt(formData.get("sortOrder") as string) || 0, isPublished: formData.get("isPublished") === "true" };
  const validated = serviceSchema.safeParse(data);
  if (!validated.success) return { error: validated.error.errors[0].message };
  await prisma.service.update({ where: { id }, data: validated.data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  await requireAuth();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

export async function toggleServicePublish(id: string) {
  await requireAuth();
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return { error: "Not found" };
  await prisma.service.update({ where: { id }, data: { isPublished: !service.isPublished } });
  revalidatePath("/");
  return { success: true };
}

// ── Admin Projects ──
export async function createProject(formData: FormData) {
  await requireAuth();
  const data = { titleAr: formData.get("titleAr") as string, titleEn: formData.get("titleEn") as string, shortDescriptionAr: formData.get("shortDescriptionAr") as string, shortDescriptionEn: formData.get("shortDescriptionEn") as string, descriptionAr: formData.get("descriptionAr") as string, descriptionEn: formData.get("descriptionEn") as string, coverImage: (formData.get("coverImage") as string) || undefined, projectUrl: (formData.get("projectUrl") as string) || undefined, slug: formData.get("slug") as string, sortOrder: parseInt(formData.get("sortOrder") as string) || 0, isPublished: formData.get("isPublished") === "true" };
  const validated = projectSchema.safeParse(data);
  if (!validated.success) return { error: validated.error.errors[0].message };
  await prisma.project.create({ data: validated.data });
  revalidatePath("/");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();
  const data = { titleAr: formData.get("titleAr") as string, titleEn: formData.get("titleEn") as string, shortDescriptionAr: formData.get("shortDescriptionAr") as string, shortDescriptionEn: formData.get("shortDescriptionEn") as string, descriptionAr: formData.get("descriptionAr") as string, descriptionEn: formData.get("descriptionEn") as string, coverImage: (formData.get("coverImage") as string) || undefined, projectUrl: (formData.get("projectUrl") as string) || undefined, slug: formData.get("slug") as string, sortOrder: parseInt(formData.get("sortOrder") as string) || 0, isPublished: formData.get("isPublished") === "true" };
  const validated = projectSchema.safeParse(data);
  if (!validated.success) return { error: validated.error.errors[0].message };
  await prisma.project.update({ where: { id }, data: validated.data });
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

export async function toggleProjectPublish(id: string) {
  await requireAuth();
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: "Not found" };
  await prisma.project.update({ where: { id }, data: { isPublished: !project.isPublished } });
  revalidatePath("/");
  return { success: true };
}

// ── Admin Messages & Quotes ──
export async function updateMessageStatus(id: string, status: string) {
  await requireAuth();
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/");
  return { success: true };
}

export async function deleteMessage(id: string) {
  await requireAuth();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

export async function updateQuoteStatus(id: string, status: string) {
  await requireAuth();
  await prisma.quoteRequest.update({ where: { id }, data: { status } });
  revalidatePath("/");
  return { success: true };
}

export async function deleteQuote(id: string) {
  await requireAuth();
  await prisma.quoteRequest.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}

// ── Admin Settings ──
export async function updateSettings(formData: FormData) {
  await requireAuth();
  const data: Record<string, string | undefined> = {};
  const fields = ["siteNameAr","siteNameEn","taglineAr","taglineEn","aboutAr","aboutEn","visionAr","visionEn","missionAr","missionEn","phone","whatsapp","email","addressAr","addressEn","primaryColor","secondaryColor"];
  for (const field of fields) { const value = formData.get(field); if (value !== null) data[field] = value as string; }
  const settings = await prisma.siteSetting.findFirst();
  if (settings) await prisma.siteSetting.update({ where: { id: settings.id }, data });
  revalidatePath("/");
  return { success: true };
}