"use client";

import { useSyncExternalStore } from "react";
import { updateAdminSettings } from "@/lib/admin-settings-store";

export const BUSINESS_STORAGE_KEY = "hiru-admin-business:v1";
export const BUSINESS_CHANGE_EVENT = "hiru:business-change";

export type InvoiceStatus =
  | "Draft"
  | "Menunggu pembayaran"
  | "Sudah bayar"
  | "Diverifikasi"
  | "Aktif";

export type InvoiceTimelineItem = {
  title: string;
  at: string;
  note?: string;
};

export type Invoice = {
  id: string;
  createdAt: string;
  userName: string;
  userEmail: string;
  userWhatsApp: string;
  programCode: string;
  plan: "lms" | "sensei";
  amount: number;
  status: InvoiceStatus;
  referralCode?: string;
  affiliateId?: string;
  targetJLPT?: string;
  paymentNote?: string;
  transferReference?: string;
  paidAt?: string;
  verifiedAt?: string;
  activatedAt?: string;
  timeline: InvoiceTimelineItem[];
};

export type UserStatus = "Aktif" | "Nonaktif";
export type UserMembership = "free" | "lms" | "sensei";

export type BusinessUser = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  membership: UserMembership;
  purchasedLevel?: string;
  status: UserStatus;
  activeSince?: string;
  activeUntil?: string;
  targetJLPT?: string;
  country?: string;
  referredByCode?: string;
  invoiceIds: string[];
};

export type AffiliateAccount = {
  id: string;
  userId?: string;
  name: string;
  code: string;
  status: "Aktif" | "Nonaktif";
  clicks: number;
  registrations: number;
  purchases: number;
  totalCommission: number;
  unpaidCommission: number;
  paidCommission: number;
  createdAt: string;
};

export type CommissionStatus =
  | "Menunggu Validasi"
  | "Tersedia"
  | "Sudah Dicairkan"
  | "Dibatalkan";

export type Commission = {
  id: string;
  affiliateId: string;
  affiliateCode: string;
  invoiceId: string;
  amount: number;
  status: CommissionStatus;
  eligibleAt: string;
  createdAt: string;
  paidAt?: string;
  payoutId?: string;
};

export type PayoutStatus = "Menunggu" | "Diproses" | "Sudah Dicairkan" | "Ditolak";

export type Payout = {
  id: string;
  affiliateId: string;
  affiliateName: string;
  amount: number;
  commissionIds: string[];
  createdAt: string;
  status: PayoutStatus;
  paidAt?: string;
  notes?: string;
};

export type BusinessSettings = {
  adminWhatsAppNumber: string;
  invoiceWhatsAppTemplate: string;
  affiliateEnabled: boolean;
  commissionMode: "Percentage" | "Nominal";
  commissionValue: number;
  validationPeriodDays: number;
};

export type BusinessActivity = {
  id: string;
  title: string;
  detail: string;
  at: string;
  status?: string;
};

export type BusinessStoreData = {
  version: 1;
  invoices: Invoice[];
  users: BusinessUser[];
  affiliates: AffiliateAccount[];
  commissions: Commission[];
  payouts: Payout[];
  settings: BusinessSettings;
  activities: BusinessActivity[];
};

export const initialBusinessInvoices: Invoice[] = [
  {
    id: "INV-2026-001",
    createdAt: "2026-02-15T09:00:00.000Z",
    userName: "Hilmi Farhan",
    userEmail: "hilmi@example.com",
    userWhatsApp: "081234567801",
    programCode: "N4",
    plan: "lms",
    amount: 349000,
    status: "Menunggu pembayaran",
    referralCode: "HIRU-RINA",
    affiliateId: "AFF-002",
    targetJLPT: "N4 Juli 2026",
    timeline: [
      {
        title: "Invoice dibuat",
        at: "2026-02-15T09:00:00.000Z",
        note: "Pendaftaran Belajar Mandiri N4",
      },
    ],
  },
  {
    id: "INV-2026-002",
    createdAt: "2026-02-16T08:30:00.000Z",
    userName: "Ayu Pratama",
    userEmail: "ayu@example.com",
    userWhatsApp: "081234567802",
    programCode: "N5",
    plan: "sensei",
    amount: 799000,
    status: "Sudah bayar",
    targetJLPT: "N5 Juli 2026",
    paymentNote: "Transfer BCA atas nama Ayu Pratama",
    transferReference: "TRX-BCA-98124",
    paidAt: "2026-02-16T10:15:00.000Z",
    timeline: [
      {
        title: "Invoice dibuat",
        at: "2026-02-16T08:30:00.000Z",
      },
      {
        title: "Pembayaran dikonfirmasi pengguna",
        at: "2026-02-16T10:15:00.000Z",
        note: "Bukti transfer BCA TRX-BCA-98124",
      },
    ],
  },
  {
    id: "INV-2026-003",
    createdAt: "2026-02-14T11:00:00.000Z",
    userName: "Budi Santoso",
    userEmail: "budi@example.com",
    userWhatsApp: "081234567803",
    programCode: "N3",
    plan: "lms",
    amount: 399000,
    status: "Diverifikasi",
    referralCode: "HIRU-HILMI25",
    affiliateId: "AFF-001",
    targetJLPT: "N3 Desember 2026",
    paymentNote: "Transfer Mandiri",
    transferReference: "TRX-MDR-44211",
    paidAt: "2026-02-14T11:30:00.000Z",
    verifiedAt: "2026-02-14T13:00:00.000Z",
    timeline: [
      {
        title: "Invoice dibuat",
        at: "2026-02-14T11:00:00.000Z",
      },
      {
        title: "Pembayaran dikonfirmasi",
        at: "2026-02-14T11:30:00.000Z",
      },
      {
        title: "Pembayaran diverifikasi admin",
        at: "2026-02-14T13:00:00.000Z",
        note: "Mutasi rekening Mandiri terkonfirmasi",
      },
    ],
  },
  {
    id: "INV-2026-004",
    createdAt: "2026-02-10T08:15:00.000Z",
    userName: "Rina Wulandari",
    userEmail: "rina@example.com",
    userWhatsApp: "081234567804",
    programCode: "N4",
    plan: "sensei",
    amount: 849000,
    status: "Aktif",
    referralCode: "HIRU-HILMI25",
    affiliateId: "AFF-001",
    targetJLPT: "N4 Juli 2026",
    paymentNote: "Transfer BNI",
    transferReference: "TRX-BNI-77192",
    paidAt: "2026-02-10T08:45:00.000Z",
    verifiedAt: "2026-02-10T09:00:00.000Z",
    activatedAt: "2026-02-10T09:05:00.000Z",
    timeline: [
      {
        title: "Invoice dibuat",
        at: "2026-02-10T08:15:00.000Z",
      },
      {
        title: "Pembayaran dikonfirmasi",
        at: "2026-02-10T08:45:00.000Z",
      },
      {
        title: "Pembayaran diverifikasi",
        at: "2026-02-10T09:00:00.000Z",
      },
      {
        title: "Membership diaktifkan",
        at: "2026-02-10T09:05:00.000Z",
        note: "Akses Belajar dengan Sensei N4 aktif 1 tahun",
      },
    ],
  },
];

