"use client";

import {
  loadBusinessStore,
  type CommissionStatus,
  type InvoiceStatus,
  type PayoutStatus,
} from "@/lib/admin-business-store";
import { loadPlacementStore } from "@/lib/admin-placement-store";
import {
  readAssessments,
  type AssessmentType,
} from "@/lib/admin-assessment-store";
import {
  readCurriculumStore,
  type LibraryMaterialType,
  type ProgramCode,
} from "@/lib/admin-curriculum-store";
import { readWebsiteStore } from "@/lib/admin-website-store";
import { readClassOperationsStore } from "@/lib/admin-class-operations-store";
import { readAdminSettingsStore } from "@/lib/admin-settings-store";
import { isValidGa4MeasurementId, isValidMetaPixelId } from "@/lib/settings-store";

export type AnalyticsPeriod = "7d" | "30d" | "all";
export type Distribution = { label: string; count: number; value?: number };
export type SnapshotMetric = { value: number; scope: "current"; dateFiltered: false };
export type PeriodMetric = { value: number; scope: AnalyticsPeriod; dateFiltered: true };
export type ExternalAnalyticsStatus = {
  configured: boolean;
  status: "connected" | "attention" | "disconnected" | "invalid";
  source: "settings";
  label: string;
};

export type AnalyticsData = {
  period: AnalyticsPeriod;
  generatedAt: string;
  tabs: {
    summary: {
      totalUsers: SnapshotMetric;
      activeMemberships: SnapshotMetric;
      invoicesAwaitingAction: SnapshotMetric;
      verifiedAndActiveInvoices: SnapshotMetric;
      placementLeads: PeriodMetric;
      publishedContent: SnapshotMetric;
      upcomingSessions: SnapshotMetric;
      externalAnalytics: ExternalAnalyticsStatus;
    };
    acquisition: {
      placementRecommendations: Distribution[];
      placementTargets: Distribution[];
      leadStatuses: Distribution[];
      referralAttributedInvoices: Distribution[];
      affiliateSnapshot: {
        scope: "current";
        dateFiltered: false;
        affiliates: number;
        activeAffiliates: number;
        clicks: number;
        registrations: number;
        purchases: number;
      };
    };
    learning: {
      publishedPrograms: SnapshotMetric;
      publishedChapters: SnapshotMetric;
      publishedAssessments: SnapshotMetric;
      publishedDecks: SnapshotMetric;
      publishedMaterials: SnapshotMetric;
      publishedReplays: SnapshotMetric;
      upcomingSessions: SnapshotMetric;
      programsByCode: Distribution[];
      chaptersByProgram: Distribution[];
      assessmentsByType: Distribution[];
      decksByProgram: Distribution[];
      materialsByType: Distribution[];
      replaysByProgram: Distribution[];
    };
    transactions: {
      invoicesByStatus: Distribution[];
      verifiedAndActiveValue: PeriodMetric;
      commissionsByStatus: Distribution[];
      availableCommission: PeriodMetric;
      paidCommission: PeriodMetric;
      payoutsByStatus: Distribution[];
      payoutValueByStatus: Distribution[];
    };
  };
};

const DAY = 86_400_000;
const invoiceStatuses: InvoiceStatus[] = [
  "Draft",
  "Menunggu pembayaran",
  "Sudah bayar",
  "Diverifikasi",
  "Aktif",
];
const commissionStatuses: CommissionStatus[] = [
  "Menunggu Validasi",
  "Tersedia",
  "Sudah Dicairkan",
  "Dibatalkan",
];
const payoutStatuses: PayoutStatus[] = [
  "Menunggu",
  "Diproses",
  "Sudah Dicairkan",
  "Ditolak",
];
const assessmentTypes: AssessmentType[] = [
  "practice",
  "checkpoint",
  "tryout",
  "mini",
];

function snapshot(value: number): SnapshotMetric {
  return { value, scope: "current", dateFiltered: false };
}

function periodMetric(value: number, period: AnalyticsPeriod): PeriodMetric {
  return { value, scope: period, dateFiltered: true };
}

function timestamp(value: string | undefined): number | null {
  if (!value) return null;
  const result = Date.parse(value);
  return Number.isFinite(result) ? result : null;
}

function inPeriod(value: string | undefined, start: number | null, end: number): boolean {
  const time = timestamp(value);
  return time !== null && time <= end && (start === null || time >= start);
}

