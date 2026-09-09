import Image from "next/image";
import { publicSensei } from "@/lib/public-sensei";

export function SenseiGrid({ limit, reveal = false }: { limit?: number; reveal?: boolean }) {
  const profiles = limit ? publicSensei.slice(0, limit) : publicSensei;

  return (
    <div className="sensei-grid">
      {profiles.map((sensei, index) => (
        <article
          className={`sensei-card${reveal ? " reveal-item" : ""}`}
          key={sensei.id}
          style={reveal ? ({ "--reveal-index": index } as React.CSSProperties) : undefined}
        >
          <div className="sensei-avatar" aria-label={`Foto ${sensei.name}`}>
            {sensei.avatarSrc ? (
              <Image
                src={sensei.avatarSrc}
                alt={`Foto profil ${sensei.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="sensei-avatar-img"
              />
            ) : (
              <span>{sensei.initials}</span>
            )}
          </div>
          <div className="sensei-card-body">
            <h3>{sensei.name}</h3>
            <ul aria-label={`Fokus pembelajaran ${sensei.name}`}>
              {sensei.expertise.map((expertise) => (
                <li key={expertise}>{expertise}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
