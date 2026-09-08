import { publicSensei } from "@/lib/public-sensei";

export function SenseiGrid({ limit, reveal = false }: { limit?: number; reveal?: boolean }) {
  const profiles = limit ? publicSensei.slice(0, limit) : publicSensei;

  return <div className="sensei-grid">{profiles.map((sensei, index) => <article className={`sensei-card${reveal ? " reveal-item" : ""}`} key={sensei.id} style={reveal ? { "--reveal-index": index } as React.CSSProperties : undefined}><div className="sensei-avatar" role="img" aria-label={`No image: ${sensei.name}`}>No image</div><div className="sensei-card-body"><h3>{sensei.name}</h3><ul aria-label={`Fokus pembelajaran ${sensei.name}`}>{sensei.expertise.map((expertise) => <li key={expertise}>{expertise}</li>)}</ul></div></article>)}</div>;
}
