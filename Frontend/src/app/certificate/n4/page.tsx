import type { Metadata } from "next";
import { Suspense } from "react";
import { CertificateDetailScreen } from "@/components/certificate-detail-screen";

export const metadata: Metadata = { title: "Detail Sertifikat", robots: { index: false, follow: false } };

export default function CertificateDetailPage() {
  return <Suspense><CertificateDetailScreen /></Suspense>;
}
