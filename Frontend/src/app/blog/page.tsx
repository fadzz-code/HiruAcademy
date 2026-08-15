import Link from "next/link";
import { PublicPage } from "@/components/public-shell";
import { blogArticles, blogDetailSlug, blogFeatured } from "@/lib/public-mock";

export default function BlogPage() {
  return <PublicPage active="Blog"><main className="public-main blog-page">
    <section className="blog-hero"><div><p className="kicker">HIRU INSIGHT</p><h1>Belajar strategi, budaya, dan perjalanan menuju JLPT</h1><p>Baca insight, lalu gunakan Placement Test untuk menentukan level dan program belajar yang paling relevan.</p><label className="blog-search"><span aria-hidden="true">⌕</span><input aria-label="Cari artikel atau topik" placeholder="Cari artikel atau topik" /></label></div></section>
    <section className="blog-featured"><div className="blog-visual"><strong>{blogFeatured.marker}</strong><span className="blog-dots" aria-hidden="true">•••</span><small>{blogFeatured.label}</small></div><div><p className="kicker">{blogFeatured.label}</p><h2>{blogFeatured.title}</h2><p>{blogFeatured.description}</p><Link className="button button-primary" href={`/blog/${blogDetailSlug}`}>Baca Artikel</Link></div></section>
    <section className="public-section blog-latest"><div className="public-section-head"><h2>Artikel terbaru</h2></div><div className="blog-grid">{blogArticles.map((article) => <article className="blog-card" key={article.title}><div className="blog-card-visual"><strong>{article.marker}</strong><span aria-hidden="true">•••</span></div><div className="blog-card-body"><p className="kicker">{article.category}</p><h3>{article.title}</h3><p>{article.description}</p><span className="button button-outline">Baca Artikel</span></div></article>)}</div></section>
    <section className="blog-cta"><div><h2>Ubah insight menjadi langkah belajar berikutnya</h2><p>Mulai Hiru Quick Check sekitar 5 menit atau lihat program berdasarkan kebutuhanmu.</p></div><div><Link className="button button-primary" href="/placement">Mulai Placement</Link><Link className="button blog-secondary" href="/program">Lihat Program</Link></div></section>
  </main></PublicPage>;
}
