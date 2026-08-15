import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Daftar", description: "Buat akun HIRU Academy." };

export default function RegisterPage() {
  return <AuthShell eyebrow="Daftar dan simpan rekomendasi" title="Simpan hasil dan mulai perjalananmu" description="Target ujian dapat diubah. Kode referral bersifat opsional dan divalidasi sebelum invoice dibuat."><AuthForm mode="register" /></AuthShell>;
}
