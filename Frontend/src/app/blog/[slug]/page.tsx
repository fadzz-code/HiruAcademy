import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPage } from "@/components/public-shell";
import { blogDetail, blogDetailSlug } from "@/lib/public-mock";

export function generateStaticParams() { return [{ slug: blogDetailSlug }]; }

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== blogDetailSlug) notFound();
  return <PublicPage active="Blog"><main className="public-main blog-detail-page"><div className="blog-detail-layout"><article className="blog-article"><header><p className="kicker">{blogDetail.eyebrow}</p><h1>{blogDetail.title}</h1><p>{blogDetail.description}</p></header><div className="blog-detail-visual"><strong>道</strong><span aria-hidden="true">•••</span><small>LEARNING PATH</small></div><div className="blog-body"><h2>Mulai dari target kecil</h2><p>Pilih satu aktivitas utama setiap hari: menonton materi, membaca modul, mengulang flashcard, atau mengerjakan latihan. Urutan kecil yang berulang lebih mudah dipertahankan daripada jadwal yang terlalu padat.</p><blockquote>“Progres yang terlihat membantu kebiasaan bertahan.”</blockquote><p>Gunakan checkpoint dan indikator progres sebagai penanda langkah berikutnya.</p><h2>Gabungkan pemahaman dan evaluasi</h2><p>Setelah memahami materi, lanjutkan ke latihan dan checkpoint. Try out digunakan untuk menilai kesiapan secara menyeluruh, bukan menggantikan proses belajar harian.</p></div><section className="blog-cta blog-detail-cta"><div><h2>Temukan level sebelum memilih program</h2></div><div><Link className="button button-primary" href="/placement">Mulai Placement</Link><Link className="button blog-secondary" href="/program">Lihat Program</Link></div></section></article><aside className="blog-sidebar"><section><h2>Progress membaca</h2><div className="reading-progress"><strong>72% selesai</strong><i><b /></i></div></section><section><h2>Topik terkait</h2><ul><li>Grammar N4</li><li>Latihan listening</li><li>Persiapan try out</li></ul></section><Link className="button button-dark" href="/blog">Kembali ke Blog</Link></aside></div></main></PublicPage>;
}
