import Link from "next/link";
import type { JourneyLevel } from "@/lib/journey-mock";
import type { Membership } from "@/lib/dashboard-mock";

export function LevelSelection({ membership, levels }: { membership: Membership; levels: JourneyLevel[] }) {
  return (
    <>
      <header className="journey-page-head"><div><p className="dash-kicker">Pilih perjalanan</p><h1>Level belajar bahasa Jepang</h1><p>Lihat level yang tersedia, sedang dipelajari, atau masih terkunci sesuai akses belajarmu.</p></div><div className="journey-kanji" aria-hidden="true">旅<small>tabi · perjalanan</small></div></header>
      <section className="level-grid" aria-label="Pilihan level">{levels.map((level) => {
        const locked = level.state === "locked";
        return <article className={`level-card level-${level.state}`} key={level.slug}><div className="level-card-top"><span className="level-code">{level.code}</span><span className="level-status">{locked && <i aria-hidden="true">⌑</i>}{level.statusLabel}</span></div><h2>{level.title}</h2><p>{level.description}</p><div className="level-progress"><span>{level.progressLabel}</span><i><b /></i></div>{locked ? <Link href="/#program">Lihat cara membuka <span aria-hidden="true">→</span></Link> : <Link href={`/journey/${level.slug}?membership=${membership}`}>{level.state === "completed" ? "Ulas perjalanan" : level.state === "current" || level.state === "limited" ? "Lanjutkan perjalanan" : "Buka perjalanan"}<span aria-hidden="true">→</span></Link>}</article>;
      })}</section>
      {membership === "free" && <aside className="journey-note"><span aria-hidden="true">✦</span><div><strong>Progress gratis tetap menjadi bagian perjalananmu.</strong><p>Level lain tetap terlihat agar langkah upgrade berikutnya jelas tanpa menghilangkan konteks belajar.</p></div><Link href="/#program">Lihat pilihan belajar</Link></aside>}
    </>
  );
}