export const initialBusinessUsers: BusinessUser[] = [
  {
    id: "USR-001",
    name: "Hilmi Farhan",
    email: "hilmi@example.com",
    whatsapp: "081234567801",
    membership: "lms",
    purchasedLevel: "N4",
    status: "Aktif",
    activeSince: "2026-01-01T00:00:00.000Z",
    activeUntil: "2027-01-01T00:00:00.000Z",
    targetJLPT: "N4 Juli 2026",
    country: "Indonesia",
    invoiceIds: ["INV-2026-001"],
  },
  {
    id: "USR-002",
    name: "Ayu Pratama",
    email: "ayu@example.com",
    whatsapp: "081234567802",
    membership: "free",
    status: "Aktif",
    activeSince: "2026-02-16T08:30:00.000Z",
    targetJLPT: "N5 Juli 2026",
    country: "Indonesia",
    invoiceIds: ["INV-2026-002"],
  },
  {
    id: "USR-003",
    name: "Budi Santoso",
    email: "budi@example.com",
    whatsapp: "081234567803",
    membership: "lms",
    purchasedLevel: "N3",
    status: "Aktif",
    activeSince: "2026-02-14T13:00:00.000Z",
    activeUntil: "2027-02-14T13:00:00.000Z",
    targetJLPT: "N3 Desember 2026",
    country: "Indonesia",
    referredByCode: "HIRU-HILMI25",
    invoiceIds: ["INV-2026-003"],
  },
  {
    id: "USR-004",
    name: "Rina Wulandari",
    email: "rina@example.com",
    whatsapp: "081234567804",
    membership: "sensei",
    purchasedLevel: "N4",
    status: "Aktif",
    activeSince: "2026-02-10T09:05:00.000Z",
    activeUntil: "2027-02-10T09:05:00.000Z",
    targetJLPT: "N4 Juli 2026",
    country: "Indonesia",
    referredByCode: "HIRU-HILMI25",
    invoiceIds: ["INV-2026-004"],
  },
  {
    id: "USR-005",
    name: "Dimas Nugroho",
    email: "dimas@example.com",
    whatsapp: "081234567805",
    membership: "free",
    status: "Nonaktif",
    activeSince: "2026-01-15T00:00:00.000Z",
    country: "Indonesia",
    invoiceIds: [],
  },
];

export const initialBusinessAffiliates: AffiliateAccount[] = [
  {
    id: "AFF-001",
    userId: "USR-001",
    name: "Hilmi Farhan",
    code: "HIRU-HILMI25",
    status: "Aktif",
    clicks: 142,
    registrations: 28,
    purchases: 6,
    totalCommission: 540000,
    unpaidCommission: 240000,
    paidCommission: 300000,
    createdAt: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "AFF-002",
    userId: "USR-004",
    name: "Rina Wulandari",
    code: "HIRU-RINA",
    status: "Aktif",
    clicks: 65,
    registrations: 12,
    purchases: 2,
    totalCommission: 160000,
    unpaidCommission: 160000,
    paidCommission: 0,
    createdAt: "2026-01-20T00:00:00.000Z",
  },
];

export const initialBusinessCommissions: Commission[] = [
  {
    id: "COM-2026-001",
    affiliateId: "AFF-001",
    affiliateCode: "HIRU-HILMI25",
    invoiceId: "INV-2026-004",
    amount: 84900,
    status: "Sudah Dicairkan",
    eligibleAt: "2026-02-10T09:00:00.000Z",
    createdAt: "2026-02-10T09:00:00.000Z",
    paidAt: "2026-02-12T10:00:00.000Z",
    payoutId: "PAY-2026-002",
  },
  {
    id: "COM-2026-002",
    affiliateId: "AFF-001",
    affiliateCode: "HIRU-HILMI25",
    invoiceId: "INV-2026-003",
    amount: 39900,
    status: "Tersedia",
    eligibleAt: "2026-02-14T13:00:00.000Z",
    createdAt: "2026-02-14T13:00:00.000Z",
  },
];

