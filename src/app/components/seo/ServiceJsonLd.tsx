interface ServiceJsonLdProps {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  faqs: Array<{ question: string; answer: string }>;
}

export default function ServiceJsonLd({
  serviceName,
  serviceDescription,
  serviceUrl,
  faqs,
}: ServiceJsonLdProps) {
  const graph = [
    {
      '@type': 'Service',
      '@id': `${serviceUrl}#service`,
      name: serviceName,
      description: serviceDescription,
      provider: {
        '@type': 'Person',
        '@id': 'https://aldomatias.com/#person',
        name: 'Aldo Matias',
      },
      url: serviceUrl,
      areaServed: [
        { '@type': 'Country', name: 'Mexico' },
        { '@type': 'Place', name: 'Worldwide (Remote)' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${serviceUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${serviceUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://aldomatias.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: serviceName,
          item: serviceUrl,
        },
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
