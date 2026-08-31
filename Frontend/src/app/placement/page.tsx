"use client";

import Link from "next/link";
import { useState } from "react";
import { PublicPage } from "@/components/public-shell";

const outcomes = [
  ["Analisis 4 kemampuan", "Lihat hasil Bunpou, Moji・Goi, Dokkai, dan Choukai."],
  ["Rekomendasi level", "Dapatkan rekomendasi level N5–N1 sesuai hasil tesmu."],
  ["Fokus yang perlu diperbaiki", "Temukan kemampuan yang sudah kuat dan bagian yang perlu kamu prioritaskan."],
];
const steps = [
  ["01", "JAWAB SOAL", "Kerjakan soal bertahap", "Soal dibagi per section agar lebih mudah dipahami dan ditinjau."],
  ["02", "LIHAT PROGRESS", "Pantau kemajuan pengerjaan", "Progress dan jawaban tersimpan selama sesi placement berlangsung."],
    ["03", "DAPATKAN HASIL", "Lihat rekomendasi level", "Hasil menampilkan analisis empat kemampuan, rekomendasi level, dan fokus yang perlu diperbaiki."],
];
const reminders = [
  ["▤", "Aktifkan audio atau gunakan earphone untuk soal Choukai."],
  ["✎", "Kerjakan tanpa kamus, penerjemah, atau bantuan orang lain."],
  ["⌁", "Selesaikan seluruh soal dalam satu sesi."],
];

export default function PlacementPage() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [target, setTarget] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const valid = Boolean(name.trim() && whatsapp.trim() && target && privacy);

  return <PublicPage active="Placement Test"><main className="public-main placement-page">
    <section className="placement-hero-card"><div className="placement-hero-copy"><p className="kicker">PLACEMENT TEST</p><h1>Kenali levelmu sebelum memulai journey</h1><p>Isi Nama, WhatsApp, dan Target Ujian, lalu jawab 20 soal sekitar 5 menit. Tidak perlu login untuk memulai.</p><div className="public-pills"><span>Gratis</span><span>20 soal | ±5 menit</span><span>Hasil langsung</span></div><div className="result-actions"><a className="button button-primary placement-start-cta" href="#placement-form">Mulai Tes</a></div></div><aside className="placement-outcomes"><p className="kicker">HASIL YANG KAMU DAPATKAN</p>{outcomes.map(([title, description], index) => <article key={title}><strong>{String(index + 1).padStart(2, "0")}</strong><div><h2>{title}</h2><p>{description}</p></div></article>)}</aside></section>
    <section className="public-section placement-how"><div className="public-section-head"><p className="kicker">CARA KERJA</p><p>20 soal | ±5 menit • hasil langsung.</p><h2>Tiga langkah sederhana sebelum melihat hasil</h2></div><div className="placement-step-grid">{steps.map(([number, label, title, description]) => <article key={number}><strong>{number}</strong><small>{label}</small><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="public-section placement-before placement-ready"><div><div className="public-section-head"><p className="kicker">SEBELUM MULAI</p><h2>Siap Cek Level Bahasa Jepangmu?</h2><p>Isi data singkat untuk memulai. Hasil dan rekomendasi level akan tampil langsung setelah tes selesai.</p></div></div><aside><h3>Agar hasil tes lebih akurat:</h3>{reminders.map(([icon, text]) => <article key={text}><span aria-hidden="true">{icon}</span><p>{text}</p></article>)}</aside></section>
    <section className="placement-form-card placement-form-focus" id="placement-form"><form className="public-form" action="/placement/question"><p className="kicker">DATA SEBELUM TES</p><label>Nama<input name="name" placeholder="Masukkan nama" value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Nomor WhatsApp<input name="whatsapp" placeholder="+62 8xx xxxx xxxx" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} required /></label><label>Target Ujian<select name="target" value={target} onChange={(event) => setTarget(event.target.value)} required><option value="" disabled>Pilih target ujian</option>{["Belum menentukan", "N5", "N4", "N3", "N2", "N1"].map((level) => <option key={level}>{level}</option>)}</select></label><label className="consent"><input type="checkbox" checked={privacy} onChange={(event) => setPrivacy(event.target.checked)} required /><span>Saya menyetujui pemrosesan data sesuai <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>.</span></label><label className="consent"><input type="checkbox" name="whatsappConsent" /><span>Saya bersedia menerima penjelasan hasil dan informasi program Hiru Academy melalui WhatsApp.</span></label><button className="button button-primary" type="submit" disabled={!valid}>Mulai Placement Test Gratis</button></form></section>
  </main></PublicPage>;
}
