import Image from "next/image";

export function BrandLogo({ className = "" }: { className?: string }) {
  return <span className={`official-brand-logo ${className}`.trim()}><Image src="/brand/hiru-bawah.png" alt="HIRU Academy" width={2212} height={356} priority /></span>;
}
