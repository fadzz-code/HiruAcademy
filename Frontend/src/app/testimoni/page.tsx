import Link from "next/link";
import { PublicPage } from "@/components/public-shell";
import { supportingValues, testimonials } from "@/lib/public-mock";

export default function TestimonialsPage() {
  return <PublicPage active="Testimoni"><main className="public-main testimonials-page">
    <section className="testimonials-hero"><p className="kicker">CERITA PEMBELAJAR</p><h1>Perjalanan yang berbeda, sistem belajar yang tetap terarah</h1><p>Testimoni hanya tampil pada halaman ini setelah pengguna memberi izin dan Admin menyetujui publikasinya.</p></section>
    <section className="testimonial-kpis" aria-label="Indikator pengalaman"><article><span>Alumni</span><strong>2.300+</strong></article><article><span>Merasa lebih terarah</span><strong>92%</strong></article><article><span>Rating pengalaman</span><strong>4,9 / 5</strong></article></section>
    <section className="public-section testimonial-section"><div className="testimonial-grid">{testimonials.map((testimonial) => <article className="testimonial-card" key={testimonial.name}><div className="testimonial-avatar" aria-hidden="true">{testimonial.initials}</div><span className="testimonial-stars" aria-label="5 dari 5 bintang">★★★★★</span><blockquote>{testimonial.quote}</blockquote><footer><strong>{testimonial.name}</strong><small>{testimonial.membership}</small></footer></article>)}</div></section>
    <section className="public-section values-section"><div className="value-grid">{supportingValues.map((value) => <article key={value.title}><span lang="ja">{value.glyph}</span><div><h2>{value.title}</h2><p>{value.description}</p></div></article>)}</div></section>
    <section className="testimonial-cta"><div><h2>Mulai dari Placement Test atau lihat program yang sesuai</h2><p>Gunakan hasil placement untuk menentukan level, lalu pilih Free, Mandiri, atau belajar dengan Sensei.</p></div><div><Link className="button button-primary" href="/placement">Mulai Placement</Link><Link className="button testimonial-secondary" href="/program">Lihat Program</Link></div></section>
  </main></PublicPage>;
}
