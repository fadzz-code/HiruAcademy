"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StudentNavigation } from "@/components/student-navigation";
import { parseMembership } from "@/lib/dashboard-mock";
import { useState } from "react";

export function CommunityPostScreen() {
  const searchParams = useSearchParams();
  const membership = parseMembership(searchParams.get("membership") ?? undefined);
  const canWrite = membership !== "free";
  const query = `?membership=${membership}`;
  const [state, setState] = useState<"detail" | "reply" | "attachment" | "reported">("detail");
  if (state === "reported") return <div className="supporting-shell student-shell"><StudentNavigation membership={membership} current="community" /><main className="supporting-main"><section className="sensei-status-panel"><p className="dash-kicker">COMMUNITY • REPORTED</p><h1>Laporan berhasil dikirim</h1><p>Laporan tercatat dan akan ditinjau sesuai proses moderasi.</p><div className="status-actions"><button className="button button-primary" type="button" onClick={() => setState("detail")}>Kembali ke Thread</button><Link className="button button-secondary" href={`/community${query}`}>Kembali ke Community</Link></div></section></main></div>;

  return (
    <div className="supporting-shell student-shell">
      <StudentNavigation membership={membership} current="community" />
      <main className="supporting-main">
        <div className="progress-title-row">
          <header className="supporting-header">
            <p className="dash-kicker">COMMUNITY • DISKUSI MATERI</p>
            <h1>Perbedaan penggunaan に dan で untuk tempat?</h1>
            <p>{canWrite ? "Hak baca, balas, lapor, dan moderasi mengikuti entitlement serta backend." : "Free Member dapat membaca thread. Hak balas dan pelaporan mengikuti entitlement."}</p>
          </header>
          <Link href={`/community${query}`} className="button button-secondary">Kembali Community</Link>
        </div>

        <section className="community-post-detail">
          <header className="post-author-row">
            <strong>Rina</strong><span>Member N4</span><small>Waktu dari backend</small>
          </header>
          <h2>Perbedaan penggunaan に dan で untuk tempat?</h2>
          <p>Saya masih bingung membedakan partikel untuk lokasi keberadaan dan tempat aktivitas pada contoh Chapter 4. Mohon penjelasan beserta contoh tambahan.</p>
          <div className="post-attachment-placeholder"><span aria-hidden="true">文</span><div><strong>Screenshot materi Chapter 4</strong><small>File dan metadata berasal dari backend.</small></div><button className="button button-secondary" type="button" onClick={() => setState("attachment")}>Buka</button></div>{state === "attachment" && <p className="community-local-feedback" role="status">Lampiran fixture tidak memuat file eksternal.</p>}
          <footer className="post-actions">
             <span>Suka • —</span><span>Balasan • —</span><span>Simpan</span><button type="button" onClick={() => setState("reported")}>Laporkan</button>
          </footer>
        </section>

        <section className="community-replies">
          <div className="reply-card">
            <header className="post-author-row">
              <strong>Sensei •••1</strong><span className="badge-sensei">Sensei</span><small>Waktu dinamis</small>
            </header>
            <p>Untuk lokasi keberadaan gunakan に, sedangkan で menunjukkan tempat berlangsungnya aktivitas. Contoh lengkap dapat dihubungkan dengan materi terkait.</p>
          </div>
          <div className="reply-card">
            <header className="post-author-row">
              <strong>Dimas</strong><span>Member</span><small>Waktu dinamis</small>
            </header>
            <p>Oh, berarti kalau aktivitasnya cuma &apos;ada/exist&apos; pakai に juga ya Sensei? Seperti 公園にいます.</p>
          </div>
        </section>

        {canWrite ? <section className="community-composer">
          <p className="dash-kicker">Tulis balasan</p>
          <textarea rows={4} placeholder="Ringkasan" />
          <div className="composer-actions">
             <button className="button button-dark" type="button" onClick={() => setState("reply")}>Kirim Balasan</button>
             <button className="button button-secondary" type="button" onClick={() => setState("attachment")}>Tambah Gambar</button>
          </div>
          <small>Postingan mengikuti aturan komunitas dan dapat melalui moderasi.</small>{state === "reply" && <p className="community-local-feedback" role="status">Balasan fixture berhasil dikirim pada sesi ini.</p>}
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
