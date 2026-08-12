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
  { icon: "book" as const, title: "Belajar Mandiri", text: "Pelajari materi secara bertahap melalui video, modul, flashcard, latihan, dan perjalanan belajar yang terstruktur." },
  { icon: "users" as const, title: "Belajar dengan Sensei", text: "Gabungkan pengalaman LMS dengan konteks kelas, jadwal, replay, dan ruang bertanya kepada Sensei." },
  { icon: "target" as const, title: "Persiapan Terarah", text: "Kenali posisi belajarmu, lanjutkan materi yang relevan, dan pantau perkembangan menuju target bahasa Jepang." },
];

const highlights = [
  "Satu perjalanan belajar yang jelas",
  "Materi dan latihan dalam satu tempat",
  "Akses sesuai kebutuhan belajarmu",
];

function Brand() {
  return <a className="brand" href="#top" aria-label="HIRU Academy, kembali ke atas"><span className="brand-mark" aria-hidden="true">日</span><span>HIRU <b>Academy</b></span></a>;
}

function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <a className={dark ? "button button-dark" : "button button-primary"} href={href}>{children}<Icon name="arrow" width="20" height="20" /></a>;
}

export default function Home() {
  return (
    <div id="top">
      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />
          <nav className="desktop-nav" aria-label="Navigasi utama">
            <a href="#program">Program</a><a href="#cara-belajar">Cara Belajar</a><a href="#placement">Placement Test</a><a href="#tentang">Tentang HIRU</a>
          </nav>
          <a className="nav-cta" href="/login">Masuk <Icon name="arrow" width="18" height="18" /></a>
          <details className="mobile-menu"><summary aria-label="Buka menu"><span /><span /><span /></summary><nav aria-label="Navigasi seluler"><a href="#program">Program</a><a href="#cara-belajar">Cara Belajar</a><a href="#placement">Placement Test</a><a href="#tentang">Tentang HIRU</a></nav></details>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><Icon name="sparkle" width="17" height="17" /> Belajar bahasa Jepang lebih terarah</p>
              <h1>Temukan ritme belajarmu, <span>tumbuh selangkah demi selangkah.</span></h1>
              <p className="hero-lead">HIRU Academy menyatukan materi, latihan, dan perjalanan belajar agar kamu selalu tahu harus mulai dari mana dan melangkah ke mana.</p>
              <div className="hero-actions"><ArrowLink href="#program">Jelajahi Program</ArrowLink><a className="text-link" href="#cara-belajar"><Icon name="play" width="21" height="21" /> Lihat cara belajar</a></div>
              <ul className="hero-checks">{highlights.map((item) => <li key={item}><span><Icon name="check" width="15" height="15" /></span>{item}</li>)}</ul>
            </div>

            <div className="hero-visual" aria-label="Ilustrasi perjalanan belajar bahasa Jepang">
              <div className="sun" aria-hidden="true" /><div className="cloud cloud-one" /><div className="cloud cloud-two" />
              <div className="learning-card card-kanji"><small>Hari ini</small><strong><ruby>学<rt>まな</rt></ruby>ぶ</strong><span>belajar</span></div>
              <div className="learning-card card-progress"><span className="mini-icon"><Icon name="layers" width="19" height="19" /></span><div><small>Perjalananmu</small><strong>Terus bertumbuh</strong></div><div className="progress"><i /></div></div>
              <div className="torii" aria-hidden="true"><i /><b /><span /><em /></div>
              <div className="hill hill-back" /><div className="hill hill-front" />
              <div className="floating-note note-one">あ</div><div className="floating-note note-two">夢</div>
            </div>
          </div>
        </section>

        <section className="section" id="program">
          <div className="container">
            <div className="section-heading"><p className="kicker">Pilihan cara belajar</p><h2>Belajar sesuai kebutuhanmu</h2><p>Mulai mengenal pengalaman HIRU, belajar mandiri, atau dapatkan konteks belajar bersama Sensei dalam satu keluarga produk yang konsisten.</p></div>
            <div className="offer-grid">{offers.map((offer, index) => <article className="offer-card" key={offer.title}><div className={`offer-icon offer-icon-${index + 1}`}><Icon name={offer.icon} width="28" height="28" /></div><span className="card-number">0{index + 1}</span><h3>{offer.title}</h3><p>{offer.text}</p><a href="#mulai">Pelajari pilihan <Icon name="arrow" width="18" height="18" /></a></article>)}</div>
          </div>
        </section>

        <section className="section soft-section" id="cara-belajar">
          <div className="container feature-grid">
            <div className="feature-art" aria-hidden="true"><div className="book-stack"><span /><span /><span /></div><div className="study-window"><i>進</i><b>一歩ずつ</b></div><div className="plant"><i /><i /><b /></div></div>
            <div className="feature-copy"><p className="kicker">Pengalaman belajar HIRU</p><h2>Satu tempat untuk belajar dengan lebih jelas</h2><p>Materi disusun agar aktivitas belajar terasa terhubung. Kamu dapat memahami konteks, berlatih, melihat perkembangan, lalu menentukan langkah berikutnya.</p><div className="feature-list"><div><span><Icon name="compass" width="22" height="22" /></span><p><b>Perjalanan terstruktur</b><small>Level, Chapter, dan aktivitas memberi arah yang mudah dipahami.</small></p></div><div><span><Icon name="layers" width="22" height="22" /></span><p><b>Aktivitas yang beragam</b><small>Video, modul, flashcard, audio, reading, dan latihan saling melengkapi.</small></p></div><div><span><Icon name="target" width="22" height="22" /></span><p><b>Progress yang bermakna</b><small>Perkembangan berasal dari penyelesaian aktivitas, bukan sekadar membuka halaman.</small></p></div></div></div>
          </div>
        </section>

        <section className="section placement" id="placement">
          <div className="container placement-card"><div className="placement-icon"><Icon name="compass" width="48" height="48" /></div><div><p className="kicker">Masih bingung mulai dari mana?</p><h2>Kenali titik awal belajarmu</h2><p>Placement Test membantu memberi gambaran kemampuan dan rekomendasi level agar pilihan programmu terasa lebih terarah.</p></div><ArrowLink href="#mulai" dark>Pelajari Placement Test</ArrowLink></div>
        </section>

        <section className="section proof" id="tentang">
          <div className="container proof-grid"><div><p className="kicker">Belajar tanpa kehilangan arah</p><h2>Dibuat untuk menemani proses, bukan menambah beban.</h2></div><blockquote><span aria-hidden="true">“</span><p>HIRU Academy dirancang sebagai pengalaman belajar yang modern, hangat, dan terstruktur—agar tantangan belajar bahasa Jepang terasa lebih mudah dijalani.</p><footer>Prinsip pengalaman HIRU Academy</footer></blockquote></div>
        </section>

        <section className="final-cta" id="mulai"><div className="container"><div className="cta-panel"><div className="cta-pattern" aria-hidden="true">あ <span>日</span> 語</div><p className="kicker">Mulai perjalananmu</p><h2>Langkah kecil hari ini bisa membuka jalan yang lebih besar.</h2><p>Jelajahi pilihan belajar HIRU Academy dan temukan pengalaman yang sesuai dengan tujuanmu.</p><ArrowLink href="/register">Buat Akun Belajar</ArrowLink></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div><Brand /><p>Platform belajar bahasa Jepang yang membantu setiap langkah terasa lebih terarah.</p></div><nav aria-label="Navigasi footer"><a href="#program">Program</a><a href="#cara-belajar">Cara Belajar</a><a href="#placement">Placement Test</a></nav><div className="footer-note"><span>HIRU Academy</span><small>Belajar. Bertumbuh. Melangkah.</small></div></div><div className="container copyright">© {new Date().getFullYear()} HIRU Academy.</div></footer>
    </div>
  );
}
