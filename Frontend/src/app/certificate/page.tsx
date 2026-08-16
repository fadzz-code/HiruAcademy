import type { Metadata } from "next";
import { Suspense } from "react";
import { SupportingRoute } from "@/components/supporting-route";

export const metadata: Metadata = { title: "Certificate Center", robots: { index: false, follow: false } };

export default function CertificatePage() {
  return <Suspense><SupportingRoute kind="certificate" /></Suspense>;
}
