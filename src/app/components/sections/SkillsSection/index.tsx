"use client";

import Typography from '@/app/components/atoms/Typography';
import Badge from '@/app/components/atoms/Badge';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';

const skills = {
  "Cloud & Infrastructure": [
    "AWS", "EC2", "Active Directory", "DNS", "OpenVPN",
    "Windows Server", "Cybersecurity", "Disaster Recovery"
  ],
  "Front-End": [
    "React", "JavaScript ES6", "Lit-Element", "HTML5",
    "CSS3", "Redux", "Material UI", "SASS"
  ],
  "Backend & Databases": [
    "C#", "Java", "SQL Server", "API Development"
  ],
  "DevOps & Tools": [
    "Jenkins", "Git", "Bitbucket", "GitLab", "Postman", "WebRTC"
  ],
};

export default function SkillsSection() {
  return (
    <SectionWrapper background="warm" padding="xl" id="skills">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-16 text-5xl md:text-6xl font-black tracking-tight">
          TECHNICAL EXPERTISE
        </Typography>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skills).map(([category, techs], categoryIndex) => (
          <AnimatedSection
            key={category}
            animation="fadeInUp"
            delay={categoryIndex * 0.1}
          >
            <div>
              <Typography as="h3" variant="h4" className="text-accent-500 mb-4">
                {category}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <Badge key={tech} variant="accent" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
