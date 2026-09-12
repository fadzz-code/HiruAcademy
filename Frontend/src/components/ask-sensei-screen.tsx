"use client";

import Link from "next/link";
import { useState } from "react";
import { LuImage } from "react-icons/lu";

export function AskSenseiScreen() {
  const [tab, setTab] = useState("Tanya Sensei");
  const [viewState, setViewState] = useState<"main" | "submitted" | "draft" | "attachment">("main");

  if (viewState === "submitted") {
    return (
      <section className="sensei-status-panel">
        <p className="dash-kicker">PERTANYAAN TERKIRIM</p>
        <h1>Pertanyaan untuk Sensei berhasil dikirim</h1>
        <span className="status-mark success">✓</span>
        <div className="status-announcement">
          <strong>Pengumuman</strong>
          <p>Pertanyaan tersimpan dan menunggu respons dari Sensei.</p>
        </div>
        <div className="status-topic">
          <small>TOPIK</small>
          <strong>Penggunaan pola kalimat Chapter 4</strong>
          <p>Sensei yang menangani dan jawaban akan ditampilkan pada riwayat pertanyaan.</p>
        </div>
        <button className="button button-primary" onClick={() => setViewState("main")}>
          Kembali ke Tanya Sensei
        </button>
      </section>
    );
  }

  if (viewState === "draft") {
    return (
      <section className="sensei-status-panel">
        <h1>Draft Pertanyaan Tersimpan</h1>
        <p>Draft disimpan pada akun dan dapat dilanjutkan dari tab Draft.</p>
        <span className="status-mark success">✓</span>
        <div className="status-announcement">
          <strong>Pengumuman</strong>
          <p>Draft tersimpan dengan aman.</p>
        </div>
        <div className="status-topic">
          <small>TOPIK</small>
          <strong>Konteks pertanyaan tetap tersimpan</strong>
          <p>Draft disimpan pada akun dan dapat dilanjutkan kapan saja.</p>
        </div>
        <button className="button button-primary" onClick={() => setViewState("main")}>
          Kembali ke Tanya Sensei
        </button>
      </section>
    );
  }

  if (viewState === "attachment") {
    return (
      <section className="sensei-status-panel">
        <p className="dash-kicker">TANYA SENSEI</p>
        <h1>Lampiran berhasil ditambahkan</h1>
        <p>
          File akan dikirim bersama pertanyaan dan dapat diakses oleh Sensei atau tim akademik terkait.
        </p>
        <div className="status-actions">
          <button className="button button-primary" onClick={() => setViewState("main")}>
            Kembali ke Pertanyaan
          </button>
          <Link className="button button-secondary" href="/dashboard?membership=sensei">
            Ke Dashboard
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="sensei-title-row">
        <header className="sensei-page-head">
          <p className="dash-kicker">TANYA SENSEI</p>
          <h1>Kirim pertanyaan yang terhubung ke materi, Chapter, replay, atau soal.</h1>
          <p>Pertanyaan dikirim ke antrean Sensei dan tim akademik sesuai konteks belajar.</p>
        </header>
        <Link className="button button-primary ask-community-btn" href="/community?membership=sensei">
          Buka Community
        </Link>
      </div>

      <div className="ask-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "Tanya Sensei"}
          className={tab === "Tanya Sensei" ? "active" : ""}
          onClick={() => setTab("Tanya Sensei")}
        >
          Tanya Sensei
        </button>
        <button
          role="tab"
          aria-selected={tab === "Riwayat"}
          className={tab === "Riwayat" ? "active" : ""}
          onClick={() => setTab("Riwayat")}
        >
          Riwayat Pertanyaan<small>Semua Plan</small>
        </button>
        <button
          role="tab"
          aria-selected={tab === "Draft"}
          className={tab === "Draft" ? "active" : ""}
          onClick={() => setTab("Draft")}
        >
          Draft<small>Tersimpan</small>
        </button>
      </div>

      {tab === "Tanya Sensei" ? (
        <section className="ask-layout">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setViewState("submitted");
            }}
          >
            <h2>Tulis pertanyaan untuk Sensei</h2>
            <p>Pilih konteks agar pertanyaan terhubung dengan chapter, materi, replay, atau soal tertentu.</p>
            <label>
              Konteks
              <select>
                <option>Chapter 4 • Video Lesson</option>
              </select>
            </label>
            <label>
              Jenis
              <select>
                <option>Pertanyaan Materi</option>
              </select>
            </label>
            <label>
              Judul Pertanyaan
              <input required placeholder="Ringkas pertanyaanmu" />
              <span>Teks bantuan opsional</span>
            </label>
            <label>
              <span>Ringkasan</span>
              <textarea required rows={5} />
            </label>
            <div className="ask-attachment">
              <span>
                <LuImage aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
                Lampirkan gambar
              </span>
              <p>Tambahkan screenshot materi atau soal bila diperlukan.</p>
               <button type="button" onClick={() => setViewState("attachment")}>
                 Lampirkan Gambar
               </button>
            </div>
            <div className="ask-submit-area">
              <div className="ask-submit-buttons">
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => setViewState("draft")}
                >
                  Simpan Draft
                </button>
                <button className="button button-primary" type="submit">
                  Kirim Pertanyaan
                </button>
              </div>
            </div>
          </form>
          <aside>
            <h2>Sensei / Tim Akademik</h2>
            <p>Sensei dan tim akademik akan meninjau serta menjawab pertanyaanmu sesuai antrean.</p>
            <div>
              <span>Waktu respons</span>
              <strong>Dijawab dalam 1x24 jam kerja sesuai urutan antrean.</strong>
            </div>
            <div className="ask-history-mini">
              <span>Riwayat terakhir</span>
              <ul>
                <li>
                  <b>Pertanyaan grammar Chapter 3</b>
                  <i>Terjawab</i>
                </li>
                <li>
                  <b>Pertanyaan replay kelas</b>
                  <i>Diproses</i>
                </li>
                <li>
                  <b>Catatan materi kanji</b>
                  <i>Draft</i>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      ) : (
        <section className="ask-empty">
          <h2>{tab}</h2>
          <p>Belum ada pertanyaan pada tab ini.</p>
        </section>
      )}
    </>
  );
}

