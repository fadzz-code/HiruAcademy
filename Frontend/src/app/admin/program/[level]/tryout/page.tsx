import { ClientTryoutBuilder } from "./client-page";

export function generateStaticParams() {
  return ["n1", "n2", "n3", "n4", "n5"].map((level) => ({ level }));
}

export default function Page({ params }: { params: Promise<{ level: string }> }) {
  return <ClientTryoutBuilder params={params} />;
}
