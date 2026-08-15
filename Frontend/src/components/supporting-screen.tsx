import Link from "next/link";
import { StudentNavigation } from "@/components/student-navigation";
import { supportingData, type SupportingKind } from "@/lib/supporting-mock";

export function SupportingScreen({ kind, membership }: { kind: SupportingKind; membership: "free" | "lms" | "sensei" }) {
  const data = supportingData[kind];
  return <div className="supporting-shell student-shell"><StudentNavigation membership={membership} current={kind === "notifications" ? "notifications" : kind === "profile" ? "profile" : "supporting"} /><main className="supporting-main"><header className="supporting-header"><p className="dash-kicker">{data.eyebrow}</p><h1>{data.title}</h1><p>{data.description}</p>{data.locked && <span className="supporting-badge">TERBATAS</span>}</header><section className="supporting-grid">{data.cards.map((card) => <article className="supporting-card" key={card.title}><span className="supporting-icon" aria-hidden="true">{card.icon}</span><div><span className="supporting-status">{card.status}</span><h2>{card.title}</h2><p>{card.description}</p></div>{card.href ? <Link className="supporting-action" href={`${card.href}?membership=${membership}`}>{card.action ?? "Buka"} →</Link> : <span className="supporting-action disabled" aria-disabled="true">{card.action ?? "Tersedia"}</span>}</article>)}</section>{data.notice && <aside className="supporting-notice"><strong>{data.notice.title}</strong><p>{data.notice.description}</p></aside>}</main></div>;
}
