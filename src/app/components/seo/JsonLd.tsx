export function PersonJsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aldo Matias',
    jobTitle: 'Middle Full-Stack Developer | Cloud Infrastructure Engineer',
    url: 'https://aldomatias.com',
    image: 'https://aldomatias.com/aldo-matias.jpg',
    email: 'contact@aldomatias.com',
    // Current employment
    worksFor: {
      '@type': 'Organization',
      name: 'IT-KEEPER',
    },
    // Previous employers (signals experience)
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'BBVA Bank',
      },
      {
        '@type': 'Organization',
        name: 'AHEA University by Ectotec',
      },
    ],
    // Job seeking status for recruiters/AI
    seeks: {
      '@type': 'Demand',
      name: 'Full-Stack Developer Position',
      description: 'Open to remote opportunities (USA timezone) and on-site roles in Europe. Available for global opportunities.',
    },
    // Work preferences
    workLocation: [
      {
        '@type': 'Place',
        name: 'Remote - USA Timezone',
      },
      {
        '@type': 'Place',
        name: 'Europe - On-site',
        address: {
          '@type': 'PostalAddress',
          addressCountry: ['Germany', 'Netherlands', 'UK', 'Spain'],
        },
      },
    ],
    // Language proficiency
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
    ],
    // Nationality for visa context
    nationality: {
      '@type': 'Country',
      name: 'Mexico',
    },
    // Technical skills
    knowsAbout: [
      'React',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'AWS',
      'Next.js',
      'MongoDB',
      'Docker',
      'Express',
      'Redux',
      'REST APIs',
      'Git',
      'CI/CD',
      'Agile',
      'Scrum',
      'Cloud Infrastructure',
      'Web Development',
      'Front-end Architecture',
      'OpenVPN',
      'Active Directory',
      'Windows Server',
      'Remote Work',
      'International Teams',
    ],
    // Social profiles
    sameAs: [
      'https://github.com/amatiasdev',
      'https://www.linkedin.com/in/aldomatias-/',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Aldo Matias Portfolio',
    url: 'https://aldomatias.com',
    description:
      'Professional portfolio of Aldo Matias, a Full-Stack Developer specializing in React, Node.js, TypeScript & AWS.',
    author: {
      '@type': 'Person',
      name: 'Aldo Matias',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

export function ProfilePageJsonLd() {
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Aldo Matias',
      jobTitle: 'Full-Stack Developer | Cloud Infrastructure Engineer',
      url: 'https://aldomatias.com',
      sameAs: [
        'https://github.com/amatiasdev',
        'https://www.linkedin.com/in/aldomatias-/',
      ],
    },
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
    />
  );
}

export function BreadcrumbJsonLd() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aldomatias.com',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

export default function JsonLd() {
  return (
    <>
      <PersonJsonLd />
      <WebSiteJsonLd />
      <ProfilePageJsonLd />
      <BreadcrumbJsonLd />
    </>
  );
}
