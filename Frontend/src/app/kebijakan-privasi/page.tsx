import { PublicPage } from "@/components/public-shell";

export default function PrivacyPage() {
  return <PublicPage><main className="public-main privacy-page"><article><p className="kicker">KEBIJAKAN PRIVASI</p><h1>Kebijakan Privasi Hiru Academy</h1><p>Halaman ini menjelaskan pemrosesan data yang diberikan saat menggunakan layanan Hiru Academy.</p><section><h2>Data yang diproses</h2><p>Data yang kamu masukkan dapat mencakup nama, nomor WhatsApp, target ujian, jawaban Placement Test, dan pilihan persetujuan.</p></section><section><h2>Tujuan pemrosesan</h2><p>Data digunakan untuk menjalankan Placement Test, menampilkan hasil dan rekomendasi level, serta menindaklanjuti informasi program hanya jika kamu memberikan persetujuan terkait.</p></section><section><h2>Pilihan persetujuan</h2><p>Persetujuan menerima penjelasan hasil dan informasi program melalui WhatsApp bersifat opsional dan tidak menjadi syarat untuk mengikuti Placement Test.</p></section></article></main></PublicPage>;
}
