import type { ReactNode } from "react";
import { AdminNavigation } from "@/components/admin-navigation";

export function AdminShell({ children, current }: { children: ReactNode; current: string }) {
  return (
    <div className="admin-shell">
      <AdminNavigation current={current} />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
