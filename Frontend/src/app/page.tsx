import type { SVGProps } from "react";

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
  { icon: "book" as const, label: "CHAPTER 01", badge: "COBA GRATIS", title: "Free Member", description: "Chapter 1 gratis pada N1-N5, progress tersimpan, dan community read-only.", points: ["Chapter 1 gratis pada N1-N5", "Progress belajar tetap tersimpan", "Community tersedia read-only"] },
  { icon: "users" as const, label: "CHAPTER 01", badge: "DIREKOMENDASIKAN", title: "Belajar Mandiri", description: "Journey penuh, latihan, try out, review, sertifikat, dan community write.", points: ["Journey dan latihan penuh", "Try Out dan review jawaban", "Community write dan sertifikat"] },
  { icon: "target" as const, label: "CHAPTER 01", badge: "LMS + ZOOM", title: "Belajar dengan Sensei", description: "Semua fitur LMS ditambah cohort, jadwal Zoom, Sensei, dan replay.", points: ["Semua fitur Belajar Mandiri", "Cohort dan kelas bersama Sensei", "Replay dan Tanya Sensei"] },
];

const learningFlow = [
  { icon: "compass" as const, title: "Placement Test", description: "Temukan level awal melalui soal bertahap dan rekomendasi program." },
  { icon: "layers" as const, title: "Learning Journey", description: "Ikuti chapter, video, quiz modul, flashcard, audio, reading, dan checkpoint." },
  { icon: "target" as const, title: "Try Out JLPT", description: "Kerjakan simulasi terstruktur, lihat hasil, lalu review jawaban." },
];

function Brand() {
  return <a className="brand" href="#top" aria-label="Hiru Academy"><span className="brand-mark" aria-hidden="true">日</span><span>Hiru <b>Academy</b></span></a>;
}

function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <a className={dark ? "button button-dark" : "button button-primary"} href={href}>{children}<Icon name="arrow" width="20" height="20" /></a>;
}

export default function Home() {
  return (
    <div id="top">
      <header className="site-header"><div className="container nav-wrap"><Brand /><nav className="desktop-nav" aria-label="Navigasi utama"><a href="#program">Program</a><a href="/register">Coba Gratis</a><a href="#placement">Placement Test</a><a href="#tentang">Testimoni</a><a href="#">Blog</a></nav><a className="nav-cta" href="/login">Login <Icon name="arrow" width="18" height="18" /></a><details className="mobile-menu"><summary aria-label="Buka menu"><span /><span /><span /></summary><nav aria-label="Navigasi seluler"><a href="#program">Program</a><a href="/register">Coba Gratis</a><a href="#placement">Placement Test</a><a href="#tentang">Testimoni</a><a href="#">Blog</a><a href="/login">Login</a></nav></details></div></header>

      <main>
        <section className="hero"><div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" /><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow"><Icon name="sparkle" width="17" height="17" /> PLATFORM BELAJAR BAHASA JEPANG #1</p><h1>Belajar Bahasa Jepang Terarah dari <span>Dasar sampai Siap JLPT</span></h1><p className="hero-lead">Placement test, learning journey, flashcard, latihan, try out, komunitas, dan kelas bersama Sensei tersedia dalam satu pengalaman belajar yang konsisten.</p><div className="hero-actions"><ArrowLink href="/register">Coba Gratis</ArrowLink><a className="text-link" href="#program"><Icon name="play" width="21" height="21" /> Lihat Program</a></div><ul className="hero-checks"><li><span><Icon name="check" width="15" height="15" /></span>Tanpa akun untuk mulai placement</li><li><span><Icon name="check" width="15" height="15" /></span>Hasil langsung dan rekomendasi level</li></ul></div><div className="hero-visual" aria-label="Ilustrasi perjalanan belajar bahasa Jepang"><div className="sun" aria-hidden="true" /><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="learning-card card-kanji"><small>Hari ini</small><strong><ruby>学<rt>まな</rt></ruby>ぶ</strong><span>belajar</span></div><div className="learning-card card-progress"><span className="mini-icon"><Icon name="layers" width="19" height="19" /></span><div><small>Perjalananmu</small><strong>Terus bertumbuh</strong></div><div className="progress"><i /></div></div><div className="torii" aria-hidden="true"><i /><b /><span /><em /></div><div className="hill hill-back" /><div className="hill hill-front" /><div className="floating-note note-one">あ</div><div className="floating-note note-two">夢</div></div></div></section>

        <section className="section" id="program"><div className="container"><div className="section-heading"><h2>Pilih cara belajar yang paling sesuai</h2><p>Pilih cara belajar, lalu tentukan level N1-N5 secara bebas. Harga dan akses mengikuti konfigurasi sistem.</p></div><div className="offer-grid">{offers.map((offer, index) => <article className="offer-card" key={offer.title}><div className={`offer-icon offer-icon-${index + 1}`}><Icon name={offer.icon} width="28" height="28" /></div><span className="card-number">{offer.label}</span><span className="offer-badge">{offer.badge}</span><h3>{offer.title}</h3><p>{offer.description}</p><ul className="offer-points">{offer.points.map((point) => <li key={point}>{point}</li>)}</ul><a href="/dashboard">Lanjutkan belajar →</a></article>)}</div></div></section>

        <section className="section soft-section" id="cara-belajar"><div className="container"><div className="section-heading"><h2>Satu alur belajar dari placement sampai sertifikat</h2><p>Setiap langkah dirancang agar pengguna selalu mengetahui progres, akses, dan tindakan berikutnya.</p></div><div className="offer-grid">{learningFlow.map((item, index) => <article className="offer-card" key={item.title}><div className={`offer-icon offer-icon-${index + 1}`}><Icon name={item.icon} width="28" height="28" /></div><span className="card-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><a href="#placement">Lanjutkan belajar →</a></article>)}</div></div></section>

        <section className="section placement" id="placement"><div className="container placement-card"><div className="placement-icon"><Icon name="compass" width="48" height="48" /></div><div><h2>Belum tahu harus mulai dari level mana?</h2><p>Belum yakin levelmu? Gunakan Placement Test. Sudah punya target? Coba Chapter 1 gratis pada level pilihanmu.</p></div><ArrowLink href="/register" dark>Mulai Sekarang</ArrowLink></div></section>

        <section className="final-cta" id="tentang"><div className="container"><div className="cta-panel"><div className="cta-pattern" aria-hidden="true">あ <span>日</span> 語</div><h2>Belum tahu harus mulai dari level mana?</h2><p>Belum yakin levelmu? Gunakan Placement Test. Sudah punya target? Coba Chapter 1 gratis pada level pilihanmu.</p><ArrowLink href="/register">Mulai Sekarang</ArrowLink></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div><Brand /></div><nav aria-label="Navigasi footer"><a href="#program">Program</a><a href="#placement">Placement Test</a><a href="#tentang">Testimoni</a><a href="#">Blog</a><a href="#">Kebijakan Privasi</a></nav><div className="footer-note"><span>Hiru Academy</span></div></div><div className="container copyright">© 2026 Hiru Academy. Belajar Jepang dengan arah yang jelas.</div></footer>
    </div>
  );
}
