interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{title}</h1>
      {subtitle && <p className="text-slate-300 mt-1">{subtitle}</p>}
    </div>
  );
}
