"use client";

import Link from "next/link";

export type AssessmentUnavailableAction = { label: string; href?: string; onClick?: () => void };

export function AssessmentUnavailable({ eyebrow, title, description, facts, primary, secondary }: { eyebrow: string; title: string; description: string; facts: string[]; primary: AssessmentUnavailableAction; secondary: AssessmentUnavailableAction }) {
  const action = (item: AssessmentUnavailableAction, className: string) => item.href ? <Link className={className} href={item.href}>{item.label}</Link> : <button className={className} type="button" onClick={item.onClick}>{item.label}</button>;
  return <section className="assessment-unavailable"><p className="dash-kicker">{eyebrow}</p><h1>{title}</h1><span>Belum Aktif</span><div aria-hidden="true">鍵</div><p>{description}</p><ul>{facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><footer>{action(primary, "button button-primary")}{action(secondary, "button button-secondary")}</footer></section>;
}
