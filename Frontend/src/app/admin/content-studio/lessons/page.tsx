"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { defaultLessons, type LessonBlock, type LessonContent } from "@/lib/content-studio";

const levels: LessonContent["level"][] = ["N5", "N4", "N3", "N2", "N1"];
const chapters = Array.from({ length: 12 }, (_, index) => `chapter-${index + 1}`);
const statuses: LessonContent["status"][] = ["draft", "scheduled", "published", "archived"];
const videoAssets = ["/videos/pengenalan-hiragana.mp4", "/videos/partikel-dasar.mp4", "/videos/percakapan-harian.mp4"];
const imageAssets = ["/images/lesson/hiragana-chart.webp", "/images/lesson/japanese-classroom.webp", "/images/lesson/daily-activity.webp"];
const exerciseReferences = ["exercise-n5-chapter-1-01", "exercise-n5-chapter-1-02", "exercise-n4-chapter-2-01"];

const seeds: LessonContent[] = [
  {
    id: "lesson-n5-hiragana",
    level: "N5",
    chapter: "chapter-1",
    title: "Pengenalan Hiragana",
    description: "Pelajari bentuk, bunyi, dan penggunaan dasar Hiragana.",
    order: 1,
    status: "published",
    blocks: [
      { type: "video", src: videoAssets[0], title: "Pengenalan Hiragana" },
      { type: "japanese", professional: "日本語を勉強します。", beginner: "にほんごを べんきょうします。" },
      { type: "callout", heading: "Ingat", body: "Latih setiap karakter dengan membaca dan menulisnya." },
    ],
  },
  {
    id: "lesson-n4-particles",
    level: "N4",
    chapter: "chapter-2",
    title: "Partikel Dasar",
    description: "Kenali fungsi partikel dalam kalimat sederhana.",
    order: 2,
    status: "draft",
    blocks: [
      { type: "document", body: "Partikel membantu menunjukkan hubungan antarkata dalam kalimat." },
      { type: "exerciseReference", exerciseId: exerciseReferences[2] },
    ],
  },
];

const cloneLesson = (lesson: LessonContent): LessonContent => ({ ...lesson, blocks: lesson.blocks.map((block) => ({ ...block })) });

