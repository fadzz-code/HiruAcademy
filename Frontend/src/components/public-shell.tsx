import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function PublicHeader({ active }: { active?: string }) {
  const links = [["Program", "/program"], ["Coba Gratis", "/register"], ["Placement Test", "/placement"], ["Testimoni", "/testimoni"], ["Blog", "/blog"]];
  return <header className="public-header"><div className="public-wrap"><Link href="/" aria-label="Hiru Academy"><BrandLogo /></Link><nav aria-label="Navigasi utama">{links.map(([label, href]) => <Link className={active === label ? "active" : ""} key={href} href={href}>{label}</Link>)}</nav><Link className="public-login" href="/login">Login</Link></div></header>;
}

export function PublicFooter() {
  return <footer className="public-footer"><div className="public-wrap public-footer-grid"><Link href="/"><BrandLogo /></Link><nav aria-label="Navigasi footer"><Link href="/program">Program</Link><Link href="/placement">Placement Test</Link><Link href="/testimoni">Testimoni</Link><Link href="/blog">Blog</Link><span className="footer-disabled" aria-disabled="true">Kebijakan Privasi</span></nav></div><div className="public-wrap public-copyright">© 2026 Hiru Academy. Belajar Jepang dengan arah yang jelas.</div></footer>;
}

export function PublicPage({ children, active }: { children: React.ReactNode; active?: string }) { return <><PublicHeader active={active} />{children}<PublicFooter /></>; }
