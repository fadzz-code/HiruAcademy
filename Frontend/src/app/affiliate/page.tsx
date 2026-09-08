import type { Metadata } from "next";
import { Suspense } from "react";
import { SupportingRoute } from "@/components/supporting-route";

export const metadata: Metadata = {
  title: "Program Afiliasi & Referral",
  description: "Bagikan kode referral HIRU Academy dan dapatkan reward belajar.",
  robots: { index: false, follow: false },
};

export default function AffiliatePage() {
  return (
    <Suspense>
      <SupportingRoute kind="affiliate" />
    </Suspense>
  );
}
