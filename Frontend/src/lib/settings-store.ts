"use client";

import { useSyncExternalStore } from "react";
import {
  initialAdminSettings,
  loadAdminSettings,
  SETTINGS_CHANGE_EVENT,
  SETTINGS_STORAGE_KEY,
  type AdminSettings,
} from "@/lib/admin-settings-store";

export type { AdminSettings };
export type IntegrationStatus = "Nonaktif" | "Perlu dilengkapi" | "Siap digunakan";

export const isValidGa4MeasurementId = (value: string): boolean =>
  /^G-[A-Z0-9]{6,}$/i.test(value.trim());

export const isValidMetaPixelId = (value: string): boolean =>
  /^\d{5,}$/.test(value.trim());

export function getIntegrationStatus(enabled: boolean, valid: boolean): IntegrationStatus {
  if (!enabled) return "Nonaktif";
  return valid ? "Siap digunakan" : "Perlu dilengkapi";
}

export function getGa4Status(settings: AdminSettings): IntegrationStatus {
  return getIntegrationStatus(
    settings.integrations.ga4Enabled,
    isValidGa4MeasurementId(settings.integrations.ga4MeasurementId)
  );
}

export function getMetaStatus(settings: AdminSettings): IntegrationStatus {
  return getIntegrationStatus(
    settings.integrations.metaEnabled,
    isValidMetaPixelId(settings.integrations.metaPixelId)
  );
}

let cachedRaw: string | null | undefined;
let cachedSettings: AdminSettings = initialAdminSettings;

export function readSettings(): AdminSettings {
  if (typeof window === "undefined") return initialAdminSettings;
  const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedSettings = loadAdminSettings();
    cachedRaw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
  }
  return cachedSettings;
}

function subscribe(onStoreChange: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key !== SETTINGS_STORAGE_KEY) return;
    cachedRaw = undefined;
    onStoreChange();
  };
  const change = () => {
    cachedRaw = undefined;
    onStoreChange();
  };
  window.addEventListener("storage", storage);
  window.addEventListener(SETTINGS_CHANGE_EVENT, change);
  return () => {
    window.removeEventListener("storage", storage);
    window.removeEventListener(SETTINGS_CHANGE_EVENT, change);
  };
}

export function useSettings(): AdminSettings {
  return useSyncExternalStore(subscribe, readSettings, () => initialAdminSettings);
}
