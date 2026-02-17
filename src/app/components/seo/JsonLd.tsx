export default function JsonLd() {
  const graph = [
    // Person
    {
      '@type': 'Person',
      '@id': 'https://aldomatias.com/#person',
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
      '@id': 'https://aldomatias.com/#service',
      name: 'Aldo Matias - Automation & Security Services',
      url: 'https://aldomatias.com',
      description: 'n8n automation, security audits (OWASP), and AWS infrastructure services for businesses in Mexico and worldwide. Results in 1-2 weeks.',
      provider: { '@type': 'Person', '@id': 'https://aldomatias.com/#person' },
      areaServed: [
        { '@type': 'Country', name: 'Mexico' },
        { '@type': 'Place', name: 'Worldwide (Remote)' },
      ],
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
              url: 'https://aldomatias.com/servicios/automatizacion-n8n',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Security Audit',
              description: 'Vulnerability assessment based on OWASP Top 10, cloud configuration review, and executive report with corrective actions.',
              url: 'https://aldomatias.com/servicios/auditoria-seguridad',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AWS Infrastructure',
              description: 'Disaster recovery, VPN, Active Directory, DNS — configured and documented for your team to maintain.',
              url: 'https://aldomatias.com/servicios/infraestructura-aws',
            },
          },
        ],
      },
    },
    // WebSite
    {
      '@type': 'WebSite',
      '@id': 'https://aldomatias.com/#website',
      name: 'Aldo Matias | Automation & Security',
      url: 'https://aldomatias.com',
      description: 'n8n automation, security audits, and AWS infrastructure services. Results in 1-2 weeks.',
      author: { '@type': 'Person', '@id': 'https://aldomatias.com/#person' },
    },
    // BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://aldomatias.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://aldomatias.com',
        },
      ],
    },
    // FAQPage
    {
      '@type': 'FAQPage',
      '@id': 'https://aldomatias.com/#faq',
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
        {
          '@type': 'Question',
          name: 'Why hire a freelancer instead of an agency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Direct communication with me, no middlemen or overhead. Faster response, greater accountability, and significantly lower costs. You talk to the person doing the work, not an account manager.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if I need support after delivery?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every project includes 1 week of post-delivery support. After that, I offer hourly support or monthly packages as needed. The included documentation allows your team to operate without depending on me.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you protect my company\'s data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I sign NDAs before each project. I use encrypted connections, private repositories, and follow the security best practices I apply in OWASP audits. Your information is never shared with third parties.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does an OWASP security audit cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cost depends on the scope: number of applications, APIs, and cloud configurations to review. Submit your project details and you\'ll receive a personalized proposal with exact pricing in 48 hours. No commitment required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is n8n and why use it for automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'n8n is an open-source automation platform that connects your tools (WhatsApp, CRM, email, databases) with visual workflows. Unlike Zapier or Make, n8n can be self-hosted, giving you full control over your data with no execution limits.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I automate WhatsApp with n8n?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. n8n integrates with the WhatsApp Business API to automate replies, send notifications, sync conversations with your CRM, and generate automatic reports from chat data. It\'s one of the most requested automations.',
          },
        },
        {
          '@type': 'Question',
          name: "What's the difference between hiring a freelancer and an agency?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With a freelancer, you talk directly to the person doing the work. No middlemen, no agency overhead, faster response times, and significantly lower costs. For well-scoped projects (automation, audits, infrastructure), a specialized freelancer delivers results faster than a generalist agency.',
          },
        },
        {
          '@type': 'Question',
          name: 'What countries do you work with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I work 100% remotely with clients in Mexico, LATAM, Europe, and the United States. I adapt to your timezone for meetings and deliverables. Most of my clients are in Mexico and LATAM, but I take on projects from anywhere in the world.',
          },
        },
      ],
    },
    // HowTo
    {
      '@type': 'HowTo',
      '@id': 'https://aldomatias.com/#howto',
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
