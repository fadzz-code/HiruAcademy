import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Masuk", description: "Masuk ke akun HIRU Academy." };

export default function LoginPage() {
  return <AuthShell eyebrow="Masuk ke Hiru Academy" title="Masuk ke Hiru Academy" description="Gunakan email atau nomor WhatsApp dan kata sandi yang terhubung dengan membership-mu."><AuthForm mode="login" /></AuthShell>;
}
