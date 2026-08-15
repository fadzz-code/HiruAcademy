import type { SVGProps } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

type IconName = "arrow" | "book" | "check" | "compass" | "layers" | "play" | "sparkle" | "target" | "users";

const icons: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  layers: <><path d="m12 3-9 5 9 5 9-5z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></>,
  sparkle: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2z" /><path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
};

function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>{icons[name]}</svg>;
}

const offers = [
  { icon: "book" as const, badge: "COBA GRATIS", title: "Mulai Gratis", description: "Coba pengalaman belajar di Hiru Academy sebelum memilih program yang paling cocok untukmu.", points: ["Akses materi pertama untuk level N5–N1", "Progres belajar tersimpan otomatis", "Lihat diskusi dan aktivitas komunitas"], cta: "Coba Gratis Sekarang →", href: "/register" },
  { icon: "users" as const, badge: "FLEKSIBEL & HEMAT", title: "LMS Belajar Mandiri", description: "Belajar bahasa Jepang secara terstruktur, kapan pun dan di mana pun sesuai kecepatanmu sendiri.", points: ["Akses materi dan latihan lengkap sesuai level", "Try out lengkap dengan pembahasan", "Sertifikat dan akses diskusi komunitas"], cta: "Pilih Paket Mandiri →", href: "/register" },
  { icon: "target" as const, badge: "PALING LENGKAP", title: "Kelas Bersama Sensei", description: "Dapatkan seluruh fasilitas LMS sekaligus bimbingan langsung dari Sensei agar belajarmu lebih terarah dan konsisten.", points: ["Semua fasilitas LMS Belajar Mandiri", "Live class melalui Zoom bersama Sensei", "Rekaman kelas dan kesempatan bertanya"], cta: "Gabung Kelas Sensei →", href: "/register" },
];

const learningFlow = [
  { icon: "compass" as const, eyebrow: "01 — Placement Test", title: "Temukan Level yang Tepat", description: "Ketahui kemampuan awalmu dan dapatkan rekomendasi program yang sesuai dengan target belajarmu.", cta: "Cek Level Sekarang →", href: "/placement" },
  { icon: "layers" as const, eyebrow: "02 — Belajar Terstruktur", title: "Belajar Secara Bertahap", description: "Ikuti materi sesuai urutan melalui video pembelajaran, modul, flashcard, latihan, dan checkpoint.", cta: "Mulai Belajar →", href: "/dashboard" },
  { icon: "target" as const, eyebrow: "03 — Try Out JLPT", title: "Ukur Kesiapanmu", description: "Kerjakan simulasi JLPT, lihat hasilnya, lalu pelajari pembahasan untuk mengetahui bagian yang perlu ditingkatkan.", cta: "Ikuti Try Out →", href: "/tryout" },
  { icon: "check" as const, eyebrow: "04 — Sertifikat", title: "Dapatkan Bukti Pencapaian", description: "Selesaikan program dan evaluasi akhir untuk mendapatkan sertifikat sebagai bukti pencapaian belajarmu.", cta: "Lihat Ketentuan →", href: null },
];

function Brand() {
  return <a className="brand" href="#top" aria-label="Hiru Academy"><BrandLogo /></a>;
}

function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <a className={dark ? "button button-dark" : "button button-primary"} href={href}>{children}<Icon name="arrow" width="20" height="20" /></a>;
}

