import type { Metadata } from 'next';
import ServiceJsonLd from '@/app/components/seo/ServiceJsonLd';
import ServiceContent from './ServiceContent';

export const metadata: Metadata = {
  title: 'Automatizacion n8n para Empresas | Mexico & Remoto',
  description:
    'Automatizo procesos manuales con n8n para empresas en Mexico y remoto. Flujos WhatsApp, CRM, reportes automaticos. Entrega en 3-7 dias. Propuesta gratuita en 48h.',
  alternates: {
    canonical: 'https://aldomatias.com/servicios/automatizacion-n8n',
  },
  openGraph: {
    title: 'Automatizacion n8n para Empresas | Mexico & Remoto',
    description:
      'Elimino horas de trabajo manual cada semana con flujos n8n que trabajan 24/7. WhatsApp, CRM, reportes. Entrega en 3-7 dias.',
    url: 'https://aldomatias.com/servicios/automatizacion-n8n',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Automatizacion n8n - Aldo Matias' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatizacion n8n para Empresas',
    description: 'Flujos n8n que eliminan trabajo manual. WhatsApp, CRM, reportes automaticos. Entrega en 3-7 dias.',
  },
};

const FAQS = [
  {
    question: 'How long does it take to implement n8n automation?',
    answer:
      '3-7 days for standard workflows like WhatsApp replies or CRM sync. Complex projects with multiple integrations take up to 2 weeks. You receive progress updates every 3 days.',
  },
  {
    question: 'Do I need technical knowledge to maintain the automation?',
    answer:
      'No. Every deliverable includes step-by-step documentation with screenshots. Plus, you get 1 week of support where I answer questions and make any adjustments you need.',
  },
  {
    question: 'Can I automate WhatsApp with n8n?',
    answer:
      'Yes. n8n integrates with WhatsApp Business API to automate replies, send notifications, sync conversations with your CRM, and generate automatic reports from chat data.',
  },
  {
    question: 'What happens if a workflow breaks after delivery?',
    answer:
      'Every project includes 1 week of post-delivery support. I also set up error notifications so you know immediately if something needs attention. The documentation covers common troubleshooting steps.',
  },
];

export default function AutomatizacionN8nPage() {
  return (
    <>
      <ServiceJsonLd
        serviceName="Automatizacion n8n"
        serviceDescription="Design and implementation of automation workflows with n8n: WhatsApp, CRM, automatic reports, smart notifications. Results in 3-7 days for businesses in Mexico and worldwide."
        serviceUrl="https://aldomatias.com/servicios/automatizacion-n8n"
        faqs={FAQS}
      />
      <ServiceContent />
    </>
  );
}
