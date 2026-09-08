"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PublicPage } from "@/components/public-shell";
import { blogArticles, blogDetailSlug, blogFeatured } from "@/lib/public-mock";

const categories = ["Semua", ...new Set(blogArticles.map((article) => article.category))];

function ArticleMeta({ category, author, publishedAt }: { category: string; author: string; publishedAt: string }) {
  return <div className="blog-meta"><span>{category}</span><small>{author} • {publishedAt}</small></div>;
}

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const visibleArticles = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("id-ID");
    return blogArticles.filter((article) => (category === "Semua" || article.category === category) && (!search || `${article.title} ${article.description} ${article.category}`.toLocaleLowerCase("id-ID").includes(search)));
  }, [category, query]);

  return <PublicPage active="Blog"><main className="public-main blog-page">
    <section className="blog-hero"><div><p className="kicker">HIRU INSIGHT</p><h1>Panduan Bahasa Jepang dan Persiapan JLPT</h1><p>Temukan penjelasan materi, strategi ujian, budaya Jepang, dan tips belajar praktis dari Hiru Academy.</p><label className="blog-search"><span aria-hidden="true">⌕</span><input aria-label="Cari materi, level, atau topik" placeholder="Cari materi, level, atau topik" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div></section>
    <section className="blog-featured"><div className="blog-visual"><strong>{blogFeatured.marker}</strong><span className="blog-dots" aria-hidden="true">•••</span><small>{blogFeatured.label}</small></div><div><p className="kicker">{blogFeatured.label}</p><ArticleMeta category={blogFeatured.category} author={blogFeatured.author} publishedAt={blogFeatured.publishedAt} /><h2>{blogFeatured.title}</h2><p>{blogFeatured.description}</p><Link className="button button-primary" href={`/blog/${blogDetailSlug}`}>Baca Artikel</Link></div></section>
    <section className="public-section blog-latest"><div className="public-section-head"><h2>Artikel terbaru</h2></div><div className="blog-filters" aria-label="Filter kategori">{categories.map((item) => <button className={category === item ? "active" : ""} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>{visibleArticles.length ? <div className="blog-grid">{visibleArticles.map((article) => <article className="blog-card" key={article.title}><div className="blog-card-visual"><strong>{article.marker}</strong><span aria-hidden="true">•••</span></div><div className="blog-card-body"><ArticleMeta category={article.category} author={article.author} publishedAt={article.publishedAt} /><h3>{article.title}</h3><p>{article.description}</p><span className="button button-outline">Baca Artikel</span></div></article>)}</div> : <p className="blog-empty">Artikel tidak ditemukan.</p>}</section>
    <section className="blog-cta"><div><h2>Belum Tahu Harus Mulai dari Level Mana?</h2><p>Kerjakan Placement Test gratis untuk mendapatkan analisis kemampuan dan rekomendasi level belajar yang sesuai.</p><small>20 soal • ±5–10 menit • Hasil langsung</small></div><div><Link className="button button-primary" href="/placement">Cek Level Gratis</Link><Link className="button blog-secondary" href="/program">Lihat Program &amp; Biaya</Link></div></section>
  </main></PublicPage>;
}
