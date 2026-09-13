import { AssessmentUnavailable } from "@/components/assessment-unavailable";

export function LockedTryout() {
  return (
    <AssessmentUnavailable
      eyebrow="AKSES TERKUNCI"
      title="Try Out ini belum tersedia untuk akunmu"
      description="Free Member dapat melihat informasi fitur simulasi, namun akses pengerjaan runner memerlukan paket belajar aktif."
      facts={["Simulasi terstandarisasi", "Hasil skor dan rincian per bagian JLPT", "Review pembahasan jawaban lengkap"]}
      primary={{ label: "Lihat pilihan belajar", href: "/renewal?membership=free" }}
      secondary={{ label: "Kembali Dashboard", href: "/dashboard?membership=free" }}
    />
  );
}
