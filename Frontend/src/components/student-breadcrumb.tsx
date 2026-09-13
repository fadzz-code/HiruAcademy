import Link from "next/link";

export type StudentBreadcrumbItem = { label: string; href?: string };

export function StudentBreadcrumb({ items }: { items: StudentBreadcrumbItem[] }) {
  return (
    <nav className="student-breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {index > 0 && <span aria-hidden="true">›</span>}
            <span aria-current={index === items.length - 1 ? "page" : undefined}>
              {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
