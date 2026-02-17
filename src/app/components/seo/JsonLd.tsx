export default function JsonLd() {
  const graph = [
    // Person
    {
      '@type': 'Person',
      name: 'Aldo Matias',
      jobTitle: 'Automation & Security Consultant',
      url: 'https://aldomatias.com',
      image: 'https://aldomatias.com/aldo-matias.jpg',
      email: 'contacto@aldomatias.com',
      knowsLanguage: [
        { '@type': 'Language', name: 'English', alternateName: 'en' },
        { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      ],
      knowsAbout: [
        'n8n Automation',
        'Workflow Automation',
        'WhatsApp Business Automation',
        'Security Audits',
        'OWASP Top 10',
        'AWS Infrastructure',
        'Disaster Recovery',
        'VPN Configuration',
        'Active Directory',
        'Node.js',
        'React',
        'Docker',
        'Cloud Infrastructure',
      ],
      sameAs: [
        'https://github.com/amatiasdev',
        'https://www.linkedin.com/in/aldomatias-/',
      ],
    },
    // ProfessionalService
    {
      '@type': 'ProfessionalService',
      name: 'Aldo Matias - Automation & Security Services',
      url: 'https://aldomatias.com',
      description: 'n8n automation, security audits (OWASP), and AWS infrastructure services for businesses. Results in 1-2 weeks.',
      provider: { '@type': 'Person', name: 'Aldo Matias' },
      areaServed: { '@type': 'Place', name: 'Worldwide (Remote)' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'n8n Automation',
              description: 'Design and implementation of automation workflows with n8n: WhatsApp, CRM, automatic reports, smart notifications.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Security Audit',
              description: 'Vulnerability assessment based on OWASP Top 10, cloud configuration review, and executive report with corrective actions.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AWS Infrastructure',
              description: 'Disaster recovery, VPN, Active Directory, DNS — configured and documented for your team to maintain.',
            },
          },
        ],
      },
    },
    // WebSite
    {
      '@type': 'WebSite',
      name: 'Aldo Matias | Automation & Security',
      url: 'https://aldomatias.com',
      description: 'n8n automation, security audits, and AWS infrastructure services. Results in 1-2 weeks.',
      author: { '@type': 'Person', name: 'Aldo Matias' },
    },
    // FAQPage
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does it take to implement n8n automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '3–7 days for standard workflows like WhatsApp replies or CRM sync. Complex projects with multiple integrations take up to 2 weeks. You receive progress updates every 3 days.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need technical knowledge to maintain the automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Every deliverable includes step-by-step documentation with screenshots. Plus, you get 1 week of support where I answer questions and make any adjustments you need.',
          },
        },
        {
          '@type': 'Question',
          name: "What if I'm not satisfied with the result?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You receive the deliverable with revisions included until it works as you expected. No extra charge for adjustments within the original scope. If the project doesn\'t meet what was agreed, you don\'t pay.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you work with companies outside LATAM?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. I work 100% remotely with clients in LATAM, Europe, and the United States. Time zones are not a problem: I adapt to your schedule for meetings and deliverables.',
          },
        },
      ],
    },
    // HowTo
    {
      '@type': 'HowTo',
      name: 'How to get automation, security, or AWS infrastructure services',
      description: 'From problem to solution in 3 simple steps.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Submit your project', text: 'Fill out the form with your project details. No commitment required.' },
        { '@type': 'HowToStep', position: 2, name: 'Receive your proposal in 48h', text: 'You receive a personalized proposal with exact scope and timeline tailored to your needs.' },
        { '@type': 'HowToStep', position: 3, name: 'Implementation in 1–2 weeks', text: 'Focused execution with measurable deliverables every 3 days and direct communication.' },
      ],
    },
  ];

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
