import Link from "next/link";
import { PublicPage } from "@/components/public-shell";

const outcomes = [
  ["Analisis 4 area", "Bunpou, Moji Goi, Dokkai, dan Choukai."],
  ["Rekomendasi level", "N5, N4, atau level lain sesuai hasil tes."],
  ["Rekomendasi program", "LMS + Sensei utama, Mandiri sebagai alternatif."],
];
const steps = [
  ["01", "JAWAB SOAL", "Kerjakan soal bertahap", "Soal dibagi per section agar lebih mudah dipahami dan ditinjau."],
  ["02", "LIHAT PROGRESS", "Pantau kemajuan pengerjaan", "Progress dan jawaban tersimpan selama sesi placement berlangsung."],
  ["03", "DAPATKAN HASIL", "Lihat rekomendasi level", "Hasil menampilkan analisis empat area, level, dan rekomendasi program."],
];

export default function PlacementPage() {
  return <PublicPage active="Placement Test"><main className="public-main placement-page">
    <section className="placement-hero-card"><div className="placement-hero-copy"><p className="kicker">PLACEMENT TEST</p><p className="placement-sublabel">Cari titik mulai yang lebih tepat</p><h1>Kenali levelmu sebelum memulai journey</h1><p>Isi Nama, WhatsApp, dan Target Ujian, lalu jawab 20 soal sekitar 5 menit. Tidak perlu login untuk memulai.</p><div className="public-pills"><span>Tanpa login</span><span>20 soal | ±5 menit</span><span>Hasil langsung</span></div><div className="result-actions"><a className="button button-primary" href="#placement-form">Isi Data &amp; Mulai Tes</a><Link className="button button-dark" href="/program">Lihat Program</Link></div></div><aside className="placement-outcomes"><p className="kicker">HASIL YANG KAMU DAPATKAN</p>{outcomes.map(([title, description], index) => <article key={title}><strong>{String(index + 1).padStart(2, "0")}</strong><div><h2>{title}</h2><p>{description}</p></div></article>)}</aside></section>
    <section className="public-section placement-how"><div className="public-section-head"><p className="kicker">CARA KERJA</p><p>20 soal | ±5 menit • hasil langsung.</p><h2>Tiga langkah sederhana sebelum melihat hasil</h2></div><div className="placement-step-grid">{steps.map(([number, label, title, description]) => <article key={number}><strong>{number}</strong><small>{label}</small><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="public-section placement-before"><div><div className="public-section-head"><p className="kicker">SEBELUM MULAI</p><h2>Pastikan sesi placement berjalan lancar</h2></div>{[["▤", "Siapkan data dasar", "Nama, WhatsApp, dan Target Ujian diisi sebelum tes dimulai."], ["✎", "Kerjakan secara mandiri", "Jawaban digunakan untuk menentukan rekomendasi level."], ["⌁", "Gunakan koneksi stabil", "Jawaban tersimpan, tetapi koneksi stabil tetap disarankan."]].map(([icon, title, description]) => <article key={title}><span aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div><aside><article><p className="kicker">WAKTU &amp; HASIL</p><h3>20 soal | ±5 menit</h3><p>Hiru Quick Check terdiri dari 20 soal, sekitar 5 menit, dengan hasil langsung setelah tes selesai.</p></article><article><p className="kicker">DATA &amp; PRIVASI</p><h3>Digunakan untuk hasil dan tindak lanjut</h3><p>Data lead tidak menggantikan akun. Akses belajar tetap mengikuti registrasi dan membership.</p></article></aside></section>
    <section className="placement-form-card" id="placement-form"><div><p className="kicker">DATA SEBELUM TES</p><h2>Isi data untuk hasil dan follow-up</h2><p>Data digunakan untuk menampilkan hasil dan follow-up Hiru Academy.</p></div><form className="public-form" action="/placement/question"><label>Nama Lengkap<input name="name" placeholder="Masukkan nama lengkap" required /></label><label>Nomor WhatsApp<input name="whatsapp" placeholder="+62 8xx xxxx xxxx" required /></label><label>Target Ujian<select name="target" defaultValue="" required><option value="" disabled>Pilih N1–N5</option>{["N1", "N2", "N3", "N4", "N5"].map((level) => <option key={level}>{level}</option>)}</select></label><label className="consent"><input type="checkbox" required /> Saya menyetujui data digunakan untuk hasil Placement Test dan tindak lanjut.</label><button className="button button-primary" type="submit">Mulai Placement Test</button></form></section>
  </main></PublicPage>;
}
