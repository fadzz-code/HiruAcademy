import Image from "next/image";
import Link from "next/link";
import { PublicPage } from "@/components/public-shell";
import { testimonialVideos, testimonials } from "@/lib/public-mock";

export default function TestimonialsPage() {
  return <PublicPage active="Testimoni"><main className="public-main testimonials-page">
    <section className="testimonials-hero"><p className="kicker">CERITA SISWA HIRU</p><h1>Cerita Nyata dari Siswa Hiru Academy</h1><p>Setiap siswa memiliki perjalanan berbeda. Inilah pengalaman mereka belajar, berkembang, dan mencapai target bersama Hiru.</p></section>
    <section className="testimonial-kpis" aria-label="Indikator pengalaman"><article><span>Alumni</span><strong>2.300+</strong></article><article><span>Merasa lebih terarah</span><strong>92%</strong></article><article><span>Rating pengalaman</span><strong>4,9 / 5</strong></article></section>
    <section className="public-section testimonial-section"><div className="testimonial-grid">{testimonials.map((testimonial) => <article className="testimonial-card" key={testimonial.name}><div className="testimonial-avatar">{testimonial.avatarSrc ? <Image alt={`Foto ${testimonial.name}`} fill sizes="64px" src={testimonial.avatarSrc} /> : <span aria-hidden="true">{testimonial.initials}</span>}</div><blockquote>{testimonial.quote}</blockquote><footer><strong>{testimonial.name}</strong><small>{testimonial.membership}</small></footer></article>)}</div></section>
    <section className="public-section testimonial-video-section"><div className="public-section-head"><p className="kicker">VIDEO TESTIMONI</p><h2>Dengarkan Cerita Siswa Hiru</h2></div><div className="testimonial-video-grid">{testimonialVideos.map((testimonial) => <article key={testimonial.name}><div className="testimonial-video-frame">{testimonial.videoSrc ? <video controls poster={testimonial.posterSrc || undefined} src={testimonial.videoSrc} /> : <><button type="button" aria-label={`Putar video testimoni ${testimonial.name}`} disabled><span aria-hidden="true">▶</span></button><strong>Video Testimoni</strong></>}</div><footer><strong>{testimonial.name}</strong><small>{testimonial.membership}</small></footer></article>)}</div></section>
    <section className="testimonial-cta"><div><h2>Siap Memulai Perjalanan Belajarmu?</h2><p>Temukan levelmu melalui Placement Test gratis, lalu pilih cara belajar yang sesuai dengan target dan ritme belajarmu.</p></div><div><Link className="button button-primary" href="/placement">Cek Level Gratis</Link><Link className="button testimonial-secondary" href="/program">Lihat Program &amp; Biaya</Link></div></section>
  </main></PublicPage>;
}
