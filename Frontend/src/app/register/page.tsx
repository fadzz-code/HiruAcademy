import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Daftar", description: "Buat akun HIRU Academy." };

export default function RegisterPage() {
  return <AuthShell eyebrow="Mulai bersama HIRU" title="Buat akun belajarmu" description="Siapkan akun untuk menyimpan perjalanan dan perkembangan belajar bahasa Jepangmu."><AuthForm mode="register" /></AuthShell>;
}
