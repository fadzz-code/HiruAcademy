"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StudentNavigation } from "@/components/student-navigation";
import { parseMembership } from "@/lib/dashboard-mock";

export function CommunityPostScreen() {
  const searchParams = useSearchParams();
  const membership = parseMembership(searchParams.get("membership") ?? undefined);
  const canWrite = membership !== "free";
  const isSensei = membership === "sensei";
  const query = `?membership=${membership}`;

  return (
    <div className="supporting-shell student-shell">
      <StudentNavigation membership={membership} current="community" />
      <main className="supporting-main">
        <div className="progress-title-row">
          <header className="supporting-header">
            <p className="dash-kicker">COMMUNITY • {isSensei ? "TANYA SENSEI" : "DISKUSI MATERI"}</p>
            <h1>Perbedaan penggunaan に dan で untuk tempat?</h1>
            <p>{isSensei ? "Belajar dengan Sensei dapat membuat post, membalas komentar, dan menggunakan Tanya Sensei sesuai entitlement." : canWrite ? "Free Member dapat membaca. Belajar Mandiri dapat membuat post, membalas komentar, dan melaporkan konten sesuai entitlement." : "Free Member dapat membaca. Post, komentar, dan Tanya Sensei tetap terkunci sesuai entitlement."}</p>
          </header>
          <Link href={`/community${query}`} className="button button-secondary">Kembali Community</Link>
        </div>

        <section className="community-post-detail">
          <header className="post-author-row">
            <strong>Rina</strong><span>Member N4</span><small>Waktu dari backend</small>
          </header>
          <h2>Perbedaan penggunaan に dan で untuk tempat?</h2>
          <p>Sensei, saya bingung kapan harus pakai に dan kapan pakai で untuk tempat. Misalnya pergi ke stasiun atau makan di restoran.</p>
          <div className="post-attachment-placeholder">
            <span>Screenshot materi Chapter 4</span>
            <button className="button button-secondary disabled" aria-disabled="true">Buka lampiran</button>
          </div>
          <footer className="post-actions">
            <span>Suka —</span><span>Balasan —</span><span>Simpan —</span>
          </footer>
        </section>

        <section className="community-replies">
          <div className="reply-card">
            <header className="post-author-row">
              <strong>Sensei Aiko</strong><span className="badge-sensei">Sensei</span><small>Waktu dari backend</small>
            </header>
            <p>に menunjukkan arah atau titik akhir dari perpindahan (contoh: 駅に行きます). Sedangkan で menunjukkan tempat terjadinya suatu aktivitas (contoh: レストランで食べます).</p>
          </div>
          <div className="reply-card">
            <header className="post-author-row">
              <strong>Dimas</strong><span>Member N4</span><small>Waktu dari backend</small>
            </header>
            <p>Oh, berarti kalau aktivitasnya cuma &apos;ada/exist&apos; pakai に juga ya Sensei? Seperti 公園にいます.</p>
          </div>
        </section>

        {canWrite ? <section className="community-composer">
          <p className="dash-kicker">Tulis balasan</p>
          <textarea rows={4} placeholder="Ringkasan" />
          <div className="composer-actions">
            <button className="button button-dark disabled" aria-disabled="true">Kirim Balasan</button>
            <button className="button button-secondary disabled" aria-disabled="true">Tambah Gambar</button>
          </div>
          <small>Postingan mengikuti aturan komunitas dan dapat melalui moderasi.</small>
        </section> : <section className="community-composer locked">
          <p className="dash-kicker">READ ONLY</p>
          <p>Free Member tidak dapat membalas diskusi. Akses membalas tersedia untuk member LMS dan Sensei.</p>
        </section>}

        <aside className="community-rules">
          <strong>Aturan thread</strong>
          <ul>
            <li>Gunakan bahasa yang sopan</li>
            <li>Jangan membagikan data pribadi</li>
            <li>Media dapat melalui moderasi</li>
            <li>Report dan removal dicatat</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
