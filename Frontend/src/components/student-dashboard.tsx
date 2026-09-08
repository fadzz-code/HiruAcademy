import Link from "next/link";
import {
  LuArrowRight,
  LuAward,
  LuBell,
  LuCircleCheck,
  LuClipboardCheck,
  LuDumbbell,
  LuFlame,
  LuFlag,
  LuHandshake,
  LuLibrary,
  LuMessageCircleQuestion,
  LuMessagesSquare,
  LuPlay,
  LuRotateCcw,
  LuRoute,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { StudentNavigation } from "@/components/student-navigation";
import type { DashboardData, DashboardIcon } from "@/lib/dashboard-mock";

const glyphs: Record<DashboardIcon | "bell", IconType> = {
  achievement: LuAward,
  affiliate: LuHandshake,
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
  return (
    <span className="dash-glyph" aria-hidden="true">
      <Icon />
    </span>
  );
}

export function StudentDashboard({
  data,
  previewEnabled,
}: {
  data: DashboardData;
  previewEnabled: boolean;
}) {
  const config = data.config;

  return (
    <div className="dashboard-shell student-shell">
      <StudentNavigation membership={data.membership} current="dashboard" />
      <div className="dash-main">
        <header className="dash-topbar">
          <div className="dash-top-actions">
            <button type="button" aria-label="Notifikasi">
              <Glyph name="bell" />
            </button>
            <div className="dash-avatar">{data.user.initials}</div>
            <div>
              <strong>{data.user.displayName}</strong>
              <span>{data.membershipLabel}</span>
            </div>
          </div>
        </header>

        <main className="dash-content">
          {previewEnabled && (
            <nav className="preview-nav" aria-label="Preview membership">
              <span>Preview visual:</span>
              <Link className={data.membership === "free" ? "selected" : ""} href="/dashboard?membership=free">
                Free
              </Link>
              <Link className={data.membership === "lms" ? "selected" : ""} href="/dashboard?membership=lms">
                LMS
              </Link>
              <Link className={data.membership === "sensei" ? "selected" : ""} href="/dashboard?membership=sensei">
                Sensei
              </Link>
              <small>development only</small>
            </nav>
          )}

          {/* 1. Greeting with Halo name, learning level, target JLPT (membership strictly only under profile/topbar) */}
          <section className="dash-welcome">
            <div>
              <h1>
                {config.greeting} <span aria-hidden="true">👋</span>
              </h1>
              <p className="dash-subgreeting">{config.subgreeting}</p>
            </div>
            <div className="dash-badge-group">
              <span className="dash-badge-level">{config.level}</span>
              <span className="dash-badge-target">
                <LuFlag aria-hidden="true" /> {config.target}
              </span>
            </div>
          </section>

          {/* 2. Continue Journey & Progress */}
          <div className="dashboard-bento">
            <section className="lms-continue sensei-continue">
              <div>
                <p className="dash-kicker">
                  <LuPlay aria-hidden="true" /> {config.continue.label}
                </p>
                <h2>{config.continue.title}</h2>
                <p>{config.continue.description}</p>
                <div className="continue-actions">
                  <Link className="continue-button" href={config.continue.primaryHref}>
                    {config.continue.primary}{" "}
                    <b aria-hidden="true">
                      <LuArrowRight />
                    </b>
                  </Link>
                  <span className="continue-time-tag">{config.continue.timeRemaining}</span>
                </div>
              </div>
              <div className="continue-progress">
                <div>
                  <span>Progress belajar</span>
                  <strong>{config.continue.progress}</strong>
                </div>
                <div
                  className="continue-progress-track"
                  role="progressbar"
                  aria-label="Progress belajar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={config.continue.progressPercent}
                >
                  <i style={{ width: `${config.continue.progressPercent}%` }} />
                </div>
                <small>{config.continue.detail}</small>
              </div>
            </section>

            <section className="dash-progress-card">
              <p className="dash-kicker">{config.continue.progressLabel}</p>
              <div className="dash-progress-ring">
                <svg viewBox="0 0 36 36" className="dash-ring-svg">
                  <path
                    className="dash-ring-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="dash-ring-fill"
                    strokeDasharray={`${config.continue.progressPercent}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="dash-ring-value">
                  <strong>{config.continue.progress}</strong>
                </div>
              </div>
              <p className="dash-progress-desc">{config.continue.detail}</p>
            </section>
          </div>

          {/* 3. Akses Cepat */}
          <section className="lms-section-head">
            <p className="dash-kicker">AKSES CEPAT</p>
            <h2>Buka fitur belajar</h2>
          </section>
          <section className="lms-quick-grid" aria-label="Akses cepat">
            {config.quickActions.map((action) => (
              <Link href={action.href} key={action.title}>
                <Glyph name={action.icon} />
                <span>
                  <strong>{action.title}</strong>
                  <small>{action.detail}</small>
                </span>
              </Link>
            ))}
          </section>

          {/* 4. Progres Ringkasan & Leaderboard */}
          <div className="dashboard-bottom-grid">
            <section className="dashboard-summary-section">
              <div className="dashboard-summary-head">
                <p className="dash-kicker">RINGKASAN</p>
                <h2>Progres belajarmu</h2>
              </div>
              <div className="sensei-progress-grid" aria-label="Ringkasan progres">
                {config.progressSummary.map((item) => (
                  <article key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className="dash-leaderboard-section">
              <div className="dash-leaderboard-head">
                <div>
                  <p className="dash-kicker">KOMPETISI</p>
                  <h2>Papan Peringkat</h2>
                </div>
                <Link className="dash-leaderboard-all" href={`/leaderboard?membership=${data.membership}`}>
                  Lihat Semua <LuArrowRight aria-hidden="true" />
                </Link>
              </div>
              <ul className="dash-leaderboard-list">
                {config.leaderboard.map((user) => (
                  <li key={user.rank} className={`dash-leaderboard-item${user.isCurrentUser ? " current-user" : ""}`}>
                    <span className={`dash-rank-badge rank-${user.rank}`}>{user.rank}</span>
                    <div className="dash-leaderboard-info">
                      <strong>{user.name}</strong>
                      <small>{user.xp}</small>
                    </div>
                    {user.rank === 1 && (
                      <span className="dash-rank-fire" aria-hidden="true">
                        <LuFlame />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