export const initialBusinessPayouts: Payout[] = [
  {
    id: "PAY-2026-001",
    affiliateId: "AFF-002",
    affiliateName: "Rina Wulandari",
    amount: 160000,
    commissionIds: [],
    createdAt: "2026-02-17T10:00:00.000Z",
    status: "Menunggu",
    notes: "Permintaan penarikan komisi Februari",
  },
  {
    id: "PAY-2026-002",
    affiliateId: "AFF-001",
    affiliateName: "Hilmi Farhan",
    amount: 300000,
    commissionIds: ["COM-2026-001"],
    createdAt: "2026-02-12T09:30:00.000Z",
    status: "Sudah Dicairkan",
    paidAt: "2026-02-12T10:00:00.000Z",
    notes: "Transfer BCA berhasil diverifikasi",
  },
];

export const initialBusinessSettings: BusinessSettings = {
  adminWhatsAppNumber: "6281234567890",
  invoiceWhatsAppTemplate:
    "Halo Admin Hiru Academy, saya ingin konfirmasi pembayaran untuk Invoice {invoice_id}.\n\nNama: {name}\nProgram: {program} ({level})\nPaket: {plan}\nTotal: Rp {amount}\nTarget JLPT: {target}\n\nMohon bantu verifikasi pembayaran saya. Terima kasih!",
  affiliateEnabled: true,
  commissionMode: "Percentage",
  commissionValue: 10,
  validationPeriodDays: 7,
};

export const initialBusinessActivities: BusinessActivity[] = [
  {
    id: "ACT-001",
    title: "Pembayaran Diverifikasi",
    detail: "Invoice INV-2026-003 sebesar Rp 399.000 telah diverifikasi admin.",
    at: "2026-02-14T13:00:00.000Z",
    status: "Diverifikasi",
  },
  {
    id: "ACT-002",
    title: "Pencairan Komisi",
    detail: "Payout PAY-2026-002 sebesar Rp 300.000 dicairkan ke Hilmi Farhan.",
    at: "2026-02-12T10:00:00.000Z",
    status: "Sukses",
  },
  {
    id: "ACT-003",
    title: "Akses Diaktifkan",
    detail: "Membership Belajar dengan Sensei diaktifkan untuk Rina Wulandari.",
    at: "2026-02-10T09:05:00.000Z",
    status: "Aktif",
  },
];

export function createInitialBusinessStore(): BusinessStoreData {
  return {
    version: 1,
    invoices: initialBusinessInvoices,
    users: initialBusinessUsers,
    affiliates: initialBusinessAffiliates,
    commissions: initialBusinessCommissions,
    payouts: initialBusinessPayouts,
    settings: initialBusinessSettings,
    activities: initialBusinessActivities,
  };
}

