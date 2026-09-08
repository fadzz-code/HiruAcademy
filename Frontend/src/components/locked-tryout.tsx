import Link from "next/link";
import { LuArrowLeft, LuArrowRight, LuLock } from "react-icons/lu";

export function LockedTryout() {
  return (
    <main className="tryout-locked">
      <Link href="/dashboard?membership=free">
        <LuArrowLeft aria-hidden="true" style={{ display: "inline-block", marginRight: "4px", verticalAlign: "middle" }} /> Dashboard
      </Link>
      <section>
        <span aria-hidden="true"><LuLock /></span>
        <p className="assessment-type">Akses Terkunci</p>
        <h1>Try Out tersedia untuk membership LMS dan Sensei.</h1>
        <p>Free Member dapat melihat informasi fitur simulasi, namun akses pengerjaan runner memerlukan paket belajar aktif.</p>
        <div>
          <strong>Yang tersedia setelah akses aktif</strong>
          <ul>
            <li>Simulasi terstandarisasi dengan pembagian kemampuan</li>
            <li>Hasil skor dan rincian per bagian JLPT</li>
            <li>Review pembahasan jawaban lengkap</li>
          </ul>
        </div>
        <Link className="locked-cta" href="/renewal?membership=free">
          Lihat pilihan belajar <LuArrowRight aria-hidden="true" style={{ display: "inline-block", marginLeft: "4px", verticalAlign: "middle" }} />
        </Link>
      </section>
    </main>
  );
}
