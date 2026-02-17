"use client";

import ServicePageTemplate from '@/app/components/templates/ServicePageTemplate';

export default function ServiceContent() {
  return (
    <ServicePageTemplate
      translationPrefix="servicePages.n8n"
      relatedServices={[
        { name: 'Auditoria de Seguridad', href: '/servicios/auditoria-seguridad' },
        { name: 'Infraestructura AWS', href: '/servicios/infraestructura-aws' },
      ]}
    />
  );
}