export const initialBusinessStore: BusinessStoreData = createInitialBusinessStore();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeBusinessStore(value: unknown): BusinessStoreData {
  const fallback = createInitialBusinessStore();
  if (!isRecord(value)) return fallback;

  const invoices: Invoice[] = Array.isArray(value.invoices)
    ? value.invoices
        .filter(isRecord)
        .map((item, idx) => ({
          id: typeof item.id === "string" ? item.id : `INV-${idx + 1}`,
          createdAt:
            typeof item.createdAt === "string"
              ? item.createdAt
              : new Date().toISOString(),
          userName: typeof item.userName === "string" ? item.userName : "Pengguna",
          userEmail:
            typeof item.userEmail === "string"
              ? item.userEmail
              : "user@example.com",
          userWhatsApp:
            typeof item.userWhatsApp === "string"
              ? item.userWhatsApp
              : "081234567890",
          programCode:
            typeof item.programCode === "string" ? item.programCode : "N5",
          plan: item.plan === "sensei" ? "sensei" : "lms",
          amount: typeof item.amount === "number" ? Math.max(0, item.amount) : 0,
          status: (
            [
              "Draft",
              "Menunggu pembayaran",
              "Sudah bayar",
              "Diverifikasi",
              "Aktif",
            ] as InvoiceStatus[]
          ).includes(item.status as InvoiceStatus)
            ? (item.status as InvoiceStatus)
            : "Menunggu pembayaran",
          referralCode:
            typeof item.referralCode === "string" ? item.referralCode : undefined,
          affiliateId:
            typeof item.affiliateId === "string" ? item.affiliateId : undefined,
          targetJLPT:
            typeof item.targetJLPT === "string" ? item.targetJLPT : undefined,
          paymentNote:
            typeof item.paymentNote === "string" ? item.paymentNote : undefined,
          transferReference:
            typeof item.transferReference === "string"
              ? item.transferReference
              : undefined,
          paidAt: typeof item.paidAt === "string" ? item.paidAt : undefined,
          verifiedAt:
            typeof item.verifiedAt === "string" ? item.verifiedAt : undefined,
          activatedAt:
            typeof item.activatedAt === "string" ? item.activatedAt : undefined,
          timeline: Array.isArray(item.timeline)
            ? item.timeline.filter(isRecord).map((tl) => ({
                title: typeof tl.title === "string" ? tl.title : "Perubahan status",
                at:
                  typeof tl.at === "string"
                    ? tl.at
                    : new Date().toISOString(),
                note: typeof tl.note === "string" ? tl.note : undefined,
              }))
            : [],
        }))
    : fallback.invoices;

  const users: BusinessUser[] = Array.isArray(value.users)
    ? value.users
        .filter(isRecord)
        .map((item, idx) => ({
          id: typeof item.id === "string" ? item.id : `USR-${idx + 1}`,
          name: typeof item.name === "string" ? item.name : "Pengguna",
          email:
            typeof item.email === "string"
              ? item.email
              : `user${idx + 1}@example.com`,
          whatsapp:
            typeof item.whatsapp === "string" ? item.whatsapp : "081234567890",
          membership: (["free", "lms", "sensei"] as UserMembership[]).includes(
            item.membership as UserMembership
          )
            ? (item.membership as UserMembership)
            : "free",
          purchasedLevel:
            typeof item.purchasedLevel === "string"
              ? item.purchasedLevel
              : undefined,
          status: item.status === "Nonaktif" ? "Nonaktif" : "Aktif",
          activeSince:
            typeof item.activeSince === "string" ? item.activeSince : undefined,
          activeUntil:
            typeof item.activeUntil === "string" ? item.activeUntil : undefined,
          targetJLPT:
            typeof item.targetJLPT === "string" ? item.targetJLPT : undefined,
          country: typeof item.country === "string" ? item.country : undefined,
          referredByCode:
            typeof item.referredByCode === "string"
              ? item.referredByCode
              : undefined,
          invoiceIds: Array.isArray(item.invoiceIds)
            ? item.invoiceIds.filter((id): id is string => typeof id === "string")
            : [],
        }))
    : fallback.users;

  const affiliates: AffiliateAccount[] = Array.isArray(value.affiliates)
    ? value.affiliates
        .filter(isRecord)
        .map((item, idx) => ({
          id: typeof item.id === "string" ? item.id : `AFF-${idx + 1}`,
          userId: typeof item.userId === "string" ? item.userId : undefined,
          name: typeof item.name === "string" ? item.name : "Mitra",
          code: typeof item.code === "string" ? item.code : `HIRU-${idx + 1}`,
          status: item.status === "Nonaktif" ? "Nonaktif" : "Aktif",
          clicks: typeof item.clicks === "number" ? Math.max(0, item.clicks) : 0,
          registrations:
            typeof item.registrations === "number"
              ? Math.max(0, item.registrations)
              : 0,
          purchases:
            typeof item.purchases === "number" ? Math.max(0, item.purchases) : 0,
          totalCommission:
            typeof item.totalCommission === "number"
              ? Math.max(0, item.totalCommission)
              : 0,
          unpaidCommission:
            typeof item.unpaidCommission === "number"
              ? Math.max(0, item.unpaidCommission)
              : 0,
          paidCommission:
            typeof item.paidCommission === "number"
              ? Math.max(0, item.paidCommission)
              : 0,
          createdAt:
            typeof item.createdAt === "string"
              ? item.createdAt
              : new Date().toISOString(),
        }))
    : fallback.affiliates;

  const commissions: Commission[] = Array.isArray(value.commissions)
    ? value.commissions
        .filter(isRecord)
        .map((item, idx) => ({
          id: typeof item.id === "string" ? item.id : `COM-${idx + 1}`,
          affiliateId:
            typeof item.affiliateId === "string" ? item.affiliateId : "AFF-001",
          affiliateCode:
            typeof item.affiliateCode === "string"
              ? item.affiliateCode
              : "HIRU-CODE",
          invoiceId:
            typeof item.invoiceId === "string" ? item.invoiceId : "INV-001",
          amount: typeof item.amount === "number" ? Math.max(0, item.amount) : 0,
          status: (
            [
              "Menunggu Validasi",
              "Tersedia",
              "Sudah Dicairkan",
              "Dibatalkan",
            ] as CommissionStatus[]
          ).includes(item.status as CommissionStatus)
            ? (item.status as CommissionStatus)
            : "Tersedia",
          eligibleAt:
            typeof item.eligibleAt === "string"
              ? item.eligibleAt
              : new Date().toISOString(),
          createdAt:
            typeof item.createdAt === "string"
              ? item.createdAt
              : new Date().toISOString(),
          paidAt: typeof item.paidAt === "string" ? item.paidAt : undefined,
          payoutId:
            typeof item.payoutId === "string" ? item.payoutId : undefined,
        }))
    : fallback.commissions;

  const payouts: Payout[] = Array.isArray(value.payouts)
    ? value.payouts
        .filter(isRecord)
        .map((item, idx) => ({
          id: typeof item.id === "string" ? item.id : `PAY-${idx + 1}`,
          affiliateId:
            typeof item.affiliateId === "string" ? item.affiliateId : "AFF-001",
          affiliateName:
            typeof item.affiliateName === "string" ? item.affiliateName : "Mitra",
          amount: typeof item.amount === "number" ? Math.max(0, item.amount) : 0,
          commissionIds: Array.isArray(item.commissionIds)
            ? item.commissionIds.filter((id): id is string => typeof id === "string")
            : [],
          createdAt:
            typeof item.createdAt === "string"
              ? item.createdAt
              : new Date().toISOString(),
          status: (
            ["Menunggu", "Diproses", "Sudah Dicairkan", "Ditolak"] as PayoutStatus[]
          ).includes(item.status as PayoutStatus)
            ? (item.status as PayoutStatus)
            : "Menunggu",
          paidAt: typeof item.paidAt === "string" ? item.paidAt : undefined,
          notes: typeof item.notes === "string" ? item.notes : undefined,
        }))
    : fallback.payouts;

  const rawSettings = isRecord(value.settings) ? value.settings : {};
  const settings: BusinessSettings = {
    adminWhatsAppNumber:
      typeof rawSettings.adminWhatsAppNumber === "string"
        ? rawSettings.adminWhatsAppNumber
        : fallback.settings.adminWhatsAppNumber,
    invoiceWhatsAppTemplate:
      typeof rawSettings.invoiceWhatsAppTemplate === "string"
        ? rawSettings.invoiceWhatsAppTemplate
        : fallback.settings.invoiceWhatsAppTemplate,
    affiliateEnabled:
      typeof rawSettings.affiliateEnabled === "boolean"
        ? rawSettings.affiliateEnabled
        : fallback.settings.affiliateEnabled,
    commissionMode:
      rawSettings.commissionMode === "Nominal" ? "Nominal" : "Percentage",
    commissionValue:
      typeof rawSettings.commissionValue === "number"
        ? Math.max(0, rawSettings.commissionValue)
        : fallback.settings.commissionValue,
    validationPeriodDays:
      typeof rawSettings.validationPeriodDays === "number"
        ? Math.max(0, rawSettings.validationPeriodDays)
        : fallback.settings.validationPeriodDays,
  };

  const activities: BusinessActivity[] = Array.isArray(value.activities)
    ? value.activities
        .filter(isRecord)
        .map((item, idx) => ({
          id: typeof item.id === "string" ? item.id : `ACT-${idx + 1}`,
          title: typeof item.title === "string" ? item.title : "Aktivitas",
          detail: typeof item.detail === "string" ? item.detail : "",
          at:
            typeof item.at === "string"
              ? item.at
              : new Date().toISOString(),
          status: typeof item.status === "string" ? item.status : undefined,
        }))
    : fallback.activities;

  return {
    version: 1,
    invoices,
    users,
    affiliates,
    commissions,
    payouts,
    settings,
    activities,
  };
}

