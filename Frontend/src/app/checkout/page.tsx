"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PublicPage } from "@/components/public-shell";

const benefits = {
  lms: [["章", "Journey penuh", "Chapter, latihan, checkpoint."], ["試", "Try Out & Review", "Runner, hasil, dan review."], ["話", "Community write", "Akses diskusi member."]],
  sensei: [["章", "Journey penuh", "Chapter, latihan, checkpoint."], ["話", "Kelas bersama Sensei", "Cohort dan kelas langsung bersama Sensei."], ["再", "Replay kelas", "Replay tersedia setelah dipublikasikan."]],
};

function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();
  const level = ["n1", "n2", "n3", "n4", "n5"].includes(params.get("level") || "") ? params.get("level")!.toUpperCase() : "N4";
  const planKey = params.get("plan") === "sensei" ? "sensei" : "lms";
  const plan = planKey === "sensei" ? "Belajar dengan Sensei" : "Belajar Mandiri";
  const [referral, setReferral] = useState("");
  const [applied, setApplied] = useState(false);

  function createInvoice() {
    router.push(`/invoice?level=${level.toLowerCase()}&plan=${planKey}&referral=${applied ? "applied" : "none"}`);
  }

  return <div className="checkout-layout"><div className="checkout-main"><nav className="checkout-breadcrumb" aria-label="Breadcrumb"><Link href="/program">Program &amp; Level</Link><span>→</span><b>Order Summary</b></nav><header className="checkout-heading"><h1>Periksa pilihan sebelum membuat invoice</h1><p>Harga, periode, benefit, dan entitlement berasal dari konfigurasi admin setelah level dan plan dipilih.</p></header><section className="checkout-selection"><div><span className="checkout-level">JLPT {level}</span><span className="checkout-active">Pilihan Aktif</span></div><div className="checkout-plan"><strong aria-hidden="true">四</strong><div><small>PROGRAM TERPILIH</small><h2>{plan}</h2></div><Link className="button button-dark" href="/program">Ubah Pilihan</Link></div><div className="checkout-benefits">{benefits[planKey].map(([icon, title, description]) => <article key={title}><span>{icon}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></section><section className={`checkout-referral${applied ? " applied" : ""}`}><h2>{applied ? "Kode referral diterapkan" : "Kode referral untuk diskon (opsional)"}</h2><p>{applied ? "Kode valid memberi diskon pada pembelian ini. Pemilik kode menerima reward setelah invoice diverifikasi." : "Pengguna baru mendapat diskon. Reward pemilik kode aktif setelah pembayaran diverifikasi Admin."}</p><label>Kode Referral<div><input value={referral} onChange={(event) => setReferral(event.target.value)} placeholder="Masukkan kode jika ada" /><button className="button button-dark" type="button" disabled={!referral.trim()} onClick={() => setApplied(true)}>{applied ? "Diterapkan" : "Terapkan"}</button></div></label>{applied && <small>Kode valid • diskon aktif</small>}</section><section className="checkout-before"><p className="kicker">SEBELUM MEMBUAT INVOICE</p><ul><li>Pilihan level dan plan sudah benar</li><li>Harga dan periode mengikuti konfigurasi aktif</li><li>Membership aktif setelah invoice diverifikasi admin</li><li>Ketentuan pembelian dan privacy telah dibaca</li></ul></section></div><aside className="checkout-summary"><div className="checkout-illustration" aria-hidden="true"><strong>請</strong><span>注文</span></div><h2>Ringkasan pesanan</h2><dl><div><dt>Program</dt><dd>JLPT {level}</dd></div><div><dt>Plan</dt><dd>{plan}</dd></div><div><dt>Periode</dt><dd>Dinamis dari admin</dd></div><div><dt>Harga</dt><dd>{applied ? "Harga sebelum diskon" : "Dinamis setelah pilihan"}</dd></div><div><dt>Referral</dt><dd>{applied ? "Valid • diskon aktif" : "Belum diterapkan"}</dd></div><div className="checkout-total"><dt>TOTAL</dt><dd>{applied ? "Harga aktif − diskon referral" : "Mengikuti harga aktif di backend"}</dd></div></dl>{applied && <small>Nilai final dihitung backend</small>}<button className="button button-primary checkout-submit" onClick={createInvoice}>{applied ? "Buat Invoice" : "Buat Invoice & Buka WhatsApp"}</button><div className="checkout-announcement"><strong>Pengumuman</strong><p>{applied ? "Reward pemilik kode aktif setelah pembayaran invoice ini diverifikasi Admin." : "Invoice dibuat sebagai pencatatan backend, lalu pembayaran dilanjutkan melalui WhatsApp Admin."}</p></div></aside></div>;
}

export default function CheckoutPage() {
  return <PublicPage active="Program"><main className="public-main checkout-page"><Suspense fallback={<p className="checkout-loading">Memuat ringkasan...</p>}><CheckoutContent /></Suspense></main></PublicPage>;
}
