"use client";

import Link from "next/link";
import { useState } from "react";
import { PublicPage } from "@/components/public-shell";

const outcomes = [
  ["Analisis 4 kemampuan", "Lihat hasil Bunpou, Moji・Goi, Dokkai, dan Choukai."],
  ["Rekomendasi level", "Dapatkan rekomendasi level N5–N1 sesuai hasil tesmu."],
  ["Fokus yang perlu diperbaiki", "Temukan kemampuan yang sudah kuat dan bagian yang perlu kamu prioritaskan."],
];

export default function PlacementPage() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [target, setTarget] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const valid = Boolean(name.trim() && whatsapp.trim() && target && privacy);

  return (
    <PublicPage active="Placement Test">
      <main className="public-main placement-page">
        <section className="placement-hero-card">
          <div className="placement-hero-copy">
            <p className="kicker">PLACEMENT TEST</p>
            <h1>Kenali levelmu sebelum memulai journey</h1>
            <p>Isi Nama, WhatsApp, dan Target Ujian, lalu jawab 20 soal sekitar 5 menit. Tidak perlu login untuk memulai.</p>
            <div className="public-pills">
              <span>Gratis</span>
              <span>20 soal | ±5 menit</span>
              <span>Hasil langsung</span>
            </div>
            <div className="result-actions">
              <a className="button button-primary placement-start-cta" href="#placement-form">Mulai Tes</a>
            </div>
          </div>
          <aside className="placement-outcomes">
            <p className="kicker">HASIL YANG KAMU DAPATKAN</p>
            {outcomes.map(([title, description], index) => (
              <article key={title}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </aside>
        </section>

        <section className="placement-form-card placement-form-focus" id="placement-form">
          <form className="public-form" action="/placement/question">
            <p className="kicker">DATA SEBELUM TES</p>
            <label>
              Nama
              <input name="name" placeholder="Masukkan nama" value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <label>
              Nomor WhatsApp
              <input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+62 8xx xxxx xxxx" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} required />
            </label>
            <label>
              Target Ujian
              <select name="target" value={target} onChange={(event) => setTarget(event.target.value)} required>
                <option value="" disabled>Pilih target ujian</option>
                {["Belum menentukan", "N5", "N4", "N3", "N2", "N1"].map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </label>
            <label className="consent">
              <input type="checkbox" checked={privacy} onChange={(event) => setPrivacy(event.target.checked)} required />
              <span>Saya menyetujui pemrosesan data sesuai <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>.</span>
            </label>
            <label className="consent">
              <input type="checkbox" name="whatsappConsent" />
              <span>Saya bersedia menerima penjelasan hasil dan informasi program Hiru Academy melalui WhatsApp.</span>
            </label>
            <button className="button button-primary" type="submit" disabled={!valid}>Mulai Placement Test Gratis</button>
          </form>
        </section>
      </main>
    </PublicPage>
  );
}