export function loadBusinessStore(
  storage: Pick<Storage, "getItem"> | null = typeof window !== "undefined"
    ? window.localStorage
    : null
): BusinessStoreData {
  if (!storage) return createInitialBusinessStore();
  try {
    const raw = storage.getItem(BUSINESS_STORAGE_KEY);
    if (!raw) return createInitialBusinessStore();
    return normalizeBusinessStore(JSON.parse(raw));
  } catch {
    return createInitialBusinessStore();
  }
}

export function saveBusinessStore(
  data: BusinessStoreData,
  storage: Pick<Storage, "setItem"> | null = typeof window !== "undefined"
    ? window.localStorage
    : null
): BusinessStoreData {
  const normalized = normalizeBusinessStore(data);
  if (storage) {
    try {
      storage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // ponytail: ignore localstorage quota limits, fallback to memory
    }
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(BUSINESS_CHANGE_EVENT));
  }
  return normalized;
}

export function activateUserMembershipForInvoice(
  invoiceId: string
): BusinessStoreData {
  const current = loadBusinessStore();
  const invoice = current.invoices.find((inv) => inv.id === invoiceId);
  if (!invoice) return current;

  const now = new Date();
  const nowIso = now.toISOString();
  const oneYearLater = new Date(
    now.getTime() + 365 * 24 * 60 * 60 * 1000
  ).toISOString();

  const targetUser = current.users.find(
    (u) =>
      (invoice.userEmail &&
        u.email.toLowerCase() === invoice.userEmail.toLowerCase()) ||
      (invoice.userWhatsApp && u.whatsapp === invoice.userWhatsApp) ||
      (invoice.userName &&
        u.name.toLowerCase() === invoice.userName.toLowerCase())
  );

  let updatedUsers: BusinessUser[];

  if (targetUser) {
    const updatedUser: BusinessUser = {
      ...targetUser,
      membership: invoice.plan,
      purchasedLevel: invoice.programCode,
      status: "Aktif",
      activeSince: targetUser.activeSince || nowIso,
      activeUntil: oneYearLater,
      targetJLPT: invoice.targetJLPT || targetUser.targetJLPT,
      referredByCode: invoice.referralCode || targetUser.referredByCode,
      invoiceIds: targetUser.invoiceIds.includes(invoice.id)
        ? targetUser.invoiceIds
        : [...targetUser.invoiceIds, invoice.id],
    };
    updatedUsers = current.users.map((u) =>
      u.id === targetUser.id ? updatedUser : u
    );
  } else {
    const newUserId = `USR-${String(current.users.length + 1).padStart(3, "0")}`;
    const newUser: BusinessUser = {
      id: newUserId,
      name: invoice.userName,
      email: invoice.userEmail,
      whatsapp: invoice.userWhatsApp,
      membership: invoice.plan,
      purchasedLevel: invoice.programCode,
      status: "Aktif",
      activeSince: nowIso,
      activeUntil: oneYearLater,
      targetJLPT: invoice.targetJLPT,
      referredByCode: invoice.referralCode,
      invoiceIds: [invoice.id],
    };
    updatedUsers = [...current.users, newUser];
  }

  const updatedInvoice: Invoice = {
    ...invoice,
    status: "Aktif",
    activatedAt: invoice.activatedAt || nowIso,
    timeline:
      invoice.status === "Aktif"
        ? invoice.timeline
        : [
            ...invoice.timeline,
            {
              title: "Membership diaktifkan",
              at: nowIso,
              note: `Akses paket ${invoice.plan.toUpperCase()} level ${invoice.programCode} aktif hingga ${oneYearLater.split("T")[0]}.`,
            },
          ],
  };

  const updatedStore: BusinessStoreData = {
    ...current,
    users: updatedUsers,
    invoices: current.invoices.map((inv) =>
      inv.id === invoiceId ? updatedInvoice : inv
    ),
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: "Akses Membership Diaktifkan",
        detail: `Pengguna ${invoice.userName} (${invoice.userEmail}) aktif paket ${invoice.plan} level ${invoice.programCode}.`,
        at: nowIso,
        status: "Aktif",
      },
      ...current.activities,
    ],
  };

  return saveBusinessStore(updatedStore);
}