function distributions<T>(
  labels: readonly string[],
  rows: readonly T[],
  labelOf: (row: T) => string,
  valueOf?: (row: T) => number
): Distribution[] {
  return labels.map((label) => {
    const matching = rows.filter((row) => labelOf(row) === label);
    const item: Distribution = { label, count: matching.length };
    if (valueOf) item.value = matching.reduce((sum, row) => sum + valueOf(row), 0);
    return item;
  });
}

function labelsFrom<T>(rows: readonly T[], labelOf: (row: T) => string): string[] {
  return [...new Set(rows.map(labelOf).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "id-ID")
  );
}

export function deriveExternalAnalyticsStatus(
  storage: Pick<Storage, "getItem" | "setItem"> | null = typeof window === "undefined" ? null : window.localStorage
): ExternalAnalyticsStatus {
  const settings = readAdminSettingsStore(storage);
  const { ga4Enabled, ga4MeasurementId, metaEnabled, metaPixelId } = settings.integrations;
  const ga4Valid = ga4Enabled && isValidGa4MeasurementId(ga4MeasurementId);
  const metaValid = metaEnabled && isValidMetaPixelId(metaPixelId);
  const configured = ga4Enabled || metaEnabled;
  const status: ExternalAnalyticsStatus["status"] =
    ga4Valid || metaValid ? "connected" : configured ? "attention" : "disconnected";
  const label =
    ga4Valid && metaValid
      ? "GA4 & Meta Terhubung"
      : ga4Valid
        ? "GA4 Terhubung"
        : metaValid
          ? "Meta Terhubung"
          : configured
            ? "Perlu perhatian"
            : "Belum terhubung";
  return {
    configured,
    status,
    source: "settings",
    label,
  };
}

