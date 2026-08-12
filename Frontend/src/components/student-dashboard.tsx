import Link from "next/link";
import { StudentNavigation } from "@/components/student-navigation";
import type { DashboardData, DashboardFeature } from "@/lib/dashboard-mock";

const glyphs: Record<DashboardFeature["icon"] | "bell" | "book" | "home" | "journey" | "library" | "lock" | "menu" | "progress" | "settings", string> = {
  achievement: "✦", bell: "♢", book: "本", certificate: "✓", checkpoint: "問", community: "話", home: "⌂", journey: "道", library: "冊", lock: "⌑", menu: "☰", practice: "練", progress: "↗", replay: "▶", sensei: "先", settings: "⚙", tryout: "試",
};

function Glyph({ name }: { name: keyof typeof glyphs }) {
  return <span className="dash-glyph" aria-hidden="true">{glyphs[name]}</span>;
}

function FeatureCard({ feature, membership }: { feature: DashboardFeature; membership: DashboardData["membership"] }) {
  const locked = feature.state === "locked";
  const action = <>{locked ? "Lihat cara membuka" : feature.state === "readonly" ? "Buka mode baca" : "Buka fitur"}<b aria-hidden="true">→</b></>;
  return (
    <article className={`dash-feature state-${feature.state}`}>
      <div className="dash-feature-top"><span className="dash-feature-icon"><Glyph name={feature.icon} /></span><span className="dash-state">{locked && <Glyph name="lock" />}{feature.label}</span></div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      {feature.key === "tryout" ? <Link className="dash-feature-action" href={`/tryout?membership=${membership}`}>{action}</Link> : <span className="dash-feature-action">{action}</span>}
    </article>
  );
}

export function StudentDashboard({ data, previewEnabled }: { data: DashboardData; previewEnabled: boolean }) {
  const lockedCount = data.features.filter((feature) => feature.state === "locked").length;
  return (
    <div className="dashboard-shell student-shell">
      <StudentNavigation membership={data.membership} current="dashboard" />

      <div className="dash-main">
        <header className="dash-topbar">
          <div className="dash-top-actions"><button type="button" aria-label="Notifikasi"><Glyph name="bell" /></button><div className="dash-avatar">{data.user.initials}</div><div><strong>{data.user.displayName}</strong><span>{data.membershipLabel}</span></div></div>
        </header>

        <main className="dash-content">
          {previewEnabled && <nav className="preview-nav" aria-label="Preview membership"><span>Preview visual:</span><Link className={data.membership === "free" ? "selected" : ""} href="/dashboard?membership=free">Free</Link><Link className={data.membership === "lms" ? "selected" : ""} href="/dashboard?membership=lms">LMS</Link><Link className={data.membership === "sensei" ? "selected" : ""} href="/dashboard?membership=sensei">Sensei</Link><small>development only</small></nav>}

          <section className="dash-welcome"><div><p className="dash-kicker">Dashboard siswa</p><h1>Halo, {data.user.displayName}</h1><p>Siap melanjutkan perjalanan bahasa Jepangmu?</p></div><div className={`membership-badge membership-${data.membership}`}><span>✦</span>{data.membershipLabel}</div></section>

          <section className="dash-overview">
            <article className="continue-card"><div className="continue-copy"><span className="dash-chip"><Glyph name="book" />Lanjutkan perjalanan</span><p>{data.journey.levelLabel}</p><h2>{data.journey.chapterLabel}</h2><small>{data.journey.progressLabel}</small><Link className="continue-button" href={`/journey?membership=${data.membership}`}>{data.journey.nextActivity}<b aria-hidden="true">→</b></Link></div><div className="continue-art" aria-hidden="true"><span className="sun-mini" /><span className="mountain-mini" /><span className="gate-mini"><i /><b /><em /><strong /></span><span className="kana-mini">進</span></div></article>
            <article className="journey-card"><div className="journey-card-head"><span>Journey aktif</span><Glyph name="journey" /></div><div className="journey-path"><i className="done">✓</i><span /><i className="current">日</i><span /><i>次</i></div><h3>Teruskan langkah berikutnya</h3><p>Status progress akan mengikuti aktivitas yang benar-benar selesai.</p></article>
          </section>

          <section className="dash-section-head"><div><p className="dash-kicker">Akses belajarmu</p><h2>Fitur utama</h2></div>{lockedCount > 0 && <span>{lockedCount} fitur terkunci</span>}</section>
          <section className="dash-feature-grid" aria-label="Fitur berdasarkan membership">{data.features.map((feature) => <FeatureCard feature={feature} membership={data.membership} key={feature.key} />)}</section>

          {lockedCount > 0 && <section className="upgrade-card"><div className="upgrade-mark" aria-hidden="true">開</div><div><p className="dash-kicker">Buka lebih banyak pengalaman</p><h2>Belajar lebih jauh saat kamu siap.</h2><p>Fitur terkunci tetap terlihat agar manfaat membership berikutnya mudah dipahami.</p></div><Link href="/#program">Lihat pilihan belajar <span aria-hidden="true">→</span></Link></section>}
        </main>
      </div>
    </div>
  );
}
