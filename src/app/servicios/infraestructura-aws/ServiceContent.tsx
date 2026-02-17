"use client";

import ServicePageTemplate from '@/app/components/templates/ServicePageTemplate';

export default function ServiceContent() {
  return (
    <ServicePageTemplate
      translationPrefix="servicePages.aws"
      relatedServices={[
        { name: 'Automatizacion n8n', href: '/servicios/automatizacion-n8n' },
        { name: 'Auditoria de Seguridad', href: '/servicios/auditoria-seguridad' },
      ]}
    />
  );
}
