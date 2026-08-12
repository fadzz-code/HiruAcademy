import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Masuk", description: "Masuk ke akun HIRU Academy." };

export default function LoginPage() {
  return <AuthShell eyebrow="Selamat datang kembali" title="Lanjutkan perjalanan belajarmu" description="Masuk menggunakan email atau nomor WhatsApp yang terhubung dengan akunmu."><AuthForm mode="login" /></AuthShell>;
}