export function generateCommissionForInvoice(
  invoiceId: string
): BusinessStoreData {
  const current = loadBusinessStore();
  const invoice = current.invoices.find((inv) => inv.id === invoiceId);
  if (!invoice) return current;
  if (!invoice.referralCode && !invoice.affiliateId) return current;

  if (current.commissions.some((c) => c.invoiceId === invoice.id)) {
    return current;
  }

  const affiliate = current.affiliates.find(
    (aff) =>
      (invoice.affiliateId && aff.id === invoice.affiliateId) ||
      (invoice.referralCode &&
        aff.code.toUpperCase() === invoice.referralCode.toUpperCase())
  );
  if (!affiliate) return current;

  const commissionAmount =
    current.settings.commissionMode === "Percentage"
      ? Math.round((invoice.amount * current.settings.commissionValue) / 100)
      : current.settings.commissionValue;

  const now = new Date();
  const days = current.settings.validationPeriodDays || 0;
  const eligibleAt = new Date(
    now.getTime() + days * 24 * 60 * 60 * 1000
  ).toISOString();
  const status: CommissionStatus = days > 0 ? "Menunggu Validasi" : "Tersedia";

  const newCommission: Commission = {
    id: `COM-${String(current.commissions.length + 1).padStart(3, "0")}`,
    affiliateId: affiliate.id,
    affiliateCode: affiliate.code,
    invoiceId: invoice.id,
    amount: commissionAmount,
    status,
    eligibleAt,
    createdAt: now.toISOString(),
  };

  const updatedAffiliate: AffiliateAccount = {
    ...affiliate,
    purchases: affiliate.purchases + 1,
    totalCommission: affiliate.totalCommission + commissionAmount,
    unpaidCommission: affiliate.unpaidCommission + commissionAmount,
  };

  const updatedStore: BusinessStoreData = {
    ...current,
    commissions: [newCommission, ...current.commissions],
    affiliates: current.affiliates.map((aff) =>
      aff.id === affiliate.id ? updatedAffiliate : aff
    ),
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: "Komisi Afiliasi Dibuat",
        detail: `Komisi Rp ${commissionAmount.toLocaleString("id-ID")} untuk ${affiliate.name} (${affiliate.code}) dari ${invoice.id}.`,
        at: now.toISOString(),
        status,
      },
      ...current.activities,
    ],
  };

  return saveBusinessStore(updatedStore);
}

export function updateInvoiceStatus(
  invoiceId: string,
  nextStatus: InvoiceStatus,
  note?: string
): BusinessStoreData {
  const current = loadBusinessStore();
  const invoice = current.invoices.find((inv) => inv.id === invoiceId);
  if (!invoice || invoice.status === nextStatus) return current;

  const validTransitions: Record<InvoiceStatus, InvoiceStatus[]> = {
    Draft: ["Menunggu pembayaran"],
    "Menunggu pembayaran": ["Sudah bayar", "Diverifikasi", "Aktif"],
    "Sudah bayar": ["Diverifikasi", "Aktif"],
    Diverifikasi: ["Aktif"],
    Aktif: [],
  };

  if (!validTransitions[invoice.status]?.includes(nextStatus)) {
    return current;
  }

  const now = new Date().toISOString();
  const timelineItem: InvoiceTimelineItem = {
    title:
      nextStatus === "Sudah bayar"
        ? "Pembayaran dikonfirmasi"
        : nextStatus === "Diverifikasi"
        ? "Pembayaran diverifikasi"
        : nextStatus === "Aktif"
        ? "Membership diaktifkan"
        : `Status diubah ke ${nextStatus}`,
    at: now,
    ...(note ? { note } : {}),
  };

  const updatedInvoice: Invoice = {
    ...invoice,
    status: nextStatus,
    paidAt:
      nextStatus === "Sudah bayar" && !invoice.paidAt ? now : invoice.paidAt,
    verifiedAt:
      nextStatus === "Diverifikasi" && !invoice.verifiedAt
        ? now
        : invoice.verifiedAt,
    activatedAt:
      nextStatus === "Aktif" && !invoice.activatedAt
        ? now
        : invoice.activatedAt,
    timeline: [...invoice.timeline, timelineItem],
  };

  let updatedStore: BusinessStoreData = {
    ...current,
    invoices: current.invoices.map((inv) =>
      inv.id === invoiceId ? updatedInvoice : inv
    ),
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: `Invoice ${invoiceId} ${nextStatus}`,
        detail: `Status invoice ${invoiceId} diubah dari ${invoice.status} ke ${nextStatus}.`,
        at: now,
        status: nextStatus,
      },
      ...current.activities,
    ],
  };

  saveBusinessStore(updatedStore);

  if (nextStatus === "Diverifikasi") {
    updatedStore = generateCommissionForInvoice(invoiceId);
  } else if (nextStatus === "Aktif") {
    if (!invoice.verifiedAt) {
      updatedStore = generateCommissionForInvoice(invoiceId);
    }
    updatedStore = activateUserMembershipForInvoice(invoiceId);
  }

  return updatedStore;
}

