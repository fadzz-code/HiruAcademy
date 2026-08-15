"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthMode = "login" | "register";

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
      {hidden && <path d="m4 4 16 16" />}
    </svg>
  );
}

function PasswordField({ id, label, autoComplete }: { id: string; label: string; autoComplete: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="password-wrap">
        <input id={id} name={id} type={visible ? "text" : "password"} autoComplete={autoComplete} required aria-describedby={`${id}-hint`} />
        <button type="button" onClick={() => setVisible((value) => !value)} aria-label={visible ? `Sembunyikan ${label.toLowerCase()}` : `Tampilkan ${label.toLowerCase()}`} aria-pressed={visible}>
          <EyeIcon hidden={visible} />
        </button>
      </div>
      <small id={`${id}-hint`}>{id === "password" && autoComplete === "new-password" ? "Gunakan kata sandi yang aman dan mudah kamu ingat." : ""}</small>
    </div>
  );
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const register = mode === "register";
  const router = useRouter();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!register) {
      // TEMP FRONTEND MVP: replace this mock redirect with real Laravel/Sanctum authentication later.
      router.push("/dashboard?membership=free");
    }
  }

  return (
    <form className="auth-form" onSubmit={submit} noValidate={!register}>
      {register && (
        <div className="auth-field">
          <label htmlFor="name">Nama Lengkap</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Masukkan nama lengkap" required />
        </div>
      )}

      {register ? (
        <>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="contoh@email.com" required />
          </div>
          <div className="auth-field">
            <label htmlFor="whatsapp">Nomor WhatsApp</label>
            <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+62 8xx xxxx xxxx" required />
          </div>
        </>
      ) : (
        <div className="auth-field">
          <label htmlFor="identity">Email / WhatsApp</label>
          <input id="identity" name="identity" type="text" autoComplete="username" placeholder="email atau nomor WhatsApp" required />
        </div>
      )}

      <PasswordField id="password" label="Kata sandi" autoComplete={register ? "new-password" : "current-password"} />
      {register && <PasswordField id="password_confirmation" label="Konfirmasi kata sandi" autoComplete="new-password" />}

      {register && (
        <div className="auth-field">
          <label htmlFor="referral">Kode referral <span>(opsional)</span></label>
          <input id="referral" name="referral" type="text" autoComplete="off" placeholder="Masukkan kode jika ada" />
        </div>
      )}

      <button className="auth-submit" type="submit">{register ? "Buat Akun & Lanjut" : "Masuk"}<span aria-hidden="true">→</span></button>

      <p className="auth-switch">{register ? "Sudah punya akun?" : "Belum punya akun?"} <Link href={register ? "/login" : "/register"}>{register ? "Masuk" : "Daftar"}</Link></p>
    </form>
  );
}
