import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Component update 4-1 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center">
            {i > 0 && <span className="text-emerald-100/40 mx-2">/</span>}
            {item.href ? (
              <Link href={item.href} className="text-slate-300 hover:text-emerald-100 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-emerald-100">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
