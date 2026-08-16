"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StudentNavigation } from "@/components/student-navigation";
import { parseMembership } from "@/lib/dashboard-mock";

export function CertificateDetailScreen() {
  const searchParams = useSearchParams();
  const membership = parseMembership(searchParams.get("membership") ?? undefined);
  const query = `?membership=${membership}`;

  return (
    <div className="supporting-shell student-shell">
      <StudentNavigation membership={membership} current="certificate" />
      <main className="supporting-main certificate-detail-page">
        <div className="progress-title-row">
          <header className="supporting-header">
            <p className="dash-kicker">DIGITAL CERTIFICATE</p>
            <h1>Sertifikat JLPT N5</h1>
            <p>Data penerima, nomor verifikasi, issue date, download, dan revocation mengikuti backend.</p>
          </header>
          <Link href={`/certificate${query}`}>Kembali ke Sertifikat</Link>
        </div>

        <section className="certificate-preview">
          <span aria-hidden="true">✓</span>
          <p className="dash-kicker">SERTIFIKAT KELULUSAN</p>
          <h2>Member •••1</h2>
          <p>Telah menyelesaikan program JLPT N5</p>
          <div className="certificate-actions">
            <button className="button button-dark disabled" type="button" aria-disabled="true">Download PDF</button>
            <button className="button button-secondary disabled" type="button" aria-disabled="true">Bagikan</button>
            <button className="button button-secondary disabled" type="button" aria-disabled="true">Salin Verification ID</button>
          </div>
        </section>

        <div className="certificate-grid-layout">
          <section className="certificate-verification">
            <h2>Status &amp; verifikasi</h2>
            <div className="verification-status"><span>Issued</span><span>Valid</span></div>
            <dl>
              <div><dt>Penerima</dt><dd>Member •••1</dd></div>
              <div><dt>Program</dt><dd>JLPT N5</dd></div>
              <div><dt>Verification ID</dt><dd>CERT•••N5</dd></div>
              <div><dt>Issue date</dt><dd>Dari backend</dd></div>
              <div><dt>Status</dt><dd>Valid</dd></div>
              <div><dt>Format</dt><dd>Digital PDF</dd></div>
            </dl>
          </section>

          <div className="certificate-sidebar">
            <section className="certificate-activity">
              <h2>Aktivitas sertifikat</h2>
              <ul>
                <li><strong>Diterbitkan</strong><span>Issue time dari backend</span><small>Tercatat</small></li>
                <li><strong>Diunduh</strong><span>Download log dari backend</span><small>Tercatat</small></li>
                <li><strong>Dibagikan</strong><span>Share event opsional</span><small>Opsional</small></li>
              </ul>
            </section>

            <section className="certificate-eligibility">
              <h2>Eligibility</h2>
              <ul>
                <li>Journey selesai</li>
                <li>Assessment memenuhi rule</li>
                <li>Membership valid saat completion</li>
                <li>Tidak ada revocation</li>
              </ul>
            </section>
          </div>
        </div>

        <aside className="certificate-notice">
          <strong>VERIFICATION</strong>
          <p>Status validitas harus diperiksa melalui backend. Data desain menggunakan nilai termasking.</p>
        </aside>
      </main>
    </div>
  );
}
