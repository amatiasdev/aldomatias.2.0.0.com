"use client";

import Typography from '@/app/components/atoms/Typography';
import JobCard from '@/app/components/organisms/JobCard';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useJobs } from '@/app/hooks/useJobs';

export default function ExperienceSection() {
  const { jobs, loading, error } = useJobs();

  return (
    <SectionWrapper background="charcoal" padding="xl" id="experience">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-16 text-5xl md:text-6xl font-black tracking-tight">
          EXPERIENCE
        </Typography>
      </AnimatedSection>

      {loading && (
        <div className="text-center text-fg-tertiary">Loading experience...</div>
      )}

      {error && (
        <div className="text-center text-red-500">Failed to load experience</div>
      )}

      <div className="space-y-8">
        {jobs.map((job, index) => (
          <AnimatedSection key={job.id} animation="fadeInUp" delay={index * 0.1}>
            <JobCard job={job} />
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
