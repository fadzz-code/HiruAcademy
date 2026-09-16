"use client";

import { FormEvent, useRef, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { AdminBreadcrumb, AdminDialog, AdminEmptyState, AdminPageHeader, AdminStatusBadge, AdminTabs } from "@/components/admin-primitives";
import { ScreenConfig } from "@/lib/admin-console";
import { Item, useAdminStore } from "@/lib/admin-demo-store";

export function AdminScreen({ route, config }: { route: string; config: ScreenConfig }) {
  const { store, update } = useAdminStore();
  const [tab, setTab] = useState(config.tabs[0]);
  const [dialog, setDialog] = useState<string | null>(null);
  const [selected, setSelected] = useState<Item | null>(null);
  const [notice, setNotice] = useState("");
  const firstField = useRef<HTMLInputElement>(null);
  const items = store.items[route] ?? [{ id: `${route}-1`, title: `${config.title} Utama`, detail: config.tabs[0], status: "Draf" }];
  const list = config.kind === "invoice" ? store.invoices : config.kind === "payout" ? store.payouts : items;

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const item = { id: `${route}-${Date.now()}`, title: String(data.get("title")), detail: String(data.get("detail")), status: "Draf" };
    update((value) => ({ ...value, items: { ...value.items, [route]: [item, ...(value.items[route] ?? [])] } }));
    setDialog(null); setNotice(`${config.title} berhasil disimpan.`);
  }
  function changeInvoice(next: string) {
    if (!selected) return;
    update((value) => ({ ...value, invoices: value.invoices.map((item) => item.id === selected.id ? { ...item, status: next } : item) }));
    setSelected({ ...selected, status: next }); setNotice(`Invoice ${next.toLowerCase()}.`);
  }
  function changePayout(next: string) {
    if (!selected) return;
    update((value) => ({ ...value, payouts: value.payouts.map((item) => item.id === selected.id ? { ...item, status: next } : item) }));
    setSelected({ ...selected, status: next }); setNotice(`Pencairan ${next.toLowerCase()}.`);
  }
  return <AdminShell current={`/admin/${route}`}><main className="admin-page console-page"><AdminBreadcrumb items={[{ label: "Admin", href: "/admin" }, { label: config.title }]}/><AdminPageHeader eyebrow={`PANEL ADMIN • ${config.title.toUpperCase()}`} title={config.title} description={config.description} actions={config.createLabel && <button className="button button-primary" type="button" onClick={() => setDialog("create")}>{config.createLabel}</button>}/><AdminTabs tabs={config.tabs} active={tab} onChange={setTab} label={`Bagian ${config.title}`}>{notice && <p className="console-notice" role="status">{notice}</p>}{config.kind === "integration" ? <Integration store={store.integrations} update={update} tab={tab}/> : <section className="console-panel"><div className="console-toolbar"><div><h2>{tab}</h2><p>Kelola data dan tindakan untuk bagian ini.</p></div></div>{config.kind === "analytics" ? <AdminEmptyState title="Data analitik belum tersedia" description="Hubungkan sumber data sebelum menampilkan metrik."/> : list.length ? <div className="console-list">{list.map((item) => <article className="console-row" key={item.id}><div><AdminStatusBadge status={item.status}/><h3>{item.title}</h3><p>{item.detail}</p></div><button className="button button-secondary" type="button" onClick={() => { setSelected(item); setDialog(config.kind ?? "detail"); }}>Lihat Detail</button></article>)}</div> : <AdminEmptyState/>}</section>}</AdminTabs><AdminDialog open={dialog === "create"} close={() => setDialog(null)} title={config.createLabel ?? "Tambah Data"} initialFocusRef={firstField}><form onSubmit={save}>{config.fields?.map((field, index) => <label className="admin-field" key={field}><span>{field}</span>{index === 1 ? <textarea name="detail" required/> : <input ref={index === 0 ? firstField : undefined} name={index === 0 ? "title" : field} required/>}</label>)}<div className="admin-dialog-actions"><button className="button button-secondary" type="button" onClick={() => setDialog(null)}>Batal</button><button className="button button-primary" type="submit">Simpan</button></div></form></AdminDialog><AdminDialog open={Boolean(dialog && dialog !== "create")} close={() => setDialog(null)} title={`Detail ${config.title}`}><Detail selected={selected} kind={config.kind} invoice={changeInvoice} payout={changePayout}/></AdminDialog></main></AdminShell>;
}

function Detail({ selected, kind, invoice, payout }: { selected: Item | null; kind?: ScreenConfig["kind"]; invoice: (next: string) => void; payout: (next: string) => void }) {
  if (!selected) return <AdminEmptyState/>;
  return <><AdminStatusBadge status={selected.status}/><h3>{selected.title}</h3><p>{selected.detail}</p>{kind === "invoice" && <div className="admin-dialog-actions">{selected.status === "Menunggu" && <button className="button button-secondary" onClick={() => invoice("Diperiksa")}>Lihat Bukti</button>}{selected.status === "Diperiksa" && <><button className="button button-primary" onClick={() => invoice("Terverifikasi")}>Verifikasi & Aktifkan</button><button className="button button-secondary" onClick={() => invoice("Ditolak")}>Tolak Invoice</button></>}</div>}{kind === "payout" && <div className="admin-dialog-actions">{selected.status === "Menunggu" && <button className="button button-primary" onClick={() => payout("Diproses")}>Proses Pencairan</button>}{selected.status === "Diproses" && <button className="button button-primary" onClick={() => payout("Dibayar")}>Tandai Dibayar</button>}</div>}</>;
}

function Integration({ store, update, tab }: { store: Record<string, string>; update: ReturnType<typeof useAdminStore>["update"]; tab: string }) {
  const [saved, setSaved] = useState("");
  if (tab !== "Integrasi") return <section className="console-panel"><div className="console-toolbar"><div><h2>{tab}</h2><p>Pengaturan bagian ini dapat ditinjau dan disimpan.</p></div><button className="button button-primary" onClick={() => setSaved(`${tab} berhasil disimpan.`)}>Simpan Pengaturan</button></div>{saved && <p className="console-notice" role="status">{saved}</p>}</section>;
  return <section className="console-panel"><div className="console-toolbar"><div><h2>Integrasi</h2><p>Status koneksi tanpa menampilkan informasi rahasia.</p></div><button className="button button-primary" onClick={() => { update((value) => ({ ...value, integrations: { ...value.integrations, ...store } })); setSaved("Pengaturan integrasi berhasil disimpan."); }}>Simpan Integrasi</button></div>{saved && <p className="console-notice" role="status">{saved}</p>}<div className="console-list">{Object.entries(store).map(([name, status]) => <article className="console-row" key={name}><div><h3>{name}</h3><p>Status layanan</p></div><select aria-label={`Status ${name}`} value={status} onChange={(event) => update((value) => ({ ...value, integrations: { ...value.integrations, [name]: event.target.value } }))}><option>Belum terhubung</option><option>Terhubung</option><option>Perlu perhatian</option></select></article>)}</div></section>;
}
