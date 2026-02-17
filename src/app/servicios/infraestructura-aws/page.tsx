import type { Metadata } from 'next';
import ServiceJsonLd from '@/app/components/seo/ServiceJsonLd';
import ServiceContent from './ServiceContent';

export const metadata: Metadata = {
  title: 'Infraestructura AWS para Empresas sin DevOps',
  description:
    'Configuro infraestructura AWS para empresas en Mexico y remoto: VPN, Active Directory, DNS, disaster recovery. Tu equipo lo opera sin DevOps. Entrega en 1-2 semanas.',
  alternates: {
    canonical: 'https://aldomatias.com/servicios/infraestructura-aws',
  },
  openGraph: {
    title: 'Infraestructura AWS para Empresas sin DevOps',
    description:
      'VPN, Active Directory, DNS, disaster recovery en AWS. Configurado y documentado para que tu equipo lo opere. Entrega en 1-2 semanas.',
    url: 'https://aldomatias.com/servicios/infraestructura-aws',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Infraestructura AWS - Aldo Matias' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infraestructura AWS para Empresas',
    description: 'VPN, AD, DNS, disaster recovery. Sin suscripcion DevOps. Tu equipo lo mantiene con documentacion.',
  },
};

const FAQS = [
  {
    question: 'How long does it take to set up AWS infrastructure?',
    answer:
      '1-2 weeks for standard configurations including VPN, Active Directory, DNS, and disaster recovery. The timeline depends on the number of services and users to migrate. You receive progress updates throughout.',
  },
  {
    question: 'Do I need a DevOps team to maintain the infrastructure?',
    answer:
      'No. Every project includes complete documentation with step-by-step guides your team can follow. The infrastructure is designed to be maintained by your existing IT staff without specialized DevOps knowledge.',
  },
  {
    question: 'What happens if our server goes down?',
    answer:
      'With disaster recovery configured, you recover everything in minutes, not days. Automated backups, failover procedures, and recovery runbooks are all part of the deliverable.',
  },
  {
    question: 'Is there an ongoing cost after the initial setup?',
    answer:
      'No monthly fees to me. You only pay AWS usage costs directly. The one-time setup includes configuration, documentation, and transition support. I offer optional hourly support if you need it later.',
  },
];

export default function InfraestructuraAwsPage() {
  return (
    <>
      <ServiceJsonLd
        serviceName="Infraestructura AWS"
        serviceDescription="Disaster recovery, VPN, Active Directory, DNS — configured and documented for your team to maintain without DevOps. Results in 1-2 weeks for businesses in Mexico and worldwide."
        serviceUrl="https://aldomatias.com/servicios/infraestructura-aws"
        faqs={FAQS}
      />
      <ServiceContent />
    </>
  );
}
