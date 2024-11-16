import Link from 'next/link';
import Image from 'next/image';

interface JobCardProps {
  title: string;
  company: string;
  companyLogo: string; // Add companyLogo prop
  description: string;
  link: string;
}

export default function JobCard({
  title,
  company,
  companyLogo,
  description,
  link,
}: JobCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex items-center space-x-4 mb-2">
        {/* Company logo */}
        <Image
          src={companyLogo}
          alt={`${company} logo`}
          width={80}
          height={80}
          className="rounded-full"
        />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title} - {company}
        </h3>
      </div>
      <p>{description}</p>
      <Link href={`/experience#${link}`}>
        <button className="text-blue-500 mt-2">See more</button>
      </Link>
    </div>
  );
}
