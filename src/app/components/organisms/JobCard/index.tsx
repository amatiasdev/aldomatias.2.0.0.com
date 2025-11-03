"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Typography from '@/app/components/atoms/Typography';
import Badge from '@/app/components/atoms/Badge';
import StatCard from '@/app/components/molecules/StatCard';
import ImageGalleryPreview from '@/app/components/molecules/ImageGalleryPreview';
import { Job } from '@/app/types/domain';
import { cardHover } from '@/app/constants/animations';

interface JobCardProps {
  job: Job;
  variant?: 'compact' | 'detailed';
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <motion.div
      className="bg-bg-secondary border-2 border-border-default p-6 md:p-8 transition-all duration-300 hover:border-accent-500"
      {...cardHover}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <Typography as="h3" variant="h4" className="mb-2">
            {job.title}
          </Typography>
          <Typography as="p" className="text-accent-500 font-semibold text-lg mb-2">
            {job.company}
          </Typography>
          <p className="text-fg-tertiary text-sm">
            {job.period} • {job.city}
          </p>
        </div>

        {job.companyLogo && (
          <div className="w-16 h-16 md:w-20 md:h-20 bg-bg-elevated rounded-lg p-2 flex items-center justify-center">
            <Image
              src={job.companyLogo}
              alt={`${job.company} logo`}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {job.metrics && job.metrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {job.metrics.map((metric, index) => (
            <StatCard key={index} value={metric.value} label={metric.label} />
          ))}
        </div>
      )}

      <ul className="space-y-3 mb-6">
        {job.description.map((item, index) => (
          <li key={index} className="text-fg-secondary leading-relaxed flex items-start gap-3">
            <span className="text-accent-500 mt-1">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {job.highlightedProject && (
        <div className="mt-8 mb-6 p-6 bg-bg-tertiary border-2 border-accent-500/30 rounded-sm">
          <Typography as="h4" variant="h4" className="mb-6">
            <span className="text-accent-500 font-bold">Highlighted Project: </span>
            <span className="text-fg-primary">{job.highlightedProject.title}</span>
          </Typography>

          <div className="flex flex-col md:flex-row gap-6 mb-6 items-stretch">
            {/* Left column: Description */}
            <ul className="space-y-3 flex-1">
              {job.highlightedProject.description.map((item, index) => (
                <li key={index} className="text-fg-secondary leading-relaxed flex items-start gap-3">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Right column: Image Gallery */}
            {job.highlightedProject.screenshots && job.highlightedProject.screenshots.length > 0 && (
              <div className="flex-shrink-0 md:w-1/2">
                <ImageGalleryPreview images={job.highlightedProject.screenshots} />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {job.highlightedProject.technologies.map((tech, index) => (
              <Badge key={index} variant="accent" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {job.technologies && job.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {job.technologies.map((tech, index) => (
            <Badge key={index} variant="accent" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
}
