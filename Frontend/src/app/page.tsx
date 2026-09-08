import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";
import { LandingMotion } from "@/components/landing-motion";
import { PublicPage } from "@/components/public-shell";
import { SenseiGrid } from "@/components/sensei-grid";
import { testimonials } from "@/lib/public-mock";

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
  { icon: "target" as const, badge: "PALING LENGKAP", title: "Belajar dengan Sensei", popular: true, description: "Dapatkan seluruh fasilitas LMS sekaligus bimbingan langsung dari Sensei agar belajarmu lebih terarah dan konsisten.", points: ["Semua fasilitas LMS Belajar Mandiri", "Live class melalui Zoom bersama Sensei", "Rekaman kelas dan kesempatan bertanya"], cta: "Gabung Kelas Sensei →", href: "/register" },
];

const proofItems = [
  { icon: "users" as const, value: "2300+", label: "Alumni" },
  { icon: "check" as const, value: "98%", label: "Kelulusan" },
  { icon: "target" as const, value: "Try Out & Evaluasi Rutin" },
];

const learningFlow = [
  { icon: "compass" as const, eyebrow: "01 — Placement Test", title: "Temukan Level yang Tepat", description: "Ketahui kemampuan awalmu dan dapatkan rekomendasi program yang sesuai dengan target belajarmu.", cta: "Cek Level Sekarang →", href: "/placement" },
  { icon: "layers" as const, eyebrow: "02 — Belajar Terstruktur", title: "Belajar Secara Bertahap", description: "Ikuti materi sesuai urutan melalui video pembelajaran, modul, flashcard, latihan, dan checkpoint.", cta: "Mulai Belajar →", href: "/dashboard" },
  { icon: "target" as const, eyebrow: "03 — Try Out JLPT", title: "Ukur Kesiapanmu", description: "Kerjakan simulasi JLPT, lihat hasilnya, lalu pelajari pembahasan untuk mengetahui bagian yang perlu ditingkatkan.", cta: "Ikuti Try Out →", href: "/tryout" },
  { icon: "check" as const, eyebrow: "04 — Sertifikat", title: "Dapatkan Bukti Pencapaian", description: "Selesaikan program dan evaluasi akhir untuk mendapatkan sertifikat sebagai bukti pencapaian belajarmu.", cta: "Lihat Ketentuan →", href: null },
];

const lmsPreviews = [
  { key: "dashboard", icon: "layers" as const, label: "Dashboard" },
  { key: "journey", icon: "compass" as const, label: "Learning Journey" },
  { key: "lesson", icon: "play" as const, label: "Materi / Video Lesson" },
  { key: "flashcard", icon: "book" as const, label: "Flashcard" },
  { key: "evaluation", icon: "target" as const, label: "Try Out / Evaluasi" },
];

function LmsPreview({ preview }: { preview: (typeof lmsPreviews)[number] }) {
  return <figure className={`lms-preview lms-preview-${preview.key}`} aria-label={`Tampilan LMS Hiru Academy: ${preview.label}`} role="img"><figcaption><Icon name={preview.icon} width="18" height="18" />{preview.label}</figcaption><div className="lms-browser" aria-hidden="true"><div className="lms-browser-bar"><i /><i /><i /><span /></div><div className="lms-screen"><aside><b>H</b><i /><i /><i /><i /></aside><div className="lms-screen-main"><header><span /><b /></header><div className="lms-preview-feature"><strong /><span /></div><div className="lms-preview-grid"><i /><i /><i /></div></div></div></div></figure>;
}

function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <a className={dark ? "button button-dark" : "button button-primary"} href={href}>{children}<Icon name="arrow" width="20" height="20" /></a>;
}

