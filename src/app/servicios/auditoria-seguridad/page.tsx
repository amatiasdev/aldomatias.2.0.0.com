import type { Metadata } from 'next';
import ServiceJsonLd from '@/app/components/seo/ServiceJsonLd';
import ServiceContent from './ServiceContent';

export const metadata: Metadata = {
  title: 'Auditoria de Seguridad OWASP | Mexico & Remoto',
  description:
    'Auditoria de seguridad OWASP Top 10 para empresas en Mexico y remoto. Encuentro vulnerabilidades antes que los hackers. Reporte ejecutivo en 5-10 dias. Propuesta gratuita.',
  alternates: {
    canonical: 'https://aldomatias.com/servicios/auditoria-seguridad',
  },
  openGraph: {
    title: 'Auditoria de Seguridad OWASP | Mexico & Remoto',
    description:
      'Encuentro las vulnerabilidades que hackean empresas. Revision OWASP Top 10, config cloud, reporte ejecutivo. Entrega en 5-10 dias.',
    url: 'https://aldomatias.com/servicios/auditoria-seguridad',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Auditoria de Seguridad - Aldo Matias' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auditoria de Seguridad OWASP',
    description: 'Vulnerabilidades identificadas antes que los hackers. OWASP Top 10, config cloud, reporte ejecutivo.',
  },
};

const FAQS = [
  {
    question: 'How much does an OWASP security audit cost?',
    answer:
      'Cost depends on the scope: number of applications, APIs, and cloud configurations to review. Submit your project details and you will receive a personalized proposal with exact pricing in 48 hours. No commitment required.',
  },
  {
    question: 'What does an OWASP Top 10 audit include?',
    answer:
      'A complete review of the 10 most critical web application security risks: injection, broken authentication, sensitive data exposure, XML external entities, broken access control, security misconfiguration, XSS, insecure deserialization, components with known vulnerabilities, and insufficient logging.',
  },
  {
    question: 'Do you also fix the vulnerabilities you find?',
    answer:
      'Yes. The audit includes remediation of critical vulnerabilities. You receive the executive report regardless of whether you hire the full remediation. For non-critical issues, the report includes detailed steps your team can follow.',
  },
  {
    question: 'How often should I audit my application?',
    answer:
      'At minimum, after every major release or infrastructure change. For applications handling sensitive data (financial, healthcare, personal), quarterly audits are recommended. I can set up a recurring schedule tailored to your release cycle.',
  },
];

export default function AuditoriaSeguidadPage() {
  return (
    <>
      <ServiceJsonLd
        serviceName="Auditoria de Seguridad OWASP"
        serviceDescription="Vulnerability assessment based on OWASP Top 10, cloud configuration review, and executive report with corrective actions. Results in 5-10 days for businesses in Mexico and worldwide."
        serviceUrl="https://aldomatias.com/servicios/auditoria-seguridad"
        faqs={FAQS}
      />
      <ServiceContent />
    </>
  );
}