export default function Home() {
  return (
    <div id="top">
      <header className="site-header"><div className="container nav-wrap"><Brand /><nav className="desktop-nav" aria-label="Navigasi utama"><Link href="/program">Program</Link><a href="/register">Coba Gratis</a><a href="/placement">Placement Test</a><span className="footer-disabled" aria-disabled="true">Testimoni</span><span className="footer-disabled" aria-disabled="true">Blog</span></nav><a className="nav-cta" href="/login">Login <Icon name="arrow" width="18" height="18" /></a><details className="mobile-menu"><summary aria-label="Buka menu"><span /><span /><span /></summary><nav aria-label="Navigasi seluler"><Link href="/program">Program</Link><a href="/register">Coba Gratis</a><a href="/placement">Placement Test</a><span className="footer-disabled" aria-disabled="true">Testimoni</span><span className="footer-disabled" aria-disabled="true">Blog</span><a href="/login">Login</a></nav></details></div></header>

      <main>
        <section className="hero"><div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" /><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow"><Icon name="sparkle" width="17" height="17" /> PLATFORM BELAJAR BAHASA JEPANG #1</p><h1>Belajar Bahasa Jepang Terarah dari <span>Dasar sampai Siap JLPT</span></h1><p className="hero-lead">Placement test, learning journey, flashcard, latihan, try out, komunitas, dan kelas bersama Sensei tersedia dalam satu pengalaman belajar yang konsisten.</p><div className="hero-actions"><ArrowLink href="/register">Coba Gratis</ArrowLink><a className="text-link" href="#program"><Icon name="play" width="21" height="21" /> Lihat Program</a></div></div><div className="hero-visual" aria-label="Ilustrasi perjalanan belajar bahasa Jepang"><div className="sun" aria-hidden="true" /><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="learning-card card-kanji"><small>Hari ini</small><strong><ruby>学<rt>まな</rt></ruby>ぶ</strong><span>belajar</span></div><div className="learning-card card-progress"><span className="mini-icon"><Icon name="layers" width="19" height="19" /></span><div><small>Perjalananmu</small><strong>Terus bertumbuh</strong></div><div className="progress"><i /></div></div><div className="torii" aria-hidden="true"><i /><b /><span /><em /></div><div className="hill hill-back" /><div className="hill hill-front" /><div className="floating-note note-one">あ</div><div className="floating-note note-two">夢</div></div></div></section>

        <section className="section" id="program"><div className="container"><div className="section-heading"><h2>Pilih cara belajar yang paling sesuai</h2><p>Pilih cara belajar, lalu tentukan level N5–N1 secara bebas. Harga dan akses mengikuti konfigurasi sistem.</p></div><div className="offer-grid">{offers.map((offer, index) => <article className="offer-card" key={offer.title}><div className={`offer-icon offer-icon-${index + 1}`}><Icon name={offer.icon} width="28" height="28" /></div><span className="offer-badge">{offer.badge}</span><h3>{offer.title}</h3><p>{offer.description}</p><ul className="offer-points">{offer.points.map((point) => <li key={point}>{point}</li>)}</ul><a href={offer.href}>{offer.cta}</a></article>)}</div></div></section>

        <section className="section soft-section" id="cara-belajar"><div className="container"><div className="section-heading"><h2>Belajar Terarah dari Menentukan Level hingga Mencapai Target</h2><p>Mulai dari mengetahui kemampuan awal, mempelajari materi secara bertahap, hingga mengukur kesiapan menghadapi JLPT—semuanya tersedia dalam satu alur belajar yang terstruktur.</p></div><div className="offer-grid learning-flow-grid">{learningFlow.map((item, index) => <article className="offer-card" key={item.title}><div className={`offer-icon offer-icon-${index + 1}`}><Icon name={item.icon} width="28" height="28" /></div><span className="card-number">{item.eyebrow.replace(" — ", " · ")}</span><h3>{item.title}</h3><p>{item.description}</p>{item.href ? <a href={item.href}>{item.cta}</a> : <span className="footer-disabled offer-disabled" aria-disabled="true">{item.cta}</span>}</article>)}</div></div></section>

        <section className="section placement" id="placement"><div className="container placement-card"><div className="placement-icon"><Icon name="compass" width="48" height="48" /></div><div><h2>Belum tahu harus mulai dari level mana?</h2><p>Belum yakin levelmu? Gunakan Placement Test. Sudah punya target? Coba Chapter 1 gratis pada level pilihanmu.</p></div><ArrowLink href="/placement" dark>Mulai Sekarang</ArrowLink></div></section>

        <section className="final-cta" id="tentang"><div className="container"><div className="cta-panel"><div className="cta-pattern" aria-hidden="true">あ <span>日</span> 語</div><h2>Belum tahu harus mulai dari level mana?</h2><p>Belum yakin levelmu? Gunakan Placement Test. Sudah punya target? Coba Chapter 1 gratis pada level pilihanmu.</p><ArrowLink href="/placement">Mulai Sekarang</ArrowLink></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div><Brand /></div><nav aria-label="Navigasi footer"><a href="#program">Program</a><a href="#placement">Placement Test</a><a href="#tentang">Testimoni</a><span className="footer-disabled" aria-disabled="true">Blog</span><span className="footer-disabled" aria-disabled="true">Kebijakan Privasi</span></nav><div className="footer-note"><span>Hiru Academy</span></div></div><div className="container copyright">© 2026 Hiru Academy. Belajar Jepang dengan arah yang jelas.</div></footer>
    </div>
  );
}
