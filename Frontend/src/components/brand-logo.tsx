import Image from "next/image";

export function BrandLogo({ className = "" }: { className?: string }) {
  return <span className={`official-brand-logo ${className}`.trim()}><Image src="/brand/hiru-academy-logo.png" alt="HIRU Academy" width={4084} height={637} priority /></span>;
}
