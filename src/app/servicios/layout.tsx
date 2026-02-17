import Breadcrumbs from '@/app/components/molecules/Breadcrumbs';

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      {children}
    </div>
  );
}