export default function Home() {
  return (
    <PublicPage>
      <main id="top" data-landing-motion>
        <LandingMotion />
        <section className="hero" data-reveal><div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" /><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow"><Icon name="sparkle" width="17" height="17" /> LIVE CLASS + LMS DALAM SATU ALUR BELAJAR</p><h1>Belajar Bahasa Jepang Terarah dari <span>Dasar sampai Siap JLPT</span></h1><p className="hero-lead">Placement test, learning journey, flashcard, latihan, try out, komunitas, dan kelas bersama Sensei tersedia dalam satu pengalaman belajar yang konsisten.</p><div className="hero-actions"><ArrowLink href="/register">Coba Gratis</ArrowLink><a className="text-link" href="#program"><Icon name="play" width="21" height="21" /> Lihat Program</a></div></div><div className="hero-visual" aria-label="Ilustrasi perjalanan belajar bahasa Jepang"><div className="sun" aria-hidden="true" /><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="learning-card card-kanji"><small>Hari ini</small><strong><ruby>学<rt>まな</rt></ruby>ぶ</strong><span>belajar</span></div><div className="learning-card card-progress"><span className="mini-icon"><Icon name="layers" width="19" height="19" /></span><div><small>Perjalananmu</small><strong>Terus bertumbuh</strong></div><div className="progress"><i /></div></div><div className="torii" aria-hidden="true"><i /><b /><span /><em /></div><div className="hill hill-back" /><div className="hill hill-front" /><div className="floating-note note-one">あ</div><div className="floating-note note-two">夢</div></div></div></section>

        <aside className="proof-strip" aria-label="Pencapaian HIRU Academy" data-reveal><div className="container proof-strip-grid">{proofItems.map((item, index) => <div className="proof-item reveal-item" key={item.value} style={{ "--reveal-index": index } as React.CSSProperties}><span><Icon name={item.icon} width="24" height="24" /></span><p><strong {...(item.label ? { "data-counter": item.value.replace(/\D/g, ""), "data-suffix": item.value.replace(/\d/g, "") } : {})}>{item.value}</strong>{item.label && <small>{item.label}</small>}</p></div>)}</div></aside>

        <section className="section" id="program" data-reveal><div className="container"><div className="section-heading"><h2>Pilih cara belajar yang paling sesuai</h2><p>Pilih cara belajar, lalu tentukan level N5–N1 secara bebas. Harga dan akses mengikuti konfigurasi sistem.</p></div><div className="offer-grid">{offers.map((offer, index) => <article className="offer-card reveal-item" key={offer.title} style={{ "--reveal-index": index } as React.CSSProperties}><div className={`offer-icon offer-icon-${index + 1}`}><Icon name={offer.icon} width="28" height="28" /></div><span className="offer-badge">{offer.badge}</span>{offer.popular && <span className="popular-badge">Populer</span>}<h3>{offer.title}</h3><p>{offer.description}</p><ul className="offer-points">{offer.points.map((point) => <li key={point}>{point}</li>)}</ul><a href={offer.href}>{offer.cta}</a></article>)}</div></div></section>

        <section className="section soft-section" id="cara-belajar" data-reveal><div className="container"><div className="section-heading"><h2>Belajar Terarah dari Menentukan Level hingga Mencapai Target</h2><p>Mulai dari mengetahui kemampuan awal, mempelajari materi secara bertahap, hingga mengukur kesiapan menghadapi JLPT—semuanya tersedia dalam satu alur belajar yang terstruktur.</p></div><div className="offer-grid learning-flow-grid">{learningFlow.map((item, index) => <article className="offer-card reveal-item" key={item.title} style={{ "--reveal-index": Math.min(index, 2) } as React.CSSProperties}><div className={`offer-icon offer-icon-${index + 1}`}><Icon name={item.icon} width="28" height="28" /></div><span className="card-number">{item.eyebrow.replace(" — ", " · ")}</span><h3>{item.title}</h3><p>{item.description}</p>{item.href ? <a href={item.href}>{item.cta}</a> : <span className="footer-disabled offer-disabled" aria-disabled="true">{item.cta}</span>}</article>)}</div></div></section>

        <section className="section lms-showcase" data-reveal><div className="container section-heading"><h2>Bukan Hanya Belajar Saat Zoom</h2><p>Lanjutkan belajar melalui materi, rekaman, latihan, dan evaluasi yang tersimpan di LMS Hiru Academy.</p></div><div className="lms-showcase-viewport"><div className="lms-showcase-track"><div className="lms-showcase-group">{lmsPreviews.map((preview) => <LmsPreview key={preview.key} preview={preview} />)}</div><div className="lms-showcase-group lms-showcase-copy" aria-hidden="true">{lmsPreviews.map((preview) => <LmsPreview key={preview.key} preview={preview} />)}</div></div></div></section>

        <section className="section landing-sensei" data-reveal><div className="container"><div className="section-heading"><h2>Belajar Bersama Sensei Berpengalaman</h2></div><SenseiGrid limit={3} reveal /><div className="landing-sensei-action"><Link className="button button-primary" href="/sensei">Lihat Semua Sensei</Link></div></div></section>

        <section className="section landing-testimonials" data-reveal><div className="container"><div className="section-heading"><p className="kicker">CERITA PEMBELAJAR</p><h2>Cerita dari Pembelajar Hiru Academy</h2></div><div className="testimonial-grid">{testimonials.map((testimonial, index) => <article className="testimonial-card reveal-item" key={testimonial.name} style={{ "--reveal-index": index } as React.CSSProperties}><div className="testimonial-avatar">{testimonial.avatarSrc ? <Image alt={`Foto ${testimonial.name}`} fill sizes="64px" src={testimonial.avatarSrc} /> : <span aria-hidden="true">{testimonial.initials}</span>}</div><blockquote>{testimonial.quote}</blockquote><footer><strong>{testimonial.name}</strong><small>{testimonial.membership}</small></footer></article>)}</div><div className="landing-testimonials-action"><Link className="button button-primary" href="/testimoni">Lihat lebih banyak</Link></div></div></section>

        <section className="final-cta" id="tentang" data-reveal><div className="container"><div className="cta-panel"><div className="cta-pattern" aria-hidden="true">あ <span>日</span> 語</div><h2>Belum tahu harus mulai dari level mana?</h2><p>Belum yakin levelmu? Gunakan Placement Test. Sudah punya target? Coba Chapter 1 gratis pada level pilihanmu.</p><ArrowLink href="/placement">Mulai Sekarang</ArrowLink></div></div></section>
      </main>
    </PublicPage>
  );
}
