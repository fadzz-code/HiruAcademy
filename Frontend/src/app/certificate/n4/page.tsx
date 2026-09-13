import { Suspense } from "react";
import { CertificateUnavailableScreen } from "@/components/certificate-unavailable-screen";

export default function CertificateN4Page() {
  return <Suspense><CertificateUnavailableScreen level="N4" /></Suspense>;
}
