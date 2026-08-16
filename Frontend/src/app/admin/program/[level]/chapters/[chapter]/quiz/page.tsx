export function generateStaticParams() {
  const levels = ["n1", "n2", "n3", "n4", "n5"];
  const chapters = ["chapter-1", "chapter-2", "chapter-3", "chapter-4", "chapter-5"];
  const paths = [];
  for (const level of levels) {
    for (const chapter of chapters) {
      paths.push({ level, chapter });
    }
  }
  return paths;
}

import { ClientQuizBuilder } from "./client-page";

export default function Page({ params }: { params: Promise<{ level: string; chapter: string }> }) {
  return <ClientQuizBuilder params={params} />;
}