export default function LessonStudioPage() {
  const [lessons, setLessons] = useState<LessonContent[]>(() => (defaultLessons.length ? defaultLessons : seeds).map(cloneLesson));
  const [selectedId, setSelectedId] = useState(() => (defaultLessons[0] ?? seeds[0]).id);
  const [draft, setDraft] = useState<LessonContent>(() => cloneLesson(defaultLessons[0] ?? seeds[0]));
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [chapterFilter, setChapterFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notice, setNotice] = useState("Perubahan tersimpan sementara selama halaman ini terbuka.");

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id-ID");
    return lessons
      .filter((lesson) => !query || `${lesson.title} ${lesson.description}`.toLocaleLowerCase("id-ID").includes(query))
      .filter((lesson) => levelFilter === "all" || lesson.level === levelFilter)
      .filter((lesson) => chapterFilter === "all" || lesson.chapter === chapterFilter)
      .filter((lesson) => statusFilter === "all" || lesson.status === statusFilter)
      .sort((a, b) => a.order - b.order);
  }, [chapterFilter, lessons, levelFilter, search, statusFilter]);

  const selectLesson = (lesson: LessonContent) => {
    setSelectedId(lesson.id);
    setDraft(cloneLesson(lesson));
    setNotice("Mode edit lokal. Perubahan belum disimpan.");
  };

  const createLesson = () => {
    const id = `lesson-local-${Date.now()}`;
    const lesson: LessonContent = {
      id,
      level: "N5",
      chapter: "chapter-1",
      title: "Pelajaran Baru",
      description: "",
      order: lessons.length + 1,
      status: "draft",
      blocks: [],
    };
    setLessons((current) => [...current, lesson]);
    selectLesson(lesson);
  };

  const save = (status: LessonContent["status"]) => {
    const next = { ...draft, status, title: draft.title.trim(), description: draft.description.trim() };
    if (!next.title) {
      setNotice("Judul wajib diisi sebelum menyimpan.");
      return;
    }
    setDraft(next);
    setLessons((current) => current.map((lesson) => (lesson.id === selectedId ? cloneLesson(next) : lesson)));
    setNotice(status === "published" ? "Versi lokal ditandai published. Server tidak berubah." : "Draft tersimpan lokal. Server tidak berubah.");
  };

  const duplicate = (lesson: LessonContent) => {
    const copy = { ...cloneLesson(lesson), id: `lesson-local-${Date.now()}`, title: `${lesson.title} (Salinan)`, order: lessons.length + 1, status: "draft" as const };
    setLessons((current) => [...current, copy]);
    selectLesson(copy);
    setNotice("Salinan dibuat lokal sebagai draft. Server tidak berubah.");
  };

  const archive = (lesson: LessonContent) => {
    if (!window.confirm(`Arsipkan “${lesson.title}”? Perubahan ini hanya berlaku lokal.`)) return;
    const archived = { ...lesson, status: "archived" as const };
    setLessons((current) => current.map((item) => (item.id === lesson.id ? archived : item)));
    if (selectedId === lesson.id) setDraft(cloneLesson(archived));
    setNotice("Pelajaran diarsipkan lokal. Server tidak berubah.");
  };

  const moveLesson = (lesson: LessonContent, direction: -1 | 1) => {
    const ordered = [...lessons].sort((a, b) => a.order - b.order);
    const index = ordered.findIndex((item) => item.id === lesson.id);
    const target = ordered[index + direction];
    if (!target) return;
    setLessons((current) => current.map((item) => item.id === lesson.id ? { ...item, order: target.order } : item.id === target.id ? { ...item, order: lesson.order } : item));
  };

  const updateBlock = (index: number, block: LessonBlock) => setDraft((current) => ({ ...current, blocks: current.blocks.map((item, itemIndex) => itemIndex === index ? block : item) }));
  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= draft.blocks.length) return;
    const blocks = [...draft.blocks];
    [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
    setDraft((current) => ({ ...current, blocks }));
  };
  const removeBlock = (index: number) => setDraft((current) => ({ ...current, blocks: current.blocks.filter((_, itemIndex) => itemIndex !== index) }));

  return (
    <AdminShell current="content-studio">
      <main className="admin-page builder-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • CONTENT STUDIO • LESSONS</p>
            <h1>Lesson Builder</h1>
            <p>Kelola struktur pelajaran dan preview blok pembelajaran.</p>
          </div>
          <div className="admin-header-actions">
            <Link className="button button-secondary" href="/admin/content-studio">Back</Link>
            <button className="button button-primary" type="button" onClick={createLesson}>Create Lesson</button>
          </div>
        </header>

        <aside className="admin-context-info-card">
          <div className="admin-context-info-badge">Target Tampilan Siswa</div>
          <div className="admin-context-info-content">
            <strong>Halaman yang diubah: /learn/[level]/[chapter] (Ruang Pembelajaran Siswa)</strong>
            <p>
              Editor ini mengatur konten materi yang dipelajari siswa di setiap bab (misalnya Video Pelajaran, Catatan Tata Bahasa, Kanji, dan Latihan).
            </p>
          </div>
        </aside>

        <p className="admin-local-feedback" role="status">{notice}</p>

        <section className="admin-section" aria-labelledby="lesson-list-heading">
          <div className="builder-section-title"><h2 id="lesson-list-heading">Lessons</h2><span>{filteredLessons.length} hasil</span></div>
          <div className="admin-filter-bar">
            <label className="admin-field"><span>Search</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari judul atau deskripsi" /></label>
            <label className="admin-field"><span>Level</span><select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}><option value="all">Semua level</option>{levels.map((level) => <option key={level}>{level}</option>)}</select></label>
            <label className="admin-field"><span>Chapter</span><select value={chapterFilter} onChange={(event) => setChapterFilter(event.target.value)}><option value="all">Semua chapter</option>{chapters.map((chapter) => <option key={chapter}>{chapter}</option>)}</select></label>
            <label className="admin-field"><span>Status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">Semua status</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          </div>
          <div className="module-list">
            {filteredLessons.map((lesson, index) => <article className={`module-item ${selectedId === lesson.id ? "active" : ""}`} key={lesson.id}>
              <div className="module-content">
                <div className="module-meta-row">
                  <small>{lesson.level} • {lesson.chapter} • Urutan {lesson.order}</small>
                  <span className={`admin-status status-${lesson.status === "published" ? "active" : "pending"}`}>{lesson.status}</span>
                </div>
                <strong className="module-title-text">{lesson.title}</strong>
                {lesson.description && <p className="module-desc-text">{lesson.description}</p>}
              </div>
              <div className="module-actions">
                <button className="button button-secondary" type="button" onClick={() => selectLesson(lesson)}>Edit</button>
                <button className="button button-secondary" type="button" onClick={() => duplicate(lesson)}>Duplicate</button>
                <button className="button-icon" type="button" aria-label={`Naikkan ${lesson.title}`} disabled={index === 0} onClick={() => moveLesson(lesson, -1)}>↑</button>
                <button className="button-icon" type="button" aria-label={`Turunkan ${lesson.title}`} disabled={index === filteredLessons.length - 1} onClick={() => moveLesson(lesson, 1)}>↓</button>
                <button className="button button-secondary" type="button" disabled={lesson.status === "archived"} onClick={() => archive(lesson)}>Archive</button>
              </div>
            </article>)}
            {!filteredLessons.length && <p>Tidak ada pelajaran yang cocok dengan filter.</p>}
          </div>
        </section>

        <div className="builder-layout builder-layout-stacked">
          <section className="builder-main" aria-labelledby="editor-heading">
            <header className="builder-main-head"><p className="admin-kicker">EDITOR</p><h2 id="editor-heading">{draft.title || "Pelajaran tanpa judul"}</h2></header>
            <div className="builder-section">
              <div className="admin-form-grid">
                <label className="admin-field"><span>Level</span><select className="admin-shadow-select" value={draft.level} onChange={(event) => setDraft({ ...draft, level: event.target.value as LessonContent["level"] })}>{levels.map((level) => <option key={level}>{level}</option>)}</select></label>
                <label className="admin-field"><span>Chapter</span><select className="admin-shadow-select" value={draft.chapter} onChange={(event) => setDraft({ ...draft, chapter: event.target.value })}>{chapters.map((chapter) => <option key={chapter}>{chapter}</option>)}</select></label>
                <label className="admin-field"><span>Order</span><input className="admin-shadow-input" type="number" min="1" value={draft.order} onChange={(event) => setDraft({ ...draft, order: Math.max(1, Number(event.target.value) || 1) })} /></label>
                <label className="admin-field"><span>Status</span><select className="admin-shadow-select" value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as LessonContent["status"] })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
              </div>
              <label className="admin-field"><span>Title</span><input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
              <label className="admin-field"><span>Description</span><textarea rows={3} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label>
            </div>

            <div className="builder-section">
              <div className="builder-section-title"><div><h3>Blok Materi Pembelajaran</h3><p>Daftar media dan komponen pembelajaran pada bab ini.</p></div></div>
              <div className="module-list">
                {draft.blocks.map((block, index) => <article className="module-item" key={`${block.type}-${index}`}>
                  <div className="module-content">
                    <small>Blok {index + 1}</small><strong>{block.type}</strong>
                    {block.type === "video" && <><label className="admin-field"><span>Video asset</span><select value={block.src} onChange={(event) => updateBlock(index, { ...block, src: event.target.value })}>{videoAssets.map((src) => <option key={src} value={src}>{src.split("/").at(-1)}</option>)}</select></label><label className="admin-field"><span>Title</span><input value={block.title ?? ""} onChange={(event) => updateBlock(index, { ...block, title: event.target.value })} /></label></>}
                    {block.type === "document" && <label className="admin-field"><span>Document text</span><textarea rows={4} value={block.body} onChange={(event) => updateBlock(index, { ...block, body: event.target.value })} /></label>}
                    {block.type === "japanese" && <><label className="admin-field"><span>Japanese professional</span><textarea rows={2} lang="ja" value={block.professional} onChange={(event) => updateBlock(index, { ...block, professional: event.target.value })} /></label><label className="admin-field"><span>Japanese beginner</span><textarea rows={2} lang="ja" value={block.beginner} onChange={(event) => updateBlock(index, { ...block, beginner: event.target.value })} /></label></>}
                    {block.type === "image" && <><label className="admin-field"><span>Image asset</span><select value={block.src} onChange={(event) => updateBlock(index, { ...block, src: event.target.value })}>{imageAssets.map((src) => <option key={src} value={src}>{src.split("/").at(-1)}</option>)}</select></label><label className="admin-field"><span>Alternative text</span><input value={block.alt} onChange={(event) => updateBlock(index, { ...block, alt: event.target.value })} /></label></>}
                    {block.type === "callout" && <><label className="admin-field"><span>Heading</span><input value={block.heading ?? ""} onChange={(event) => updateBlock(index, { ...block, heading: event.target.value })} /></label><label className="admin-field"><span>Body</span><textarea rows={3} value={block.body} onChange={(event) => updateBlock(index, { ...block, body: event.target.value })} /></label></>}
                    {block.type === "exerciseReference" && <label className="admin-field"><span>Exercise</span><select value={block.exerciseId} onChange={(event) => updateBlock(index, { ...block, exerciseId: event.target.value })}>{exerciseReferences.map((id) => <option key={id}>{id}</option>)}</select></label>}
                  </div>
                  <div className="module-actions"><button className="button-icon" type="button" aria-label={`Naikkan blok ${index + 1}`} disabled={index === 0} onClick={() => moveBlock(index, -1)}>↑</button><button className="button-icon" type="button" aria-label={`Turunkan blok ${index + 1}`} disabled={index === draft.blocks.length - 1} onClick={() => moveBlock(index, 1)}>↓</button><button className="button button-secondary" type="button" onClick={() => removeBlock(index)}>Remove</button></div>
                </article>)}
              </div>
            </div>

            <div className="builder-main-actions">
              <button className="button button-secondary" type="button" onClick={() => save("draft")}>Save Draft</button>
              <button className="button button-primary" type="button" onClick={() => save("published")}>{draft.status === "published" ? "Update" : "Publish"}</button>
              <Link className="button button-secondary" href="/admin/content-studio">Back</Link>
            </div>
          </section>

          <aside className="builder-sidebar" aria-labelledby="preview-heading">
            <div className="builder-section-title"><h2 id="preview-heading">Pratinjau Materi Siswa (Preview)</h2></div>
            <article className="admin-action-card"><small>{draft.level} • {draft.chapter}</small><h3>{draft.title || "Pelajaran tanpa judul"}</h3><p>{draft.description}</p></article>
            {draft.blocks.map((block, index) => <article className="admin-action-card" key={`preview-${block.type}-${index}`}>
              {block.type === "video" && <><h3>{block.title || "Video"}</h3><video controls preload="metadata" src={block.src}>Browser tidak mendukung video.</video></>}
              {block.type === "document" && <p>{block.body || "Teks dokumen belum diisi."}</p>}
              {block.type === "japanese" && <><p lang="ja"><strong>Professional:</strong> {block.professional || "Belum diisi"}</p><p lang="ja"><strong>Beginner:</strong> {block.beginner || "Belum diisi"}</p></>}
              {block.type === "image" && <><Image src={block.src || "/brand/hiru-footer.png"} alt={block.alt || "Preview gambar pelajaran"} width={480} height={270} /><p>{block.alt || "Alternative text belum diisi."}</p></>}
              {block.type === "callout" && <><h3>{block.heading || "Callout"}</h3><p>{block.body || "Isi callout belum diisi."}</p></>}
              {block.type === "exerciseReference" && <><h3>Exercise</h3><p>{block.exerciseId}</p></>}
            </article>)}
          </aside>
        </div>
      </main>
    </AdminShell>
  );
}
