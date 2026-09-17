"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { AdminShell } from "@/components/admin-shell";
import {
  AdminBreadcrumb,
  AdminConfirmDialog,
  AdminDataTable,
  AdminDialog,
  AdminEmptyState,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTabs,
} from "@/components/admin-primitives";
import {
  savePlacementStore,
  usePlacementAdminStore,
  type PlacementConfig,
  type PlacementOption,
  type PlacementQuestion,
  type RecommendationRule,
} from "@/lib/admin-placement-store";

const TABS = ["Placement Test", "Aturan Hasil", "Hasil Tes", "Lead"] as const;
const QUESTION_AREAS = ["Bunpou", "Moji・Goi", "Dokkai", "Choukai"] as const;
const PROGRAM_CODES = ["DASAR", "N5", "N4", "N3", "N2"] as const;

function uid(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function moveItem<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  if (toIndex < 0 || toIndex >= arr.length) return arr;
  const next = [...arr];
  const [target] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, target);
  return next;
}

export function validateRecommendationRules(rules: RecommendationRule[]): {
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (rules.length === 0) {
    errors.push("Aturan hasil minimal membutuhkan satu rentang skor.");
    return { errors, warnings };
  }

  for (let i = 0; i < rules.length; i++) {
    const r = rules[i];
    if (r.minScore < 0 || r.maxScore > 100) {
      errors.push(`Aturan ${i + 1}: Skor harus berada dalam rentang 0 s.d. 100.`);
    }
    if (r.minScore > r.maxScore) {
      errors.push(`Aturan ${i + 1}: Skor minimum (${r.minScore}) lebih besar dari skor maksimum (${r.maxScore}).`);
    }
    if (!r.recommendedProgramCode.trim()) {
      errors.push(`Aturan ${i + 1}: Program rekomendasi wajib dipilih.`);
    }
  }

  const sorted = [...rules].sort((a, b) => a.minScore - b.minScore);
  for (let i = 0; i < sorted.length - 1; i++) {
    const cur = sorted[i];
    const nxt = sorted[i + 1];
    if (cur.maxScore >= nxt.minScore) {
      errors.push(
        `Terdapat tumpang tindih rentang skor antara [${cur.minScore}-${cur.maxScore}] dan [${nxt.minScore}-${nxt.maxScore}].`
      );
    } else if (cur.maxScore + 1 < nxt.minScore) {
      warnings.push(
        `Terdapat celah skor ${cur.maxScore + 1} s.d. ${nxt.minScore - 1} yang belum tercakup aturan.`
      );
    }
  }

  if (sorted.length > 0) {
    if (sorted[0].minScore > 0) {
      warnings.push(`Terdapat celah skor 0 s.d. ${sorted[0].minScore - 1} di awal yang belum tercakup.`);
    }
    if (sorted[sorted.length - 1].maxScore < 100) {
      warnings.push(
        `Terdapat celah skor ${sorted[sorted.length - 1].maxScore + 1} s.d. 100 di akhir yang belum tercakup.`
      );
    }
  }

  return { errors, warnings };
}

export function validatePlacementTest(config: PlacementConfig): {
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];

  if (!config.title.trim()) {
    errors.push("Judul tes wajib diisi.");
  }
  if (config.questions.length === 0) {
    errors.push("Assessment membutuhkan minimal satu pertanyaan.");
  }

  config.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    if (!q.prompt.trim()) {
      errors.push(`Soal ${qNum}: Pertanyaan (prompt) tidak boleh kosong.`);
    }
    if (q.options.length < 2) {
      errors.push(`Soal ${qNum}: Minimal membutuhkan 2 pilihan jawaban.`);
    }
    const hasCorrect = q.options.some((opt) => opt.isCorrect);
    if (!hasCorrect) {
      errors.push(`Soal ${qNum}: Harus memilih satu jawaban benar.`);
    }
  });

  const ruleValidation = validateRecommendationRules(config.rules);
  errors.push(...ruleValidation.errors);

  return { errors, warnings: ruleValidation.warnings };
}

export function PlacementBuilder() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const store = usePlacementAdminStore();

  if (!isClient) {
    return (
      <AdminShell current="/admin/placement-hasil">
        <main className="admin-page placement-admin">
          <AdminBreadcrumb
            items={[
              { label: "Admin", href: "/admin" },
              { label: "Placement & Hasil" },
            ]}
          />
          <AdminPageHeader
            eyebrow="ADMIN • OPERASIONAL"
            title="Placement & Hasil"
            description="Kelola bank soal placement test, aturan hasil evaluasi, serta pantau pencapaian tes dan daftar kontak lead."
          />
          <span role="status">Memuat placement…</span>
        </main>
      </AdminShell>
    );
  }

  return <PlacementBuilderEditor key={store.config.id} initialStore={store} />;
}

