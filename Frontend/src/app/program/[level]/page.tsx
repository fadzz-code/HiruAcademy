import Link from "next/link";
import { PublicPage } from "@/components/public-shell";
import { levelCatalog, programComparison, programFacilities } from "@/lib/public-mock";

export function generateStaticParams() { return levelCatalog.map((level) => ({ level: level.code.toLowerCase() })); }

export default async function ProgramDetailPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const item = levelCatalog.find((entry) => entry.code === level.toUpperCase()) ?? levelCatalog[1];
  return <PublicPage active="Program"><main className="public-main program-detail-page">
    <section className="program-detail-hero"><div className="program-detail-copy"><p className="kicker">CONTOH LEVEL TERPILIH • JLPT {item.code}</p><h1>Pelajari level targetmu melalui journey yang terstruktur</h1><p>Contoh ini menampilkan JLPT {item.code}. Struktur konten menyesuaikan level N1–N5 yang dipilih pengguna.</p><div className="program-detail-pills"><span>Level {item.code}</span><span>Journey Lengkap</span><span>JLPT Ready</span></div><div className="result-actions"><Link className="button button-primary" href="/program">Pilih Program</Link><Link className="button button-dark" href="/placement">Coba Placement</Link></div></div><div className="program-detail-visual" aria-label={`Visual program JLPT ${item.code}`}><span className="program-detail-sun" /><span className="program-detail-kanji">学</span><strong>{item.code}</strong><small>{item.title}</small><i /><b /></div></section>
    <section className="public-section facilities-section"><div className="public-section-head"><h2>Fasilitas belajar lengkap</h2><p>Setiap chapter menggabungkan pemahaman materi, latihan aktif, dan evaluasi.</p></div><div className="facility-grid">{programFacilities.map((facility, index) => <article className={index > 3 ? "facility-card wide" : "facility-card"} key={facility.title}><span aria-hidden="true">{facility.icon}</span><div><h3>{facility.title}</h3><p>{facility.description}</p></div></article>)}</div></section>
    <section className="public-section"><div className="learning-flow-card"><div><p className="kicker">ALUR BELAJAR</p><h2>Video → Modul → Latihan → Checkpoint → Flashcard → Try Out</h2><p>Free Member membuka Chapter 1 pada setiap N1–N5. Plan berbayar membuka seluruh chapter pada level yang dibeli.</p></div><aside><span>Progress dari backend</span><i><b /></i><small>Progress visual fixture</small></aside></div></section>
    <section className="public-section comparison-section"><div className="public-section-head"><p className="kicker">PERBANDINGAN PLAN</p><h2>Pilih pengalaman belajar yang sesuai</h2></div><div className="comparison-grid">{programComparison.map((plan) => <article key={plan.title}><span>{plan.badge}</span><h3>{plan.title}</h3><p>{plan.description}</p></article>)}</div></section>
  </main></PublicPage>;
}
