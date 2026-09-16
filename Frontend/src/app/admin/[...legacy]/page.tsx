import { notFound } from "next/navigation";
import { AdminScreen } from "@/components/admin-screen";
import { screens } from "@/lib/admin-console";

export function generateStaticParams() { return Object.keys(screens).map((route) => ({ legacy: [route] })); }

export default async function AdminRoutePage({ params }: { params: Promise<{ legacy: string[] }> }) {
  const { legacy } = await params;
  const key = legacy.join("/");
  const config = screens[key];
  if (!config) notFound();
  return <AdminScreen route={key} config={config}/>;
}