function PlacementBuilderEditor({
  initialStore,
}: {
  initialStore: ReturnType<typeof usePlacementAdminStore>;
}) {
  const store = initialStore;
  const [config, setConfig] = useState<PlacementConfig>(initialStore.config);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Placement Test");
  const [mobileMode, setMobileMode] = useState<"Outline" | "Editor">("Outline");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(
    initialStore.config.questions[0]?.id ?? ""
  );

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [runnerOpen, setRunnerOpen] = useState(false);
  const [runnerIndex, setRunnerIndex] = useState(0);
  const [runnerAnswers, setRunnerAnswers] = useState<Record<string, string>>({});
  const [runnerFinished, setRunnerFinished] = useState(false);

  const [ruleScoreInput, setRuleScoreInput] = useState<number>(65);

  const [attemptSearch, setAttemptSearch] = useState("");
  const [attemptLevel, setAttemptLevel] = useState("Semua");

  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatus, setLeadStatus] = useState<"Semua" | "Baru" | "Sudah Dihubungi">("Semua");

  const [deleteConfirm, setDeleteConfirm] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const activeQuestion =
    config.questions.find((q) => q.id === selectedQuestionId) ?? config.questions[0];

  function updateConfig(patch: Partial<PlacementConfig>) {
    setConfig((prev) => ({ ...prev, ...patch }));
    setFeedback(null);
  }

  function handleSaveDraft() {
    const updated: PlacementConfig = {
      ...config,
      status: "Draft",
      updatedAt: new Date().toISOString(),
    };
    setConfig(updated);
    savePlacementStore({
      ...store,
      config: updated,
    });
    setValidationErrors([]);
    setFeedback("Draft placement test berhasil disimpan.");
  }

  function handlePublish() {
    const result = validatePlacementTest(config);
    setValidationErrors(result.errors);
    setValidationWarnings(result.warnings);

    if (result.errors.length > 0) {
      setFeedback(null);
      return;
    }

    const updated: PlacementConfig = {
      ...config,
      status: "Published",
      updatedAt: new Date().toISOString(),
    };
    setConfig(updated);
    savePlacementStore({
      ...store,
      config: updated,
      publishedConfig: updated,
    });
    setFeedback("Placement test berhasil diterbitkan!");
  }

  function handleAddQuestion() {
    const newId = uid("pq");
    const newQuestion: PlacementQuestion = {
      id: newId,
      number: config.questions.length + 1,
      area: "Bunpou",
      prompt: "",
      options: [
        { id: `${newId}-opt-1`, text: "", isCorrect: true },
        { id: `${newId}-opt-2`, text: "", isCorrect: false },
        { id: `${newId}-opt-3`, text: "", isCorrect: false },
        { id: `${newId}-opt-4`, text: "", isCorrect: false },
      ],
    };
    const nextQuestions = [...config.questions, newQuestion];
    updateConfig({ questions: nextQuestions });
    setSelectedQuestionId(newId);
    setMobileMode("Editor");
  }

  function handleDuplicateQuestion(question: PlacementQuestion) {
    const newId = uid("pq");
    const duplicated: PlacementQuestion = {
      ...question,
      id: newId,
      number: config.questions.length + 1,
      prompt: `${question.prompt} (Salinan)`,
      options: question.options.map((opt, idx) => ({
        ...opt,
        id: `${newId}-opt-${idx + 1}`,
      })),
    };
    const index = config.questions.findIndex((q) => q.id === question.id);
    const next = [...config.questions];
    next.splice(index + 1, 0, duplicated);
    const renumbered = next.map((q, i) => ({ ...q, number: i + 1 }));
    updateConfig({ questions: renumbered });
    setSelectedQuestionId(newId);
    setMobileMode("Editor");
  }

  function handleDeleteQuestion(questionId: string) {
    const next = config.questions
      .filter((q) => q.id !== questionId)
      .map((q, idx) => ({ ...q, number: idx + 1 }));
    updateConfig({ questions: next });
    if (selectedQuestionId === questionId) {
      setSelectedQuestionId(next[0]?.id ?? "");
    }
  }

  function handleMoveQuestion(from: number, to: number) {
    const moved = moveItem(config.questions, from, to).map((q, idx) => ({
      ...q,
      number: idx + 1,
    }));
    updateConfig({ questions: moved });
  }

  function handleUpdateActiveQuestion(patch: Partial<PlacementQuestion>) {
    if (!activeQuestion) return;
    const nextQuestions = config.questions.map((q) =>
      q.id === activeQuestion.id ? { ...q, ...patch } : q
    );
    updateConfig({ questions: nextQuestions });
  }

  function handleAddOption() {
    if (!activeQuestion) return;
    const newOpt: PlacementOption = {
      id: uid(`${activeQuestion.id}-opt`),
      text: "",
      isCorrect: activeQuestion.options.length === 0,
    };
    handleUpdateActiveQuestion({
      options: [...activeQuestion.options, newOpt],
    });
  }

  function handleUpdateOption(optionId: string, patch: Partial<PlacementOption>) {
    if (!activeQuestion) return;
    const nextOptions = activeQuestion.options.map((opt) => {
      if (opt.id !== optionId) {
        return patch.isCorrect ? { ...opt, isCorrect: false } : opt;
      }
      return { ...opt, ...patch };
    });
    handleUpdateActiveQuestion({ options: nextOptions });
  }

  function handleDeleteOption(optionId: string) {
    if (!activeQuestion) return;
    const nextOptions = activeQuestion.options.filter((opt) => opt.id !== optionId);
    if (!nextOptions.some((opt) => opt.isCorrect) && nextOptions.length > 0) {
      nextOptions[0].isCorrect = true;
    }
    handleUpdateActiveQuestion({ options: nextOptions });
  }

  function handleMoveOption(from: number, to: number) {
    if (!activeQuestion) return;
    const nextOptions = moveItem(activeQuestion.options, from, to);
    handleUpdateActiveQuestion({ options: nextOptions });
  }

  function handleAddRule() {
    const newRule: RecommendationRule = {
      id: uid("rule"),
      minScore: 0,
      maxScore: 100,
      recommendedProgramCode: "N5",
      resultTitle: "Rekomendasi Level N5",
      resultDescription: "",
      ctaLabel: "Lihat Program N5",
      ctaDestination: "/program",
      order: config.rules.length + 1,
    };
    const next = [...config.rules, newRule];
    updateConfig({ rules: next });
  }

  function handleUpdateRule(ruleId: string, patch: Partial<RecommendationRule>) {
    const next = config.rules.map((r) => (r.id === ruleId ? { ...r, ...patch } : r));
    updateConfig({ rules: next });
  }

  function handleDeleteRule(ruleId: string) {
    const next = config.rules
      .filter((r) => r.id !== ruleId)
      .map((r, idx) => ({ ...r, order: idx + 1 }));
    updateConfig({ rules: next });
  }

  function handleMoveRule(from: number, to: number) {
    const moved = moveItem(config.rules, from, to).map((r, idx) => ({
      ...r,
      order: idx + 1,
    }));
    updateConfig({ rules: moved });
  }

  function handleSaveRules() {
    const res = validateRecommendationRules(config.rules);
    if (res.errors.length > 0) {
      setValidationErrors(res.errors);
      setValidationWarnings(res.warnings);
      return;
    }
    setValidationErrors([]);
    setValidationWarnings(res.warnings);
    const updated = {
      ...config,
      updatedAt: new Date().toISOString(),
    };
    savePlacementStore({
      ...store,
      config: updated,
      publishedConfig: store.publishedConfig
        ? { ...store.publishedConfig, rules: config.rules }
        : undefined,
    });
    setFeedback("Aturan hasil berhasil disimpan.");
  }

  function startRunner() {
    setRunnerIndex(0);
    setRunnerAnswers({});
    setRunnerFinished(false);
    setRunnerOpen(true);
  }

  function calculateRunnerScore() {
    const total = config.questions.length;
    if (total === 0) return { score: 0, correct: 0, total: 0 };
    let correct = 0;
    config.questions.forEach((q) => {
      const chosen = runnerAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (chosen && correctOpt && chosen === correctOpt.id) {
        correct++;
      }
    });
    const score = Math.round((correct / total) * 100);
    return { score, correct, total };
  }

  const matchedRuleForScore = config.rules
    .slice()
    .sort((a, b) => a.order - b.order)
    .find((r) => ruleScoreInput >= r.minScore && ruleScoreInput <= r.maxScore);

  const ruleValidationRealtime = validateRecommendationRules(config.rules);

  const filteredAttempts = store.leads.filter((item) => {
    const query = attemptSearch.trim().toLowerCase();
    const matchQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.target.toLowerCase().includes(query) ||
      item.recommendedLevel.toLowerCase().includes(query);
    const matchLevel =
      attemptLevel === "Semua" ||
      item.recommendedLevel.toUpperCase() === attemptLevel.toUpperCase();
    return matchQuery && matchLevel;
  });

  const filteredLeads = store.leads.filter((lead) => {
    const query = leadSearch.trim().toLowerCase();
    const matchQuery =
      !query ||
      lead.name.toLowerCase().includes(query) ||
      lead.whatsapp.toLowerCase().includes(query);
    const matchStatus = leadStatus === "Semua" || lead.status === leadStatus;
    return matchQuery && matchStatus;
  });

  function handleToggleLeadStatus(leadId: string) {
    const nextLeads = store.leads.map((l) =>
      l.id === leadId
        ? {
            ...l,
            status:
              l.status === "Baru"
                ? ("Sudah Dihubungi" as const)
                : ("Baru" as const),
          }
        : l
    );
    savePlacementStore({
      ...store,
      leads: nextLeads,
    });
  }

  const baseInputId = useId();

  return (
    <AdminShell current="/admin/placement-hasil">
      <main className="admin-page placement-admin">
        <AdminBreadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Placement & Hasil" },
          ]}
        />
        <AdminPageHeader
          eyebrow="ADMIN • OPERASIONAL"
          title="Placement & Hasil"
          description="Kelola bank soal placement test, aturan hasil evaluasi, serta pantau pencapaian tes dan daftar kontak lead."
        />

        <AdminTabs
          tabs={TABS}
          active={activeTab}
          onChange={(tab) => {
            setActiveTab(tab as (typeof TABS)[number]);
            setFeedback(null);
          }}
          label="Placement sections"
        >
          {feedback && (
            <div className="placement-notice" role="status">
              <span>{feedback}</span>
              <button
                type="button"
                className="placement-notice-dismiss"
                onClick={() => setFeedback(null)}
                aria-label="Tutup pesan"
              >
                ×
              </button>
            </div>
          )}

          {activeTab === "Placement Test" && (
            <div className="placement-tab-content">
              <div className="placement-pub-bar">
                <div className="placement-pub-status">
                  <span>Status:</span>
                  <AdminStatusBadge
                    status={config.status === "Published" ? "Terbit" : "Draft"}
                  />
                  <small>
                    Terakhir diperbarui:{" "}
                    {new Date(config.updatedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </div>
                <div className="placement-pub-actions">
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={startRunner}
                  >
                    Pratinjau Tes
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={handleSaveDraft}
                  >
                    Simpan Draft
                  </button>
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={handlePublish}
                  >
                    Terbitkan
                  </button>
                </div>
              </div>

              {validationErrors.length > 0 && (
                <div className="placement-alert-error" role="alert">
                  <strong>Publikasi diblokir karena terdapat kesalahan:</strong>
                  <ul>
                    {validationErrors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationWarnings.length > 0 && (
                <div className="placement-alert-warning" role="alert">
                  <strong>Peringatan konfigurasi:</strong>
                  <ul>
                    {validationWarnings.map((warn) => (
                      <li key={warn}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}

              <section className="placement-settings-box">
                <h2>Pengaturan Placement Test</h2>
                <div className="placement-settings-grid">
                  <label htmlFor={`${baseInputId}-title`}>
                    <span>Judul Tes</span>
                    <input
                      id={`${baseInputId}-title`}
                      type="text"
                      value={config.title}
                      onChange={(e) => updateConfig({ title: e.target.value })}
                      placeholder="Contoh: Placement Test HIRU Academy"
                    />
                  </label>
                  <label htmlFor={`${baseInputId}-intro`}>
                    <span>Intro Heading</span>
                    <input
                      id={`${baseInputId}-intro`}
                      type="text"
                      value={config.introHeading}
                      onChange={(e) => updateConfig({ introHeading: e.target.value })}
                      placeholder="Contoh: Ketahui Level Bahasa Jepangmu"
                    />
                  </label>
                  <label htmlFor={`${baseInputId}-duration`}>
                    <span>Durasi Pengerjaan (menit)</span>
                    <input
                      id={`${baseInputId}-duration`}
                      type="number"
                      min={1}
                      value={config.durationMinutes}
                      onChange={(e) =>
                        updateConfig({
                          durationMinutes: Math.max(1, Number(e.target.value) || 1),
                        })
                      }
                    />
                  </label>
                  <label
                    htmlFor={`${baseInputId}-desc`}
                    className="placement-span-full"
                  >
                    <span>Deskripsi Tes</span>
                    <textarea
                      id={`${baseInputId}-desc`}
                      rows={2}
                      value={config.description}
                      onChange={(e) => updateConfig({ description: e.target.value })}
                      placeholder="Deskripsi singkat mengenai tes placement..."
                    />
                  </label>
                </div>
              </section>

              <div className="assessment-mobile-tabs">
                <button
                  type="button"
                  className={mobileMode === "Outline" ? "active" : ""}
                  onClick={() => setMobileMode("Outline")}
                >
                  Outline ({config.questions.length} Soal)
                </button>
                <button
                  type="button"
                  className={mobileMode === "Editor" ? "active" : ""}
                  onClick={() => setMobileMode("Editor")}
                >
                  Editor Soal
                </button>
              </div>

              <div className="placement-workspace">
                <aside
                  className={`placement-outline-col ${
                    mobileMode === "Outline" ? "mobile-active" : ""
                  }`}
                >
                  <div className="placement-outline-head">
                    <h3>Daftar Soal</h3>
                    <button
                      type="button"
                      className="button button-primary button-sm"
                      onClick={handleAddQuestion}
                    >
                      + Tambah Pertanyaan
                    </button>
                  </div>

                  {config.questions.length === 0 ? (
                    <p className="placement-empty-text">Belum ada pertanyaan dibuat.</p>
                  ) : (
                    <ol className="placement-outline-list">
                      {config.questions.map((q, idx) => {
                        const isSelected = q.id === activeQuestion?.id;
                        return (
                          <li
                            key={q.id}
                            className={`placement-outline-item ${
                              isSelected ? "active" : ""
                            }`}
                          >
                            <button
                              type="button"
                              className="placement-outline-select"
                              onClick={() => {
                                setSelectedQuestionId(q.id);
                                setMobileMode("Editor");
                              }}
                            >
                              <div className="placement-outline-meta">
                                <span className="placement-q-num">#{idx + 1}</span>
                                <span className="placement-q-area">{q.area}</span>
                              </div>
                              <p className="placement-q-preview">
                                {q.prompt.trim() ? q.prompt : "(Pertanyaan kosong)"}
                              </p>
                            </button>
                            <div className="placement-outline-order-btns">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveQuestion(idx, idx - 1)}
                                aria-label={`Pindahkan soal ${idx + 1} ke atas`}
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                disabled={idx === config.questions.length - 1}
                                onClick={() => handleMoveQuestion(idx, idx + 1)}
                                aria-label={`Pindahkan soal ${idx + 1} ke bawah`}
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                className="placement-del-btn"
                                onClick={() =>
                                  setDeleteConfirm({
                                    title: "Hapus Pertanyaan?",
                                    message: `Apakah Anda yakin ingin menghapus Soal #${idx + 1}?`,
                                    onConfirm: () => handleDeleteQuestion(q.id),
                                  })
                                }
                                aria-label={`Hapus soal ${idx + 1}`}
                              >
                                ✕
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </aside>

                <section
                  className={`placement-editor-col ${
                    mobileMode === "Editor" ? "mobile-active" : ""
                  }`}
                >
                  {!activeQuestion ? (
                    <div className="placement-editor-empty">
                      <p>Pilih pertanyaan dari daftar atau tambahkan pertanyaan baru.</p>
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={handleAddQuestion}
                      >
                        + Tambah Pertanyaan
                      </button>
                    </div>
                  ) : (
                    <div className="placement-editor-panel">
                      <header className="placement-editor-head">
                        <div>
                          <h3>Editor Soal #{activeQuestion.number}</h3>
                          <small>Atur pertanyaan, opsi jawaban, dan pembahasan.</small>
                        </div>
                        <div className="placement-editor-actions">
                          <button
                            type="button"
                            className="button button-secondary button-sm"
                            onClick={() => handleDuplicateQuestion(activeQuestion)}
                          >
                            Duplikat Soal
                          </button>
                          <button
                            type="button"
                            className="button button-secondary button-sm placement-text-danger"
                            onClick={() =>
                              setDeleteConfirm({
                                title: "Hapus Pertanyaan?",
                                message: `Apakah Anda yakin ingin menghapus Soal #${activeQuestion.number}?`,
                                onConfirm: () => handleDeleteQuestion(activeQuestion.id),
                              })
                            }
                          >
                            Hapus Soal
                          </button>
                        </div>
                      </header>

                      <div className="placement-field-grid">
                        <label>
                          <span>Area Kompetensi</span>
                          <select
                            value={activeQuestion.area}
                            onChange={(e) =>
                              handleUpdateActiveQuestion({ area: e.target.value })
                            }
                          >
                            {QUESTION_AREAS.map((area) => (
                              <option key={area} value={area}>
                                {area}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="placement-span-full">
                          <span>Pertanyaan (Prompt)</span>
                          <textarea
                            rows={3}
                            value={activeQuestion.prompt}
                            onChange={(e) =>
                              handleUpdateActiveQuestion({ prompt: e.target.value })
                            }
                            placeholder="Tuliskan teks pertanyaan di sini..."
                          />
                        </label>

                        <label>
                          <span>URL Gambar (Opsional)</span>
                          <input
                            type="url"
                            value={activeQuestion.imageUrl ?? ""}
                            onChange={(e) =>
                              handleUpdateActiveQuestion({
                                imageUrl: e.target.value || undefined,
                              })
                            }
                            placeholder="https://domain.com/gambar.png"
                          />
                        </label>

                        <label>
                          <span>URL Audio (Opsional)</span>
                          <input
                            type="url"
                            value={activeQuestion.audioUrl ?? ""}
                            onChange={(e) =>
                              handleUpdateActiveQuestion({
                                audioUrl: e.target.value || undefined,
                              })
                            }
                            placeholder="https://domain.com/audio.mp3"
                          />
                        </label>

                        <label className="placement-span-full">
                          <span>Penjelasan / Pembahasan (Opsional)</span>
                          <textarea
                            rows={2}
                            value={activeQuestion.explanation ?? ""}
                            onChange={(e) =>
                              handleUpdateActiveQuestion({
                                explanation: e.target.value || undefined,
                              })
                            }
                            placeholder="Penjelasan jawaban setelah tes selesai..."
                          />
                        </label>
                      </div>

                      <fieldset className="placement-options-fieldset">
                        <legend>
                          <span>Pilihan Jawaban (Pilihan Tunggal)</span>
                          <small>Pilih radio untuk menentukan kunci jawaban yang benar.</small>
                        </legend>

                        <div className="placement-options-list">
                          {activeQuestion.options.map((opt, oIdx) => (
                            <div key={opt.id} className="placement-option-row">
                              <input
                                type="radio"
                                name={`correct-opt-${activeQuestion.id}`}
                                checked={opt.isCorrect}
                                onChange={() =>
                                  handleUpdateOption(opt.id, { isCorrect: true })
                                }
                                aria-label={`Jawaban benar ${oIdx + 1}`}
                              />
                              <input
                                type="text"
                                value={opt.text}
                                onChange={(e) =>
                                  handleUpdateOption(opt.id, { text: e.target.value })
                                }
                                placeholder={`Teks pilihan ${String.fromCharCode(65 + oIdx)}`}
                                aria-label={`Opsi ${oIdx + 1}`}
                              />
                              <button
                                type="button"
                                disabled={oIdx === 0}
                                onClick={() => handleMoveOption(oIdx, oIdx - 1)}
                                aria-label={`Pindahkan opsi ${oIdx + 1} ke atas`}
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                disabled={oIdx === activeQuestion.options.length - 1}
                                onClick={() => handleMoveOption(oIdx, oIdx + 1)}
                                aria-label={`Pindahkan opsi ${oIdx + 1} ke bawah`}
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                className="placement-del-btn"
                                disabled={activeQuestion.options.length <= 2}
                                onClick={() => handleDeleteOption(opt.id)}
                                aria-label={`Hapus pilihan ${oIdx + 1}`}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="button button-secondary button-sm placement-add-opt-btn"
                          onClick={handleAddOption}
                        >
                          + Tambah Pilihan
                        </button>
                      </fieldset>
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}

          {activeTab === "Aturan Hasil" && (
            <div className="placement-tab-content">
              <header className="placement-tab-header">
                <div>
                  <h2>Aturan Evaluasi & Rekomendasi Level</h2>
                  <p>
                    Tentukan batas skor untuk setiap jenjang program dan pesan rekomendasi
                    yang ditampilkan kepada siswa.
                  </p>
                </div>
                <div className="placement-rule-header-actions">
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={handleAddRule}
                  >
                    + Tambah Rentang
                  </button>
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={handleSaveRules}
                  >
                    Simpan Aturan
                  </button>
                </div>
              </header>

              {ruleValidationRealtime.errors.length > 0 && (
                <div className="placement-alert-error" role="alert">
                  <strong>Peringatan kesalahan aturan skor:</strong>
                  <ul>
                    {ruleValidationRealtime.errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {ruleValidationRealtime.warnings.length > 0 && (
                <div className="placement-alert-warning" role="alert">
                  <strong>Peringatan celah rentang skor:</strong>
                  <ul>
                    {ruleValidationRealtime.warnings.map((warn) => (
                      <li key={warn}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="placement-rules-list">
                {config.rules.map((rule, rIdx) => (
                  <article key={rule.id} className="placement-rule-card">
                    <header className="placement-rule-card-head">
                      <div className="placement-rule-score-badge">
                        Rentang Skor: <strong>{rule.minScore} – {rule.maxScore}</strong>
                      </div>
                      <div className="placement-rule-actions">
                        <button
                          type="button"
                          disabled={rIdx === 0}
                          onClick={() => handleMoveRule(rIdx, rIdx - 1)}
                          aria-label={`Naikkan aturan ${rIdx + 1}`}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          disabled={rIdx === config.rules.length - 1}
                          onClick={() => handleMoveRule(rIdx, rIdx + 1)}
                          aria-label={`Turunkan aturan ${rIdx + 1}`}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className="placement-del-btn"
                          onClick={() =>
                            setDeleteConfirm({
                              title: "Hapus Rentang Aturan?",
                              message: `Apakah Anda yakin ingin menghapus aturan untuk rentang ${rule.minScore} – ${rule.maxScore}?`,
                              onConfirm: () => handleDeleteRule(rule.id),
                            })
                          }
                          aria-label={`Hapus aturan ${rIdx + 1}`}
                        >
                          ✕
                        </button>
                      </div>
                    </header>

                    <div className="placement-rule-grid">
                      <label>
                        <span>Skor Min (0-100)</span>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={rule.minScore}
                          onChange={(e) =>
                            handleUpdateRule(rule.id, {
                              minScore: Math.max(0, Math.min(100, Number(e.target.value) || 0)),
                            })
                          }
                        />
                      </label>
                      <label>
                        <span>Skor Max (0-100)</span>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={rule.maxScore}
                          onChange={(e) =>
                            handleUpdateRule(rule.id, {
                              maxScore: Math.max(0, Math.min(100, Number(e.target.value) || 0)),
                            })
                          }
                        />
                      </label>
                      <label>
                        <span>Program Rekomendasi</span>
                        <select
                          value={rule.recommendedProgramCode}
                          onChange={(e) =>
                            handleUpdateRule(rule.id, {
                              recommendedProgramCode: e.target.value,
                            })
                          }
                        >
                          {PROGRAM_CODES.map((code) => (
                            <option key={code} value={code}>
                              {code}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Judul Hasil Rekomendasi</span>
                        <input
                          type="text"
                          value={rule.resultTitle}
                          onChange={(e) =>
                            handleUpdateRule(rule.id, { resultTitle: e.target.value })
                          }
                          placeholder="Contoh: Rekomendasi Level N4"
                        />
                      </label>
                      <label className="placement-span-full">
                        <span>Deskripsi Hasil</span>
                        <textarea
                          rows={2}
                          value={rule.resultDescription}
                          onChange={(e) =>
                            handleUpdateRule(rule.id, {
                              resultDescription: e.target.value,
                            })
                          }
                          placeholder="Penjelasan kemampuan dan langkah berikutnya..."
                        />
                      </label>
                      <label>
                        <span>Teks Tombol CTA</span>
                        <input
                          type="text"
                          value={rule.ctaLabel ?? ""}
                          onChange={(e) =>
                            handleUpdateRule(rule.id, {
                              ctaLabel: e.target.value || undefined,
                            })
                          }
                          placeholder="Contoh: Lihat Program N4"
                        />
                      </label>
                      <label>
                        <span>Tujuan URL CTA</span>
                        <input
                          type="text"
                          value={rule.ctaDestination ?? ""}
                          onChange={(e) =>
                            handleUpdateRule(rule.id, {
                              ctaDestination: e.target.value || undefined,
                            })
                          }
                          placeholder="/program"
                        />
                      </label>
                    </div>
                  </article>
                ))}
              </div>

              <section className="placement-preview-utility">
                <h3>Pratinjau Hasil Berdasarkan Skor</h3>
                <p>Uji kecocokan aturan dengan memasukkan angka skor simulasi.</p>
                <div className="placement-score-input-wrap">
                  <label htmlFor={`${baseInputId}-score-sim`}>
                    <span>Simulasi Skor (0 – 100):</span>
                    <input
                      id={`${baseInputId}-score-sim`}
                      type="number"
                      min={0}
                      max={100}
                      value={ruleScoreInput}
                      onChange={(e) =>
                        setRuleScoreInput(
                          Math.max(0, Math.min(100, Number(e.target.value) || 0))
                        )
                      }
                    />
                  </label>
                </div>

                {matchedRuleForScore ? (
                  <div className="placement-rule-match-card">
                    <div className="placement-rule-match-head">
                      <span className="program-code-badge">
                        {matchedRuleForScore.recommendedProgramCode}
                      </span>
                      <h4>{matchedRuleForScore.resultTitle}</h4>
                    </div>
                    <p>{matchedRuleForScore.resultDescription || "(Belum ada deskripsi)"}</p>
                    <div className="placement-rule-match-cta">
                      <span className="button button-primary button-sm">
                        {matchedRuleForScore.ctaLabel || "Lihat Program"} →{" "}
                        {matchedRuleForScore.ctaDestination || "/program"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="placement-rule-match-none">
                    <p>
                      Tidak ada aturan yang cocok untuk skor {ruleScoreInput}. Terdapat celah
                      skor pada pengaturan di atas.
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}

          {activeTab === "Hasil Tes" && (
            <div className="placement-tab-content">
              <div className="placement-filter-bar">
                <label className="placement-search-field">
                  <span>Cari Hasil</span>
                  <input
                    type="text"
                    value={attemptSearch}
                    onChange={(e) => setAttemptSearch(e.target.value)}
                    placeholder="Cari nama, target, atau level..."
                  />
                </label>
                <label className="placement-select-field">
                  <span>Filter Level</span>
                  <select
                    value={attemptLevel}
                    onChange={(e) => setAttemptLevel(e.target.value)}
                  >
                    <option value="Semua">Semua Level</option>
                    {PROGRAM_CODES.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </label>
                {(attemptSearch || attemptLevel !== "Semua") && (
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => {
                      setAttemptSearch("");
                      setAttemptLevel("Semua");
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>

              <AdminDataTable
                caption="Daftar Hasil Tes Placement Siswa"
                rows={filteredAttempts}
                rowKey={(row) => row.id}
                empty="Tidak ada riwayat hasil tes yang cocok dengan filter pencarian."
                columns={[
                  {
                    key: "date",
                    header: "Tanggal",
                    cell: (row) => row.date,
                  },
                  {
                    key: "name",
                    header: "Nama Siswa",
                    cell: (row) => <strong>{row.name}</strong>,
                  },
                  {
                    key: "target",
                    header: "Target",
                    cell: (row) => (
                      <span className="placement-tag-badge">{row.target}</span>
                    ),
                  },
                  {
                    key: "score",
                    header: "Skor",
                    cell: (row) => <strong>{row.score} / 100</strong>,
                  },
                  {
                    key: "recommendedLevel",
                    header: "Rekomendasi Level",
                    cell: (row) => (
                      <span className="program-code-badge">
                        {row.recommendedLevel}
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          )}

          {activeTab === "Lead" && (
            <div className="placement-tab-content">
              <div className="placement-filter-bar">
                <label className="placement-search-field">
                  <span>Cari Lead</span>
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Cari berdasarkan nama atau WhatsApp..."
                  />
                </label>
                <label className="placement-select-field">
                  <span>Status Hubungi</span>
                  <select
                    value={leadStatus}
                    onChange={(e) =>
                      setLeadStatus(
                        e.target.value as "Semua" | "Baru" | "Sudah Dihubungi"
                      )
                    }
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Baru">Baru</option>
                    <option value="Sudah Dihubungi">Sudah Dihubungi</option>
                  </select>
                </label>
                {(leadSearch || leadStatus !== "Semua") && (
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => {
                      setLeadSearch("");
                      setLeadStatus("Semua");
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>

              <AdminDataTable
                caption="Daftar Kontak Lead Siswa"
                rows={filteredLeads}
                rowKey={(row) => row.id}
                empty="Tidak ada lead siswa yang cocok dengan filter pencarian."
                columns={[
                  {
                    key: "date",
                    header: "Tanggal",
                    cell: (row) => row.date,
                  },
                  {
                    key: "name",
                    header: "Nama",
                    cell: (row) => <strong>{row.name}</strong>,
                  },
                  {
                    key: "whatsapp",
                    header: "WhatsApp",
                    cell: (row) => <span>{row.whatsapp}</span>,
                  },
                  {
                    key: "target",
                    header: "Target",
                    cell: (row) => (
                      <span className="placement-tag-badge">{row.target}</span>
                    ),
                  },
                  {
                    key: "recommendedLevel",
                    header: "Rekomendasi",
                    cell: (row) => (
                      <span className="program-code-badge">
                        {row.recommendedLevel}
                      </span>
                    ),
                  },
                  {
                    key: "status",
                    header: "Status",
                    cell: (row) => <AdminStatusBadge status={row.status} />,
                  },
                ]}
                actions={{
                  header: "Aksi",
                  cell: (row) => {
                    const cleanPhone = row.whatsapp
                      .replace(/\D/g, "")
                      .replace(/^0/, "62");
                    const waText = encodeURIComponent(
                      `Halo ${row.name}, kami dari HIRU Academy ingin menginformasikan hasil Placement Test kamu (Rekomendasi: Level ${row.recommendedLevel}).`
                    );
                    const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

                    return (
                      <div className="placement-lead-row-actions">
                        <button
                          type="button"
                          className="button button-secondary button-sm"
                          onClick={() => handleToggleLeadStatus(row.id)}
                        >
                          {row.status === "Baru"
                            ? "Tandai Sudah Dihubungi"
                            : "Tandai Baru"}
                        </button>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button-primary button-sm"
                        >
                          Chat WA
                        </a>
                      </div>
                    );
                  },
                }}
              />
            </div>
          )}
        </AdminTabs>

        <AdminConfirmDialog
          open={deleteConfirm !== null}
          title={deleteConfirm?.title ?? "Konfirmasi Hapus"}
          close={() => setDeleteConfirm(null)}
          actions={
            <>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Batal
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  deleteConfirm?.onConfirm();
                  setDeleteConfirm(null);
                }}
              >
                Hapus
              </button>
            </>
          }
        >
          <p>{deleteConfirm?.message}</p>
        </AdminConfirmDialog>

        <AdminDialog
          open={runnerOpen}
          title="Pratinjau Tes Placement"
          close={() => setRunnerOpen(false)}
        >
          {config.questions.length === 0 ? (
            <AdminEmptyState
              title="Belum Ada Soal"
              description="Tambahkan pertanyaan terlebih dahulu untuk mencoba pratinjau tes."
            />
          ) : !runnerFinished ? (
            <div className="placement-runner-box">
              {(() => {
                const currentQ = config.questions[runnerIndex];
                if (!currentQ) return null;
                const isLast = runnerIndex === config.questions.length - 1;

                return (
                  <div>
                    <div className="placement-runner-head">
                      <span className="placement-tag-badge">
                        Soal {runnerIndex + 1} dari {config.questions.length}
                      </span>
                      <span className="program-code-badge">{currentQ.area}</span>
                    </div>

                    <h4 className="placement-runner-prompt">{currentQ.prompt}</h4>

                    {currentQ.imageUrl && (
                      <div className="placement-runner-media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={currentQ.imageUrl} alt="Ilustrasi soal" />
                      </div>
                    )}

                    {currentQ.audioUrl && (
                      <div className="placement-runner-media">
                        <audio controls src={currentQ.audioUrl} />
                      </div>
                    )}

                    <div className="placement-runner-options">
                      {currentQ.options.map((opt, optIdx) => {
                        const isChosen = runnerAnswers[currentQ.id] === opt.id;
                        return (
                          <label
                            key={opt.id}
                            className={`placement-runner-option-label ${
                              isChosen ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={`runner-q-${currentQ.id}`}
                              checked={isChosen}
                              onChange={() =>
                                setRunnerAnswers((prev) => ({
                                  ...prev,
                                  [currentQ.id]: opt.id,
                                }))
                              }
                            />
                            <span className="placement-runner-opt-letter">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="placement-runner-opt-text">
                              {opt.text || `(Pilihan ${String.fromCharCode(65 + optIdx)})`}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="placement-runner-nav">
                      <button
                        type="button"
                        className="button button-secondary"
                        disabled={runnerIndex === 0}
                        onClick={() => setRunnerIndex((idx) => Math.max(0, idx - 1))}
                      >
                        Sebelumnya
                      </button>
                      {isLast ? (
                        <button
                          type="button"
                          className="button button-primary"
                          onClick={() => setRunnerFinished(true)}
                        >
                          Selesai & Lihat Skor
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="button button-primary"
                          onClick={() =>
                            setRunnerIndex((idx) =>
                              Math.min(config.questions.length - 1, idx + 1)
                            )
                          }
                        >
                          Berikutnya
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="placement-runner-result">
              {(() => {
                const { score, correct, total } = calculateRunnerScore();
                const matched = config.rules
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .find((r) => score >= r.minScore && score <= r.maxScore);

                return (
                  <div>
                    <div className="placement-runner-score-summary">
                      <small>HASIL PRATINJAU EVALUASI</small>
                      <h3>Skor Anda: {score} / 100</h3>
                      <p>
                        Jawaban Benar: <strong>{correct}</strong> dari {total} pertanyaan.
                      </p>
                    </div>

                    {matched ? (
                      <div className="placement-runner-match">
                        <div className="placement-rule-match-head">
                          <span className="program-code-badge">
                            {matched.recommendedProgramCode}
                          </span>
                          <h4>{matched.resultTitle}</h4>
                        </div>
                        <p>{matched.resultDescription}</p>
                        {matched.ctaLabel && (
                          <div className="placement-runner-cta-preview">
                            <span className="button button-primary">
                              {matched.ctaLabel}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="placement-rule-match-none">
                        <p>
                          Tidak ada aturan rentang skor yang mencakup nilai {score}.
                        </p>
                      </div>
                    )}

                    <div className="placement-runner-notice">
                      <small>
                        Catatan: Ini adalah mode pratinjau. Skor dan riwayat pengerjaan tidak
                        disimpan ke dalam data lead atau riwayat hasil tes.
                      </small>
                    </div>

                    <div className="placement-runner-final-actions">
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => {
                          setRunnerAnswers({});
                          setRunnerIndex(0);
                          setRunnerFinished(false);
                        }}
                      >
                        Ulangi Tes
                      </button>
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={() => setRunnerOpen(false)}
                      >
                        Tutup Pratinjau
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </AdminDialog>
      </main>
    </AdminShell>
  );
}
