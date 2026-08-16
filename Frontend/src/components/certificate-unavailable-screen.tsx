"use client";

import { useSearchParams } from "next/navigation";
import { AssessmentUnavailable } from "@/components/assessment-unavailable";
import { parseMembership } from "@/lib/dashboard-mock";
import { StudentNavigation } from "@/components/student-navigation";

export function CertificateUnavailableScreen() {
  const membership = parseMembership(useSearchParams().get("membership") ?? undefined);
  const query = `?membership=${membership}`;
  return (
    <div className="supporting-shell student-shell">
      <StudentNavigation membership={membership} current="certificate" />
      <main className="supporting-main">
        <AssessmentUnavailable eyebrow="CERTIFICATE • UNAVAILABLE" title="Sertifikat belum dapat diterbitkan" description="Selesaikan seluruh eligibility yang ditentukan program sebelum sertifikat digital tersedia." facts={["Journey belum lengkap", "Assessment perlu valid", "Issue oleh backend"]} primary={{ label: "Lihat Kriteria", href: `/certificate${query}` }} secondary={{ label: "Kembali", href: `/certificate${query}` }} />
      </main>
    </div>
  );
}