export function markPayoutPaid(payoutId: string): BusinessStoreData {
  const current = loadBusinessStore();
  const payout = current.payouts.find((p) => p.id === payoutId);
  if (!payout || payout.status === "Sudah Dicairkan") return current;

  const now = new Date().toISOString();
  const updatedPayout: Payout = {
    ...payout,
    status: "Sudah Dicairkan",
    paidAt: now,
  };

  const commissionIds = new Set(payout.commissionIds);
  const updatedCommissions = current.commissions.map((c) => {
    if (commissionIds.has(c.id)) {
      return {
        ...c,
        status: "Sudah Dicairkan" as CommissionStatus,
        paidAt: now,
        payoutId: payout.id,
      };
    }
    return c;
  });

  const updatedAffiliates = current.affiliates.map((a) => {
    if (a.id === payout.affiliateId) {
      return {
        ...a,
        unpaidCommission: Math.max(0, a.unpaidCommission - payout.amount),
        paidCommission: a.paidCommission + payout.amount,
      };
    }
    return a;
  });

  const updatedStore: BusinessStoreData = {
    ...current,
    payouts: current.payouts.map((p) => (p.id === payoutId ? updatedPayout : p)),
    commissions: updatedCommissions,
    affiliates: updatedAffiliates,
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: "Payout Dicairkan",
        detail: `Pencairan ${payout.id} senilai Rp ${payout.amount.toLocaleString("id-ID")} untuk ${payout.affiliateName} berhasil dicairkan.`,
        at: now,
        status: "Sudah Dicairkan",
      },
      ...current.activities,
    ],
  };

  return saveBusinessStore(updatedStore);
}

export function createInvoice(
  data: Omit<Invoice, "id" | "createdAt" | "timeline"> &
    Partial<Pick<Invoice, "id" | "createdAt" | "timeline">>
): Invoice {
  const current = loadBusinessStore();
  const now = data.createdAt || new Date().toISOString();
  const id =
    data.id || `INV-2026-${String(current.invoices.length + 1).padStart(3, "0")}`;

  let affiliateId = data.affiliateId;
  if (!affiliateId && data.referralCode) {
    const aff = current.affiliates.find(
      (a) => a.code.toUpperCase() === data.referralCode?.toUpperCase()
    );
    if (aff) affiliateId = aff.id;
  }

  const invoice: Invoice = {
    id,
    createdAt: now,
    userName: data.userName,
    userEmail: data.userEmail,
    userWhatsApp: data.userWhatsApp,
    programCode: data.programCode,
    plan: data.plan,
    amount: data.amount,
    status: data.status || "Menunggu pembayaran",
    referralCode: data.referralCode,
    affiliateId,
    targetJLPT: data.targetJLPT,
    paymentNote: data.paymentNote,
    transferReference: data.transferReference,
    paidAt: data.paidAt,
    verifiedAt: data.verifiedAt,
    activatedAt: data.activatedAt,
    timeline: data.timeline || [{ title: "Invoice dibuat", at: now }],
  };

  const updatedStore: BusinessStoreData = {
    ...current,
    invoices: [invoice, ...current.invoices],
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: "Invoice Dibuat",
        detail: `Invoice ${invoice.id} dibuat untuk ${invoice.userName} (${invoice.programCode} - ${invoice.plan}).`,
        at: now,
        status: invoice.status,
      },
      ...current.activities,
    ],
  };

  saveBusinessStore(updatedStore);
  return invoice;
}

export function createPayout(
  affiliateId: string,
  amount: number,
  notes?: string
): Payout {
  const current = loadBusinessStore();
  const affiliate = current.affiliates.find((a) => a.id === affiliateId);
  const affiliateName = affiliate ? affiliate.name : "Mitra Afiliasi";
  const now = new Date().toISOString();
  const id = `PAY-${Date.now()}`;

  const eligibleCommissions = current.commissions.filter(
    (c) => c.affiliateId === affiliateId && c.status === "Tersedia" && !c.payoutId
  );
  let accumulated = 0;
  const commissionIds: string[] = [];
  for (const c of eligibleCommissions) {
    if (accumulated >= amount) break;
    commissionIds.push(c.id);
    accumulated += c.amount;
  }

  const payout: Payout = {
    id,
    affiliateId,
    affiliateName,
    amount,
    commissionIds,
    createdAt: now,
    status: "Menunggu",
    notes,
  };

  const updatedStore: BusinessStoreData = {
    ...current,
    payouts: [payout, ...current.payouts],
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: "Pengajuan Payout",
        detail: `Pengajuan penarikan dana ${payout.id} senilai Rp ${amount.toLocaleString("id-ID")} oleh ${affiliateName}.`,
        at: now,
        status: "Menunggu",
      },
      ...current.activities,
    ],
  };

  saveBusinessStore(updatedStore);
  return payout;
}

