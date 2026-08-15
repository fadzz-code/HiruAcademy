"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PublicPage } from "@/components/public-shell";

function InvoiceContent() {
  const params = useSearchParams();
  const levelParam = params.get("level");
  const level = ["n1", "n2", "n3", "n4", "n5"].includes(levelParam || "") ? levelParam!.toUpperCase() : "N4";
  const plan = params.get("plan") === "sensei" ? "Belajar dengan Sensei" : "Belajar Mandiri";
  const referral = params.get("referral") === "applied";

  return <><section className="invoice-hero"><p className="invoice-kicker">INVOICE BERHASIL DIBUAT</p><span className="invoice-status">Menunggu Verifikasi</span><h1>Selesaikan verifikasi melalui WhatsApp Admin</h1><p>Nomor admin, detail rekening, nominal final, dan proses aktivasi berasal dari konfigurasi backend.</p></section><div className="invoice-layout"><section className="invoice-detail"><h2>Detail Pesanan</h2><dl><div><dt>Invoice ID</dt><dd>Dibuat otomatis oleh sistem</dd></div><div><dt>Level</dt><dd>{level}</dd></div><div><dt>Program</dt><dd>{plan}</dd></div><div><dt>Harga</dt><dd>Harga sebelum diskon dari backend</dd></div><div><dt>Referral</dt><dd>{referral ? "Kode valid • diskon diterapkan" : "Belum diterapkan"}</dd></div><div><dt>Total</dt><dd>Nominal final setelah diskon dari backend</dd></div><div><dt>Status</dt><dd>Menunggu verifikasi</dd></div></dl></section><aside className="invoice-handoff"><div className="invoice-steps">{[["1", "Buka WhatsApp", "Gunakan nomor admin dari sistem."], ["2", "Terima instruksi", "Admin mengirim detail pembayaran."], ["3", "Verifikasi", "Membership aktif setelah transaksi diverifikasi."]].map(([number, title, description]) => <article key={number}><strong>{number}</strong><div><h2>{title}</h2><p>{description}</p></div></article>)}</div><button className="button button-primary invoice-whatsapp" type="button" disabled aria-describedby="whatsapp-notice">Buka WhatsApp Admin</button><p id="whatsapp-notice" className="invoice-backend-notice">Aksi WhatsApp akan menggunakan nomor dan template pesan dari backend; tidak ada nomor placeholder pada desain.</p><Link className="button button-dark" href="/program">Kembali ke Program</Link></aside></div><section className="invoice-announcement"><strong>Pengumuman</strong><p>Membership dan reward referral belum aktif sampai transaksi diverifikasi oleh Admin.</p></section></>;
}

export default function InvoicePage() {
  return <PublicPage active="Program"><main className="public-main invoice-page"><Suspense fallback={<p className="checkout-loading">Memuat invoice...</p>}><InvoiceContent /></Suspense></main></PublicPage>;
}