export function deriveAnalytics(
  period: AnalyticsPeriod,
  now: Date = new Date()
): AnalyticsData {
  const nowTime = now.getTime();
  const end = Number.isFinite(nowTime) ? nowTime : Date.now();
  const start = period === "all" ? null : end - (period === "7d" ? 7 : 30) * DAY;
  const storage = typeof window === "undefined" ? null : window.localStorage;
  const business = loadBusinessStore(storage);
  const placement = loadPlacementStore(storage);
  const assessments = readAssessments(storage);
  const curriculum = readCurriculumStore(storage);
  const website = readWebsiteStore(storage);
  const classOperations = readClassOperationsStore(storage);

  const invoices = business.invoices.filter((row) => inPeriod(row.createdAt, start, end));
  const leads = placement.leads.filter((row) => inPeriod(row.date, start, end));
  const commissions = business.commissions.filter((row) =>
    inPeriod(row.createdAt, start, end)
  );
  const payouts = business.payouts.filter((row) => inPeriod(row.createdAt, start, end));
  const upcomingSessions = classOperations.sessions.filter((row) => {
    const starts = timestamp(row.startAt);
    return starts !== null && starts >= end && row.status === "Terjadwal";
  });

  const publishedPrograms = curriculum.programs.filter((row) => row.status === "Published");
  const publishedChapters = curriculum.chapters.filter((row) => row.status === "Published");
  const publishedAssessments = assessments.filter((row) => row.status === "Published");
  const publishedDecks = curriculum.flashcardDecks.filter(
    (row) => row.status === "Published"
  );
  const publishedMaterials = curriculum.libraryMaterials.filter(
    (row) => row.status === "Published"
  );
  const publishedReplays = curriculum.replays.filter((row) => row.status === "Published");
  const publishedWebsiteContent =
    Number(website.landing.status === "Published") +
    website.campaigns.filter((row) => row.status === "Published").length +
    website.articles.filter((row) => row.status === "Published").length +
    website.testimonials.filter((row) => row.status === "Published").length +
    website.announcements.filter((row) => row.status === "Published").length;
  const publishedContent =
    publishedPrograms.length +
    publishedChapters.length +
    publishedAssessments.length +
    publishedDecks.length +
    publishedMaterials.length +
    publishedReplays.length +
    publishedWebsiteContent +
    Number(placement.publishedConfig?.status === "Published");

  const verifiedAndActiveInvoices = business.invoices.filter(
    (row) => row.status === "Diverifikasi" || row.status === "Aktif"
  );
  const referralInvoices = invoices.filter(
    (row) => Boolean(row.referralCode) || Boolean(row.affiliateId)
  );
  const affiliateSnapshot = business.affiliates.reduce(
    (result, row) => ({
      scope: "current" as const,
      dateFiltered: false as const,
      affiliates: result.affiliates + 1,
      activeAffiliates: result.activeAffiliates + Number(row.status === "Aktif"),
      clicks: result.clicks + row.clicks,
      registrations: result.registrations + row.registrations,
      purchases: result.purchases + row.purchases,
    }),
    {
      scope: "current" as const,
      dateFiltered: false as const,
      affiliates: 0,
      activeAffiliates: 0,
      clicks: 0,
      registrations: 0,
      purchases: 0,
    }
  );

  return {
    period,
    generatedAt: new Date(end).toISOString(),
    tabs: {
      summary: {
        totalUsers: snapshot(business.users.length),
        activeMemberships: snapshot(
          business.users.filter(
            (row) => row.status === "Aktif" && row.membership !== "free"
          ).length
        ),
        invoicesAwaitingAction: snapshot(
          business.invoices.filter((row) => row.status === "Sudah bayar").length
        ),
        verifiedAndActiveInvoices: snapshot(verifiedAndActiveInvoices.length),
        placementLeads: periodMetric(leads.length, period),
        publishedContent: snapshot(publishedContent),
        upcomingSessions: snapshot(upcomingSessions.length),
        externalAnalytics: deriveExternalAnalyticsStatus(storage),
      },
      acquisition: {
        placementRecommendations: distributions(
          labelsFrom(leads, (row) => row.recommendedLevel),
          leads,
          (row) => row.recommendedLevel
        ),
        placementTargets: distributions(
          labelsFrom(leads, (row) => row.target),
          leads,
          (row) => row.target
        ),
        leadStatuses: distributions(
          ["Baru", "Sudah Dihubungi"],
          leads,
          (row) => row.status
        ),
        referralAttributedInvoices: distributions(
          labelsFrom(referralInvoices, (row) => row.referralCode || row.affiliateId || ""),
          referralInvoices,
          (row) => row.referralCode || row.affiliateId || "",
          (row) => row.amount
        ),
        affiliateSnapshot,
      },
      learning: {
        publishedPrograms: snapshot(publishedPrograms.length),
        publishedChapters: snapshot(publishedChapters.length),
        publishedAssessments: snapshot(publishedAssessments.length),
        publishedDecks: snapshot(publishedDecks.length),
        publishedMaterials: snapshot(publishedMaterials.length),
        publishedReplays: snapshot(publishedReplays.length),
        upcomingSessions: snapshot(upcomingSessions.length),
        programsByCode: distributions(
          labelsFrom(publishedPrograms, (row) => row.code),
          publishedPrograms,
          (row) => row.code
        ),
        chaptersByProgram: distributions(
          labelsFrom(publishedChapters, (row) => row.programCode),
          publishedChapters,
          (row) => row.programCode
        ),
        assessmentsByType: distributions(
          assessmentTypes,
          publishedAssessments,
          (row) => row.type
        ),
        decksByProgram: distributions(
          labelsFrom(publishedDecks, (row) => row.programCode),
          publishedDecks,
          (row) => row.programCode
        ),
        materialsByType: distributions(
          labelsFrom(publishedMaterials, (row) => row.type),
          publishedMaterials,
          (row) => row.type
        ),
        replaysByProgram: distributions(
          labelsFrom(publishedReplays, (row) => row.programCode || "Tanpa program"),
          publishedReplays,
          (row) => row.programCode || "Tanpa program"
        ),
      },
      transactions: {
        invoicesByStatus: distributions(
          invoiceStatuses,
          invoices,
          (row) => row.status,
          (row) => row.amount
        ),
        verifiedAndActiveValue: periodMetric(
          invoices
            .filter((row) => row.status === "Diverifikasi" || row.status === "Aktif")
            .reduce((sum, row) => sum + row.amount, 0),
          period
        ),
        commissionsByStatus: distributions(
          commissionStatuses,
          commissions,
          (row) => row.status,
          (row) => row.amount
        ),
        availableCommission: periodMetric(
          commissions
            .filter((row) => row.status === "Tersedia")
            .reduce((sum, row) => sum + row.amount, 0),
          period
        ),
        paidCommission: periodMetric(
          commissions
            .filter((row) => row.status === "Sudah Dicairkan")
            .reduce((sum, row) => sum + row.amount, 0),
          period
        ),
        payoutsByStatus: distributions(payoutStatuses, payouts, (row) => row.status),
        payoutValueByStatus: distributions(
          payoutStatuses,
          payouts,
          (row) => row.status,
          (row) => row.amount
        ),
      },
    },
  };
}

export type AnalyticsProgramCode = ProgramCode;
export type AnalyticsMaterialType = LibraryMaterialType;
