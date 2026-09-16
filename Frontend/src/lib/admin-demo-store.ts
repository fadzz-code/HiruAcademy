"use client";

import { useCallback, useEffect, useState } from "react";

export const ADMIN_STORE_KEY = "admin-demo-store";
export type Item = { id: string; title: string; detail: string; status: string };
export type AdminStore = { items: Record<string, Item[]>; invoices: Item[]; payouts: Item[]; integrations: Record<string, string> };

const initial: AdminStore = {
  items: {},
  invoices: [{ id: "INV-001", title: "Member •••1", detail: "N4 • Belajar Mandiri", status: "Menunggu" }],
  payouts: [{ id: "PAY-001", title: "Affiliate •••1", detail: "Nominal sesuai pengajuan", status: "Menunggu" }],
  integrations: { Zoom: "Belum terhubung", Email: "Belum terhubung", Pembayaran: "Belum terhubung", "Penyimpanan media": "Terhubung", Analitik: "Belum terhubung" },
};

function isItem(value: unknown): value is Item {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return [item.id, item.title, item.detail, item.status].every((field) => typeof field === "string");
}

function itemArray(value: unknown, fallback: Item[]) {
  return Array.isArray(value) ? value.filter(isItem) : fallback;
}

function normalize(value: unknown): AdminStore {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
  const rawItems = source.items && typeof source.items === "object" && !Array.isArray(source.items) ? source.items as Record<string, unknown> : {};
  const items = Object.fromEntries(Object.entries(rawItems).filter(([, entries]) => Array.isArray(entries)).map(([key, entries]) => [key, itemArray(entries, [])]));
  const rawIntegrations = source.integrations && typeof source.integrations === "object" && !Array.isArray(source.integrations) ? source.integrations as Record<string, unknown> : {};
  const savedIntegrations: Record<string, string> = {};
  for (const [key, status] of Object.entries(rawIntegrations)) if (typeof status === "string") savedIntegrations[key] = status;
  return { items, invoices: itemArray(source.invoices, initial.invoices), payouts: itemArray(source.payouts, initial.payouts), integrations: { ...initial.integrations, ...savedIntegrations } };
}

function load() {
  let parsed: unknown = {};
  try { parsed = JSON.parse(localStorage.getItem(ADMIN_STORE_KEY) ?? "{}"); } catch {}
  const store = normalize(parsed);
  localStorage.setItem(ADMIN_STORE_KEY, JSON.stringify(store));
  return store;
}

export function useAdminStore() {
  const [store, setStore] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => { const id = setTimeout(() => { setStore(load()); setReady(true); }, 0); return () => clearTimeout(id); }, []);
  const update = useCallback((change: (value: AdminStore) => AdminStore) => setStore((value) => { const next = normalize(change(value)); localStorage.setItem(ADMIN_STORE_KEY, JSON.stringify(next)); return next; }), []);
  return { store, update, ready };
}
