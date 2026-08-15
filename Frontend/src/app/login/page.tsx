"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth-shell";

export default function LoginPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard?membership=free");
  }

  return (
    <AuthShell
      eyebrow="KEMBALI KE PERJALANAN BELAJARMU"
      title="Dashboard yang dibuka setelah login mengikuti membership dan entitlement akun."
      description=""
    >
      <div className="auth-card-inner">
        <h2>Masuk ke Hiru Academy</h2>
        <p className="auth-description">Gunakan email atau nomor WhatsApp dan kata sandi yang terhubung dengan membership-mu.</p>

        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label htmlFor="identity">Email / WhatsApp</label>
            <input id="identity" name="identity" type="text" autoComplete="username" placeholder="email atau nomor WhatsApp" required />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Kata Sandi</label>
            <div className="password-wrap">
              <input id="password" name="password" type={visible ? "text" : "password"} autoComplete="current-password" placeholder="Masukkan kata sandi" required />
              <button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} aria-pressed={visible}>
                <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" />{visible && <path d="m4 4 16 16" />}</svg>
              </button>
            </div>
            <small>Lupa kata sandi? <span className="future-link" aria-disabled="true">Gunakan alur pemulihan akun.</span></small>
          </div>

          <button className="auth-submit button button-primary" type="submit" style={{ width: "100%", marginTop: "10px" }}>Masuk</button>

          <p className="auth-switch">Belum punya akun? <Link className="text-link" href="/register">Daftar</Link></p>
        </form>

        <div className="auth-announcement" style={{ marginTop: "28px" }}>
          <strong>Pengumuman</strong>
          <p>Akses setelah login mengikuti Free, LMS, atau LMS + Zoom pada akun.</p>
        </div>
      </div>
    </AuthShell>
  );
}
