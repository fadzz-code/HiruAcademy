import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";

export function AuthShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <main className="auth-page">
      <section className="auth-story" aria-label="Tentang pengalaman belajar HIRU Academy">
        <Link className="auth-brand" href="/" aria-label="HIRU Academy, kembali ke beranda"><BrandLogo /></Link>
        <div className="auth-story-copy">
          <p>{eyebrow}</p>
          <h2>{title}</h2>
          {description ? <p style={{ color: "var(--muted)", textTransform: "none", fontWeight: "normal", letterSpacing: "normal", fontSize: "14px", marginTop: "-5px" }}>{description}</p> : null}
          <div className="auth-japanese" style={{ marginTop: "18px" }}><span lang="ja"><ruby>あ<rt></rt></ruby><ruby>い<rt></rt></ruby><ruby className="active">う<rt></rt></ruby><ruby>え<rt></rt></ruby><ruby>お<rt></rt></ruby></span></div>
        </div>
        <div className="auth-landscape" aria-hidden="true"><i className="auth-sun" /><i className="auth-cloud cloud-a" /><i className="auth-cloud cloud-b" /><span className="auth-torii"><i /><b /><em /><strong /></span><span className="auth-hill back" /><span className="auth-hill front" /></div>
      </section>

      <section className="auth-content">
        <Link className="auth-back" href="/"><span aria-hidden="true">←</span> Kembali ke beranda</Link>
        <div className="auth-card">
          {children}
        </div>
        <p className="auth-footnote">HIRU Academy · Belajar bahasa Jepang lebih terarah</p>
      </section>
    </main>
  );
}
