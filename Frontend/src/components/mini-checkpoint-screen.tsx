"use client";

import { useState } from "react";
import { AssessmentRunner } from "@/components/assessment-runner";
import { miniCheckpointConfig, miniCheckpoints } from "@/lib/sensei-mock";

export function MiniCheckpointScreen() {
  const [view, setView] = useState<"list" | "info" | "runner">("list");
  const [selected, setSelected] = useState(miniCheckpoints[1]);
  if (view === "runner") return <AssessmentRunner config={miniCheckpointConfig} membership="sensei" />;
  if (view === "info") return <><button className="sensei-back" onClick={() => setView("list")}>← Mini Checkpoint</button><header className="sensei-page-head"><p className="dash-kicker">MINI CHECKPOINT • KELAS SENSEI</p><h1>{selected.level} • {selected.session} • {selected.part}</h1><p>Timer, score, passing score, dan review mengikuti konfigurasi mock.</p></header><section className="mini-info"><div><span>Level</span><strong>{selected.level}</strong></div><div><span>Sesi</span><strong>{selected.session}</strong></div><div><span>Part</span><strong>{selected.part}</strong></div><div><span>Timer</span><strong>Konfigurasi mock</strong></div><button onClick={() => setView("runner")}>Mulai Mini Checkpoint</button></section></>;
  return <><header className="sensei-page-head"><p className="dash-kicker">MINI CHECKPOINT • KELAS SENSEI</p><h1>Mini Checkpoint per level, sesi, dan part</h1><p>Khusus member Belajar dengan Sensei. Mini Checkpoint tersedia untuk N5, N4, N3, dan N2.</p></header><div className="mini-structure"><span>level</span><b>→</b><span>sesi</span><b>→</b><span>part</span></div><section className="mini-grid">{miniCheckpoints.map((item) => <article key={item.id}><span>{item.level}</span><h2>{item.session}</h2><p>{item.part}</p><button onClick={() => { setSelected(item); setView("info"); }}>Lihat Info</button></article>)}</section></>;
}
