import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aldomatias.com';

  return [
    {
      url: baseUrl,
      lastModified: '2026-02-17',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios/automatizacion-n8n`,
      lastModified: '2026-02-17',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios/auditoria-seguridad`,
      lastModified: '2026-02-17',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios/infraestructura-aws`,
      lastModified: '2026-02-17',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
