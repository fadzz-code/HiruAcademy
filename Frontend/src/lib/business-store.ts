"use client";

import { useSyncExternalStore } from "react";
import {
  BUSINESS_CHANGE_EVENT,
  BUSINESS_STORAGE_KEY,
  createInitialBusinessStore,
  createInvoice,
  initialBusinessStore,
  initialBusinessUsers,
  loadBusinessStore,
  type BusinessSettings,
  type BusinessStoreData,
  type BusinessUser,
  type Commission,
  type CommissionStatus,
  type Invoice,
  type InvoiceStatus,
  type InvoiceTimelineItem,
  type Payout,
  type PayoutStatus,
  type UserMembership,
  type UserStatus,
} from "@/lib/admin-business-store";
import { readPublishedPrograms } from "@/lib/curriculum-store";
import { readSettings } from "@/lib/settings-store";
import { type CampaignProgramCode } from "@/lib/admin-website-store";
import { readActiveCampaigns } from "@/lib/website-store";

export type {
  BusinessSettings,
  BusinessStoreData,
  BusinessUser,
  Commission,
  CommissionStatus,
  Invoice,
  InvoiceStatus,
  InvoiceTimelineItem,
  Payout,
  PayoutStatus,
  UserMembership,
  UserStatus,
};

let publicCachedRaw: string | null | undefined;
let publicCachedStore: BusinessStoreData | null = null;

export function readBusinessStore(): BusinessStoreData {
  if (typeof window === "undefined") {
    return createInitialBusinessStore();
  }
  const raw = window.localStorage.getItem(BUSINESS_STORAGE_KEY);
  if (raw !== publicCachedRaw || !publicCachedStore) {
    publicCachedRaw = raw;
    publicCachedStore = loadBusinessStore();
  }
  return publicCachedStore;
}

function subscribeBusinessPublic(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === BUSINESS_STORAGE_KEY) {
      publicCachedRaw = undefined;
      publicCachedStore = null;
      onStoreChange();
    }
  };
  const handleCustom = () => {
    publicCachedRaw = undefined;
    publicCachedStore = null;
    onStoreChange();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(BUSINESS_CHANGE_EVENT, handleCustom);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(BUSINESS_CHANGE_EVENT, handleCustom);
  };
}

export function useBusinessStore(): BusinessStoreData {
  return useSyncExternalStore(
    subscribeBusinessPublic,
    readBusinessStore,
    () => initialBusinessStore
  );
}

export function createPublicInvoice(order: {
  level: string;
  plan: "lms" | "sensei";
  name?: string;
  email?: string;
  whatsapp?: string;
  referral?: string;
}): Invoice {
  const cleanLevel = order.level.toUpperCase().trim();
  const programs = readPublishedPrograms();
  const program = programs.find((p) => p.code.toUpperCase() === cleanLevel);

  let basePrice =
    order.plan === "sensei"
      ? program?.senseiPrice ?? 799000
      : program?.selfStudyPrice ?? 349000;

  const campaigns = readActiveCampaigns({
    programCode: cleanLevel as CampaignProgramCode,
    plan: order.plan === "lms" ? "mandiri" : "sensei",
  });

  if (campaigns.length > 0) {
    const campaign = campaigns[0];
    const discount =
      campaign.discountType === "percentage"
        ? Math.round((basePrice * campaign.value) / 100)
        : campaign.value;
    basePrice = Math.max(0, basePrice - discount);
  }

  return createInvoice({
    userName: order.name?.trim() || "Pengguna Hiru",
    userEmail: order.email?.trim() || "pengguna@example.com",
    userWhatsApp: order.whatsapp?.trim() || "081234567890",
    programCode: cleanLevel,
    plan: order.plan,
    amount: basePrice,
    status: "Menunggu pembayaran",
    referralCode: order.referral?.trim(),
  });
}

export function getInvoiceWhatsAppUrl(
  invoice: Invoice,
  settings?: BusinessSettings
): string {
  const businessStore = readBusinessStore();
  const template =
    settings?.invoiceWhatsAppTemplate ||
    businessStore.settings.invoiceWhatsAppTemplate;

  const planLabel =
    invoice.plan === "sensei"
      ? "Belajar dengan Sensei"
      : "Belajar Mandiri (LMS)";

  const formattedAmount = invoice.amount.toLocaleString("id-ID");

  const message = template
    .replaceAll("{invoice_id}", invoice.id)
    .replaceAll("{name}", invoice.userName)
    .replaceAll("{program}", invoice.programCode)
    .replaceAll("{plan}", planLabel)
    .replaceAll("{level}", invoice.programCode)
    .replaceAll("{amount}", formattedAmount)
    .replaceAll("{target}", invoice.targetJLPT || "-");

  let phone = readSettings().contact.whatsappNumber.replace(/\D/g, "");

  if (phone.startsWith("0")) {
    phone = "62" + phone.slice(1);
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getCurrentDemoUser(): BusinessUser {
  const store = readBusinessStore();
  const hilmi = store.users.find((u) => u.id === "USR-001");
  if (hilmi) return hilmi;
  if (store.users.length > 0) return store.users[0];
  return initialBusinessUsers[0];
}

export function getEffectiveMembership(
  queryMembership?: string
): "free" | "lms" | "sensei" {
  if (
    queryMembership === "lms" ||
    queryMembership === "sensei" ||
    queryMembership === "free"
  ) {
    return queryMembership;
  }
  const user = getCurrentDemoUser();
  if (
    user &&
    (user.membership === "lms" ||
      user.membership === "sensei" ||
      user.membership === "free")
  ) {
    return user.membership;
  }
  return "free";
}
