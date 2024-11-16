import Image from 'next/image';

interface JobCardDetailProps {
  id: string;
  title: string;
  company: string;
  companyLogo: string; // Logo de la empresa
  description: string[];
  period: string;
  city: string;
}

export default function JobCardDetail({
  id,
  title,
  company,
  companyLogo,
  period,
  city,
  description,
}: JobCardDetailProps) {
  return (
    <section id={id} className="flex flex-col mt-20 p-4 md:flex-row md:justify-around">
        <div className="flex flex-col items-center md:items-start flex-1 basis-1/2 min-h-[300px]">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {title} - {company}
          </h2>
          <div className="flex justify-center items-center mt-6 w-full">
            <Image
              src={companyLogo}
              alt={`${company} logo`}
              width={300}
              height={300}
              className="rounded-full dark:border-gray-600 mx-auto"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 basis-1/2 min-h-[300px] mt-4 md:mt-0">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2">
              <p><strong> {period}</strong></p>
              <p><strong> {city}</strong></p>
            </div>
            <ul className="list-disc pl-6">
            {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
      </div>
    </section>
  );
}
