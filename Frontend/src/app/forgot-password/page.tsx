"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { AuthStatus } from "@/components/auth-status";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return <AuthShell eyebrow="PEMULIHAN AKUN" title="Tenang, perjalanan belajarmu tetap tersimpan" description="Kami akan mengirimkan tautan pemulihan ke email yang terhubung dengan akun."><div className="auth-card-inner">{sent ? <AuthStatus tone="success" eyebrow="AUTH • EMAIL SENT" title="Tautan pemulihan sudah dikirim" marker="郵" description="Pesan tetap sama untuk email terdaftar maupun tidak terdaftar demi keamanan akun." items={["Email ditampilkan termasking", "Tautan sekali pakai", "Masa berlaku dari backend"]} primary={{ label: "Buka Reset Kata Sandi", href: "/reset-password" }} secondary={{ label: "Kirim Ulang" }} onSecondary={() => setSent(true)} /> : <><p className="kicker">LUPA KATA SANDI</p><h2>Pulihkan akses akunmu</h2><p className="auth-description">Masukkan email akun. Demi keamanan, hasil pengiriman menggunakan pesan yang sama untuk email terdaftar maupun tidak terdaftar.</p><form className="auth-form" onSubmit={submit}><div className="auth-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="contoh@email.com" required /><small>Teks bantuan opsional</small></div><div className="recovery-security"><span aria-hidden="true">鍵</span><p>Tautan bersifat sekali pakai dan memiliki masa berlaku yang ditentukan backend.</p></div><div className="runner-actions"><button className="button button-primary" type="submit">Kirim Tautan Reset</button><Link className="button button-dark" href="/login">Kembali ke Login</Link></div></form><div className="auth-announcement"><strong>Pengumuman</strong><p>Periksa inbox dan folder spam. Jangan pernah membagikan tautan reset kepada siapa pun.</p></div></>}</div></AuthShell>;
}