export function createAffiliate(
  data: Omit<
    AffiliateAccount,
    | "id"
    | "clicks"
    | "registrations"
    | "purchases"
    | "totalCommission"
    | "unpaidCommission"
    | "paidCommission"
    | "createdAt"
  >
): AffiliateAccount {
  const current = loadBusinessStore();
  const id = `AFF-${String(current.affiliates.length + 1).padStart(3, "0")}`;
  const now = new Date().toISOString();

  const affiliate: AffiliateAccount = {
    ...data,
    id,
    clicks: 0,
    registrations: 0,
    purchases: 0,
    totalCommission: 0,
    unpaidCommission: 0,
    paidCommission: 0,
    createdAt: now,
  };

  const updatedStore: BusinessStoreData = {
    ...current,
    affiliates: [...current.affiliates, affiliate],
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: "Afiliasi Baru Terdaftar",
        detail: `Mitra ${affiliate.name} dengan kode referral ${affiliate.code} ditambahkan.`,
        at: now,
        status: "Aktif",
      },
      ...current.activities,
    ],
  };

  saveBusinessStore(updatedStore);
  return affiliate;
}

export function toggleAffiliateStatus(affiliateId: string): BusinessStoreData {
  const current = loadBusinessStore();
  const updatedAffiliates = current.affiliates.map((a) => {
    if (a.id === affiliateId) {
      return {
        ...a,
        status: (a.status === "Aktif" ? "Nonaktif" : "Aktif") as "Aktif" | "Nonaktif",
      };
    }
    return a;
  });
  return saveBusinessStore({ ...current, affiliates: updatedAffiliates });
}

export function updateUser(
  userId: string,
  data: Partial<BusinessUser>
): BusinessStoreData {
  const current = loadBusinessStore();
  const updatedUsers = current.users.map((u) =>
    u.id === userId ? { ...u, ...data } : u
  );
  return saveBusinessStore({ ...current, users: updatedUsers });
}

export function extendUserAccess(
  userId: string,
  months: number
): BusinessStoreData {
  const current = loadBusinessStore();
  const user = current.users.find((u) => u.id === userId);
  if (!user) return current;

  const now = Date.now();
  const baseTime =
    user.activeUntil && new Date(user.activeUntil).getTime() > now
      ? new Date(user.activeUntil)
      : new Date();
  baseTime.setMonth(baseTime.getMonth() + months);
  const newActiveUntil = baseTime.toISOString();

  const updatedUsers = current.users.map((u) => {
    if (u.id === userId) {
      return {
        ...u,
        status: "Aktif" as UserStatus,
        activeUntil: newActiveUntil,
      };
    }
    return u;
  });

  const updatedStore: BusinessStoreData = {
    ...current,
    users: updatedUsers,
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: "Perpanjangan Akses Pengguna",
        detail: `Akses pengguna ${user.name} diperpanjang ${months} bulan hingga ${newActiveUntil.split("T")[0]}.`,
        at: new Date().toISOString(),
        status: "Aktif",
      },
      ...current.activities,
    ],
  };

  return saveBusinessStore(updatedStore);
}

export function toggleUserStatus(userId: string): BusinessStoreData {
  const current = loadBusinessStore();
  const updatedUsers = current.users.map((u) => {
    if (u.id === userId) {
      return {
        ...u,
        status: (u.status === "Aktif" ? "Nonaktif" : "Aktif") as UserStatus,
      };
    }
    return u;
  });
  return saveBusinessStore({ ...current, users: updatedUsers });
}

export function updateBusinessSettings(
  settings: Partial<BusinessSettings>
): BusinessStoreData {
  const current = loadBusinessStore();
  const { adminWhatsAppNumber, ...businessSettings } = settings;
  if (typeof adminWhatsAppNumber === "string") {
    updateAdminSettings({ contact: { whatsappNumber: adminWhatsAppNumber } });
  }
  const updatedSettings: BusinessSettings = {
    ...current.settings,
    ...businessSettings,
  };
  const updatedStore: BusinessStoreData = {
    ...current,
    settings: updatedSettings,
    activities: [
      {
        id: `ACT-${Date.now()}`,
        title: "Pengaturan Bisnis Diperbarui",
        detail: "Pengaturan operasional dan komisi bisnis diperbarui.",
        at: new Date().toISOString(),
      },
      ...current.activities,
    ],
  };
  return saveBusinessStore(updatedStore);
}

let adminCachedRaw: string | null | undefined;
let adminCachedStore: BusinessStoreData | null = null;

function subscribeBusinessAdmin(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === BUSINESS_STORAGE_KEY) {
      adminCachedRaw = undefined;
      adminCachedStore = null;
      onStoreChange();
    }
  };
  const handleCustom = () => {
    adminCachedRaw = undefined;
    adminCachedStore = null;
    onStoreChange();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(BUSINESS_CHANGE_EVENT, handleCustom);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(BUSINESS_CHANGE_EVENT, handleCustom);
  };
}

function getBusinessAdminSnapshot(): BusinessStoreData {
  if (typeof window === "undefined") return initialBusinessStore;
  const raw = window.localStorage.getItem(BUSINESS_STORAGE_KEY);
  if (raw !== adminCachedRaw || !adminCachedStore) {
    adminCachedRaw = raw;
    adminCachedStore = loadBusinessStore();
  }
  return adminCachedStore;
}

export function useBusinessAdminStore(): BusinessStoreData {
  return useSyncExternalStore(
    subscribeBusinessAdmin,
    getBusinessAdminSnapshot,
    () => initialBusinessStore
  );
}
