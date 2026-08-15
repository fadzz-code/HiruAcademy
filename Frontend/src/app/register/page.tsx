"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { PublicPage } from "@/components/public-shell";

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const placement = searchParams.get("placement");
  const planContext = searchParams.get("plan");

  const [visible, setVisible] = useState(false);
  const defaultTarget = placement && ["N1", "N2", "N3", "N4", "N5"].includes(placement) ? placement : "N4";
  const defaultPlan = planContext === "sensei" ? "Belajar dengan Sensei" : planContext === "lms" ? "Belajar Mandiri" : "Free Member";
  const [target, setTarget] = useState(defaultTarget);
  const [plan, setPlan] = useState(defaultPlan);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (plan === "Free Member") router.push("/dashboard?membership=free");
    else router.push(`/checkout?level=${target.toLowerCase()}&plan=${plan === "Belajar Mandiri" ? "lms" : "sensei"}`);
  }

  return (
    <div className="register-layout">
      <aside className="register-sidebar">
        <div className="register-sidebar-inner">
          <p className="kicker">DAFTAR DAN SIMPAN REKOMENDASI</p>
          <h2>Simpan hasil dan mulai perjalananmu</h2>
          <p>Target ujian dapat diubah. Kode referral bersifat opsional dan divalidasi sebelum invoice dibuat.</p>
          <p>Akun digunakan untuk progres, entitlement, invoice, community, dan rekomendasi belajar.</p>
          <hr />
          <ol className="register-steps">
            <li>
              <strong>01</strong>
              <div>
                <h3>Buat akun</h3>
                <p>Isi data dasar dan preferensi belajar.</p>
              </div>
            </li>
            <li>
              <strong>02</strong>
              <div>
                <h3>Konfirmasi target &amp; program</h3>
                <p>Target ujian, level, dan plan dapat diperiksa kembali.</p>
              </div>
            </li>
            <li>
              <strong>03</strong>
              <div>
                <h3>Hubungi admin</h3>
                <p>Selesaikan verifikasi invoice melalui WhatsApp.</p>
              </div>
            </li>
          </ol>
        </div>
      </aside>

      <section className="register-card">
        <header>
          <p className="kicker">BUAT AKUN</p>
          <h1>Daftar dan simpan rekomendasi</h1>
          <p>Isi data untuk melanjutkan. Rekomendasi placement: {defaultTarget} • Target ujian tetap dapat disesuaikan oleh pengguna.</p>
        </header>

        <form className="public-form register-form" onSubmit={submit}>
          <div className="register-form-grid">
            <label>Nama Lengkap<input name="name" type="text" autoComplete="name" placeholder="Masukkan nama lengkap" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" placeholder="contoh@email.com" required /></label>
            <label>Nomor WhatsApp<input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+62 8xx xxxx xxxx" required /></label>

            <div className="auth-field">
              <label htmlFor="password">Kata Sandi</label>
              <div className="password-wrap">
                <input id="password" name="password" type={visible ? "text" : "password"} autoComplete="new-password" required minLength={8} placeholder="Minimal 8 karakter" />
                <button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} aria-pressed={visible}>
                  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" />{visible && <path d="m4 4 16 16" />}</svg>
                </button>
              </div>
            </div>

            <label>Target Ujian
              <select name="target" value={target} onChange={(event) => setTarget(event.target.value)} required>
                {["N1", "N2", "N3", "N4", "N5"].map(level => <option key={level}>{level}</option>)}
              </select>
            </label>
            <label>Cara Belajar
              <select name="plan" value={plan} onChange={(event) => setPlan(event.target.value)} required>
                <option>Free Member</option>
                <option>Belajar Mandiri</option>
                <option>Belajar dengan Sensei</option>
              </select>
            </label>

            {plan !== "Free Member" && <label className="referral-field">Kode Referral (Opsional)<input name="referral" type="text" placeholder="Masukkan kode referral" />
              <small>Opsional • divalidasi backend<br/>Kode valid memberi diskon pada pembelian ini. Pemilik kode menerima reward diskon setelah invoice diverifikasi Admin.</small>
            </label>}
          </div>

          <div className="register-actions">
            <p className="register-notice">Progres placement dan rekomendasi level akan disimpan pada akun.</p>
            <div className="runner-actions">
              <button className="button button-primary" type="submit">Buat Akun &amp; Lanjut</button>
              <Link className="button button-dark" href="/program">Kembali ke Program</Link>
            </div>
            <p className="auth-switch">Sudah punya akun? <Link className="text-link" href="/login">Masuk</Link></p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <PublicPage active="Coba Gratis">
      <main className="public-main register-page-main">
        <Suspense fallback={<div style={{ padding: "100px", textAlign: "center" }}>Memuat formulir...</div>}>
          <RegisterForm />
        </Suspense>
      </main>
    </PublicPage>
  );
}
