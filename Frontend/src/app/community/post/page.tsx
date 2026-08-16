import Link from "next/link";

export default function CommunityPostPage({ searchParams }: { searchParams: { membership?: string } }) {
  const membership = searchParams.membership === "lms" || searchParams.membership === "sensei" ? searchParams.membership : "free";
  const canWrite = membership !== "free";
  const isSensei = membership === "sensei";

  return (
    <div className="supporting-shell student-shell">
      <main className="supporting-main">
        <header className="supporting-header">
          <p className="dash-kicker">COMMUNITY  {isSensei ? "TANYA SENSEI" : "DISKUSI MATERI"}</p>
          <h1>Perbedaan penggunaan untuk tempat</h1>
          <p>{isSensei ? "Hak baca, balas, Tanya Sensei, dan moderasi mengikuti entitlement serta backend." : canWrite ? "Free Member dapat membaca thread. Hak balas dan pelaporan mengikuti entitlement." : "Free Member dapat membaca thread. Hak balas dan pelaporan mengikuti entitlement."}</p>
          <Link href={`/community?membership=${membership}`} className="button button-secondary">Kembali Community</Link>
        </header>

        <article className="supporting-card">
          <header>
            <strong>Rina  Member N4</strong>
            <small>Waktu publikasi dari backend</small>
            <span className="supporting-status">{isSensei ? "Tanya Sensei" : canWrite ? "DISKUSI MATERI" : "READ ONLY"}</span>
          </header>
          <h2>Perbedaan penggunaan untuk tempat?</h2>
          <p>Saya masih bingung membedakan partikel untuk lokasi keberadaan dan tempat aktivitas pada contoh Chapter 4. Mohon penjelasan beserta contoh tambahan.</p>
          <div className="attachment">
            <span>Screenshot materi Chapter 4</span>
            <small>File dan metadata berasal dari backend.</small>
            <button className="button button-secondary">Buka</button>
          </div>
          <div className="engagement">
            <span>Suka -</span>
            <span>Balasan -</span>
            {isSensei && <span>Simpan</span>}
          </div>
        </article>

        <section className="replies">
          <h2>Balasan</h2>
          <article className="reply">
            <header>
              <strong>Sensei</strong>
              <small>Waktu dinamis</small>
            </header>
            <p>Untuk lokasi keberadaan gunakan ni, sedangkan de menunjukkan tempat berlangsungnya aktivitas. Contoh lengkap dapat dihubungkan dengan materi terkait.</p>
            {canWrite && <div className="engagement"><span>Balas</span><span>Suka</span></div>}
          </article>
          <article className="reply">
            <header>
              <strong>Dimas  Member</strong>
              <small>Waktu dinamis</small>
            </header>
            <p>Penjelasan ini membantu. Saya juga membandingkannya dengan contoh pada reading.</p>
            {canWrite && <div className="engagement"><span>Balas</span><span>Suka</span></div>}
          </article>
        </section>

        {canWrite && (
          <section className="reply-composer">
            <h2>Tulis balasan</h2>
            <form className="form-stack">
              <label>
                <textarea placeholder="Ringkasan" />
              </label>
              <div className="button-group">
                <button type="submit" className="button button-primary">Kirim Balasan</button>
                <button type="button" className="button button-secondary">Tambah Gambar</button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
