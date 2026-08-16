export function generateStaticParams() {
  return [{ level: "n1" }, { level: "n2" }, { level: "n3" }, { level: "n4" }, { level: "n5" }];
}

import { ClientChapterBuilder } from "./client-page";

export default function Page({ params }: { params: Promise<{ level: string }> }) {
  return <ClientChapterBuilder params={params} />;
}
