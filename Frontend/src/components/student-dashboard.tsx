import Link from "next/link";
import { LuArrowRight, LuAward, LuBell, LuCircleCheck, LuClipboardCheck, LuDumbbell, LuLibrary, LuMessageCircleQuestion, LuMessagesSquare, LuRoute, LuRotateCcw } from "react-icons/lu";
import type { IconType } from "react-icons";
import { StudentNavigation } from "@/components/student-navigation";
import type { DashboardData, DashboardIcon } from "@/lib/dashboard-mock";

const glyphs: Record<DashboardIcon | "bell", IconType> = {
  achievement: LuAward,
  bell: LuBell,
  certificate: LuCircleCheck,
  checkpoint: LuClipboardCheck,
  community: LuMessagesSquare,
  journey: LuRoute,
  library: LuLibrary,
  practice: LuDumbbell,
  replay: LuRotateCcw,
  sensei: LuMessageCircleQuestion,
  tryout: LuClipboardCheck,
};

function Glyph({ name }: { name: keyof typeof glyphs }) {
  const Icon = glyphs[name];
  return <span className="dash-glyph" aria-hidden="true"><Icon /></span>;
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
          <section className="dash-welcome"><h1>{config.heading}</h1></section>
          <section className="lms-continue sensei-continue"><div><p className="dash-kicker">{config.continue.label}</p><h2>{config.continue.title}</h2><p>{config.continue.description}</p><div className="continue-actions"><Link className="continue-button" href={config.continue.primaryHref}>{config.continue.primary}<b aria-hidden="true"><LuArrowRight /></b></Link></div></div><div className="continue-progress"><div><span>Progress belajar</span><strong>{config.continue.progress}</strong></div><div className="continue-progress-track" role="progressbar" aria-label="Progress belajar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={56}><i /></div><small>{config.continue.title}</small></div></section>
          <section className="dashboard-summary"><div><p className="dash-kicker">RINGKASAN</p><h2>Progres belajarmu</h2></div><div className="sensei-progress-grid" aria-label="Ringkasan progres">{config.progressSummary.map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}</div></section>
          <section className="lms-section-head"><p className="dash-kicker">AKSES CEPAT</p><h2>Buka fitur belajar</h2></section>
          <section className="lms-quick-grid" aria-label="Akses cepat">{config.quickActions.map((action) => { const content = <><Glyph name={action.icon} /><span><strong>{action.title}</strong><small>{action.detail}</small></span></>; return action.href ? <Link href={action.href} key={action.title}>{content}</Link> : <span className="unavailable" aria-disabled="true" key={action.title}>{content}</span>; })}</section>
        </main>
      </div>
    </div>
  );
}
