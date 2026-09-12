"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StudentNavigation } from "@/components/student-navigation";
import { parseMembership } from "@/lib/dashboard-mock";
import { useState } from "react";
import { LuBookmark, LuFileText, LuFlag, LuHeart, LuMessageSquare } from "react-icons/lu";

export function CommunityPostScreen() {
  const searchParams = useSearchParams();
  const membership = parseMembership(searchParams.get("membership") ?? undefined);
  const canWrite = membership !== "free";
  const query = `?membership=${membership}`;
  const [state, setState] = useState<"detail" | "reply" | "attachment" | "reported">("detail");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  if (state === "reported") return <div className="supporting-shell student-shell"><StudentNavigation membership={membership} current="community" /><main className="supporting-main"><section className="sensei-status-panel"><p className="dash-kicker">COMMUNITY • LAPORAN</p><h1>Laporan berhasil dikirim</h1><p>Laporan tercatat dan akan ditinjau oleh tim moderasi kami.</p><div className="status-actions"><button className="button button-primary" type="button" onClick={() => setState("detail")}>Kembali ke Thread</button><Link className="button button-secondary" href={`/community${query}`}>Kembali ke Community</Link></div></section></main></div>;

  return (
    <div className="supporting-shell student-shell">
      <StudentNavigation membership={membership} current="community" />
      <main className="supporting-main community-thread-page">
        <div className="progress-title-row community-header-row">
          <header className="supporting-header">
            <p className="dash-kicker">COMMUNITY • DISKUSI MATERI</p>
            <h1>Perbedaan penggunaan に dan で untuk tempat?</h1>
            <p>{canWrite ? "Diskusikan pemahaman materi bersama sesama pembelajar dan Sensei." : "Free Member dapat membaca thread. Bergabung ke paket berbayar untuk membalas diskusi."}</p>
          </header>
          <Link href={`/community${query}`} className="button button-secondary community-back-btn">Kembali Community</Link>
        </div>

        <section className="community-post-detail">
          <header className="post-author-row">
            <strong>Rina</strong><span>Member N4</span><small>2 jam yang lalu</small>
          </header>
          <h2>Perbedaan penggunaan に dan で untuk tempat?</h2>
          <p>Saya masih bingung membedakan partikel untuk lokasi keberadaan dan tempat aktivitas pada contoh Chapter 4. Mohon penjelasan beserta contoh tambahan.</p>
          <div className="post-attachment-placeholder">
            <span aria-hidden="true"><LuFileText /></span>
            <div>
              <strong>Screenshot materi Chapter 4</strong>
              <small>Lampiran catatan belajar dari mahasiswa</small>
            </div>
            <button className="button button-secondary" type="button" onClick={() => setState("attachment")}>Buka</button>
          </div>
          {state === "attachment" && <p className="community-local-feedback" role="status">Pratinjau lampiran catatan materi siap ditinjau.</p>}
          <footer className="post-actions-toolbar">
            <div className="post-action-buttons">
              <button
                type="button"
                className={`post-action-btn ${liked ? "active" : ""}`}
                onClick={() => setLiked(!liked)}
                aria-label="Sukai postingan ini"
              >
                <LuHeart aria-hidden="true" />
                <span>Suka</span>
              </button>
              <button
                type="button"
                className="post-action-btn"
                onClick={() => document.querySelector("textarea")?.focus()}
                aria-label="Balas postingan ini"
              >
                <LuMessageSquare aria-hidden="true" />
                <span>Balasan</span>
              </button>
              <button
                type="button"
                className={`post-action-btn ${saved ? "active" : ""}`}
                onClick={() => setSaved(!saved)}
                aria-label="Simpan postingan ini"
              >
                <LuBookmark aria-hidden="true" />
                <span>Simpan</span>
              </button>
            </div>
            {canWrite && (
              <button type="button" className="post-report-btn" onClick={() => setState("reported")}>
                <LuFlag aria-hidden="true" />
                <span>Laporkan</span>
              </button>
            )}
          </footer>
        </section>

        <section className="community-replies">
          <div className="reply-card">
            <header className="post-author-row">
              <strong>Kenji Sensei</strong><span className="badge-sensei">Sensei</span><small>1 jam yang lalu</small>
            </header>
            <p>Untuk lokasi keberadaan gunakan に, sedangkan で menunjukkan tempat berlangsungnya aktivitas. Contoh lengkap dapat dipelajari pada Modul Tata Bahasa.</p>
          </div>
          <div className="reply-card">
            <header className="post-author-row">
              <strong>Dimas</strong><span>Member N4</span><small>45 menit yang lalu</small>
            </header>
            <p>Oh, berarti kalau aktivitasnya cuma &apos;ada/exist&apos; pakai に juga ya Sensei? Seperti 公園にいます.</p>
          </div>
        </section>

        {canWrite ? (
          <section className="community-composer">
            <p className="dash-kicker">Tulis balasan</p>
            <textarea rows={4} placeholder="Tulis jawaban atau tanggapanmu..." />
            <div className="composer-actions">
              <button className="button button-primary" type="button" onClick={() => setState("reply")}>Kirim Balasan</button>
              <button className="button button-secondary" type="button" onClick={() => setState("attachment")}>Tambah Gambar</button>
            </div>
            <small>Postingan mengikuti aturan komunitas dan tata tertib diskusi.</small>
            {state === "reply" && <p className="community-local-feedback" role="status">Balasan berhasil dikirim.</p>}
          </section>
        ) : (
          <section className="community-composer locked">
            <p className="dash-kicker">AKSES TERBATAS</p>
            <p>Free Member dapat membaca diskusi. Akses membalas tersedia untuk member LMS dan Sensei.</p>
          </section>
        )}

        <aside className="community-rules">
          <strong>Aturan thread</strong>
          <ul>
            <li>Gunakan bahasa yang sopan dan saling menghargai</li>
            <li>Fokus pada topik pembelajaran bahasa Jepang</li>
            <li>Jangan membagikan informasi pribadi atau kontak luar</li>
            <li>Laporan pelanggaran akan ditindaklanjuti moderator</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
