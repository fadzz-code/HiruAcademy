import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";

export function AuthShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <main className="auth-page">
      <section className="auth-story" aria-label="Tentang pengalaman belajar HIRU Academy">
        <Link className="auth-brand" href="/" aria-label="HIRU Academy, kembali ke beranda"><BrandLogo /></Link>
        <div className="auth-story-copy">
          <p>Belajar. Bertumbuh. Melangkah.</p>
          <h2>Satu langkah lebih dekat dengan tujuan bahasa Jepangmu.</h2>
          <div className="auth-japanese"><ruby>一歩<rt>いっぽ</rt></ruby>ずつ、<ruby>前<rt>まえ</rt></ruby>へ。<small>Selangkah demi selangkah, terus maju.</small></div>
        </div>
        <div className="auth-landscape" aria-hidden="true"><i className="auth-sun" /><i className="auth-cloud cloud-a" /><i className="auth-cloud cloud-b" /><span className="auth-torii"><i /><b /><em /><strong /></span><span className="auth-hill back" /><span className="auth-hill front" /></div>
      </section>

      <section className="auth-content">
        <Link className="auth-back" href="/"><span aria-hidden="true">←</span> Kembali ke beranda</Link>
        <div className="auth-card">
          <p className="auth-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="auth-description">{description}</p>
          {children}
        </div>
        <p className="auth-footnote">HIRU Academy · Belajar bahasa Jepang lebih terarah</p>
      </section>
    </main>
  );
}
