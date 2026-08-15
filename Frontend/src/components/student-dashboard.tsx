import Link from "next/link";
import { StudentNavigation } from "@/components/student-navigation";
import type { DashboardData, DashboardIcon } from "@/lib/dashboard-mock";

const glyphs: Record<DashboardIcon | "bell", string> = {
  achievement: "✦", bell: "♢", certificate: "証", checkpoint: "✓", community: "人", journey: "道", library: "本", practice: "練", replay: "再", sensei: "先", tryout: "試",
};

function Glyph({ name }: { name: keyof typeof glyphs }) {
  return <span className="dash-glyph" aria-hidden="true">{glyphs[name]}</span>;
}

export function StudentDashboard({ data, previewEnabled }: { data: DashboardData; previewEnabled: boolean }) {
  const config = data.config;
  return (
    <div className="dashboard-shell student-shell">
      <StudentNavigation membership={data.membership} current="dashboard" />
      <div className="dash-main">
        <header className="dash-topbar"><div className="dash-top-actions"><button type="button" aria-label="Notifikasi"><Glyph name="bell" /></button><div className="dash-avatar">{data.user.initials}</div><div><strong>{data.user.displayName}</strong><span>{data.membershipLabel}</span></div></div></header>
        <main className="dash-content">
          {previewEnabled && <nav className="preview-nav" aria-label="Preview membership"><span>Preview visual:</span><Link className={data.membership === "free" ? "selected" : ""} href="/dashboard?membership=free">Free</Link><Link className={data.membership === "lms" ? "selected" : ""} href="/dashboard?membership=lms">LMS</Link><Link className={data.membership === "sensei" ? "selected" : ""} href="/dashboard?membership=sensei">Sensei</Link><small>development only</small></nav>}
          <section className="dash-welcome"><div><p className="dash-kicker">{config.eyebrow}</p><h1>{config.heading}</h1><p>{config.description}</p></div><div className={`membership-badge membership-${data.membership}`}><span>✦</span>{config.badge}</div></section>
          <section className="lms-continue sensei-continue"><div><p className="dash-kicker">{config.continue.label}</p><h2>{config.continue.title}</h2><p>{config.continue.description}</p><div className="continue-actions"><Link className="continue-button" href={config.continue.primaryHref}>{config.continue.primary}<b aria-hidden="true">→</b></Link><Link className="lms-secondary" href={config.continue.secondaryHref}>{config.continue.secondary}</Link></div></div><div className="continue-progress"><div><span>Progress belajar</span><strong>{config.continue.progress}</strong></div><div className="continue-progress-track" role="progressbar" aria-label="Progress belajar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={56}><i /></div><small>{config.continue.title}</small></div></section>
          <section className="lms-section-head"><p className="dash-kicker">AKSI CEPAT</p><h2>Akses yang paling sering digunakan</h2><p>Satu pola tindakan yang sama di seluruh jenis akun.</p></section>
          <section className="lms-quick-grid" aria-label="Aksi cepat">{config.quickActions.map((action) => { const content = <><Glyph name={action.icon} /><span><strong>{action.title}</strong><small>{action.detail}</small></span></>; return action.href ? <Link href={action.href} key={action.title}>{content}</Link> : <span className="unavailable" aria-disabled="true" key={action.title}>{content}</span>; })}</section>
          <section className="lms-section-head"><p className="dash-kicker">STATUS ENTITLEMENT</p><h2>Fitur dan hak aksesmu</h2><p>Semua fitur tetap terlihat; status ditentukan plan, level, dan backend.</p></section>
          <section className="lms-entitlement-grid" aria-label="Status entitlement">{config.entitlements.map((item) => <article className={`state-${item.state}`} key={item.title}><span className="entitlement-status"><i aria-hidden="true">{item.state === "locked" ? "⌑" : item.state === "available" ? "✓" : "•"}</i>{item.status}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</section>
          <section className="lms-section-head"><p className="dash-kicker">PROGRES</p><h2>Aktivitas dan motivasi</h2><p>Nilai aktual mengikuti aktivitas yang tersimpan di backend.</p></section>
          <section className="sensei-progress-grid" aria-label="Ringkasan progres">{config.progressSummary.map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}</section>
          <section className="dashboard-announcement"><span aria-hidden="true">!</span><div><h2>Pengumuman</h2><p>{config.announcement}</p></div></section>
        </main>
      </div>
    </div>
  );
}
