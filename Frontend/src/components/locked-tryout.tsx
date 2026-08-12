import Link from "next/link";

export function LockedTryout() {
  return <main className="tryout-locked"><Link href="/dashboard?membership=free">← Dashboard</Link><section><span aria-hidden="true">試</span><p className="assessment-type">Preview terkunci</p><h1>Try Out tersedia untuk membership LMS.</h1><p>Free Member tetap dapat melihat keberadaan fitur ini, tetapi tidak memperoleh akses runner melalui tampilan frontend.</p><div><strong>Yang tersedia setelah akses aktif</strong><ul><li>Runner dengan timer sesuai konfigurasi</li><li>Hasil dan breakdown bila tersedia</li><li>Review jawaban bila diaktifkan</li></ul></div><Link className="locked-cta" href="/#program">Lihat pilihan belajar →</Link></section></main>;
}
