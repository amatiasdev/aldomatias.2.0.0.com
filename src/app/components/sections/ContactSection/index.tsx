"use client";

import Typography from '@/app/components/atoms/Typography';
import Icon from '@/app/components/atoms/Icon';
import ContactForm from '@/app/components/organisms/ContactForm';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';

export default function ContactSection() {
  return (
    <SectionWrapper background="slate" padding="xl" id="contact">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-16 text-5xl md:text-6xl font-black tracking-tight">
          LET&apos;S WORK TOGETHER
        </Typography>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
        <AnimatedSection animation="slideLeft">
          <div className="space-y-8">
            <div>
              <Typography as="p" className="text-xl text-fg-secondary mb-8">
                Available for full-time opportunities and consulting projects.
              </Typography>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:contacto@aldomatias.com"
                className="flex items-center gap-4 text-lg text-fg-secondary hover:text-accent-500 transition-colors group"
              >
                <Icon name="email" size={24} className="group-hover:scale-110 transition-transform" />
                <span>contacto@aldomatias.com</span>
              </a>

              <div className="flex items-center gap-4 text-lg text-fg-tertiary">
                <Icon name="location" size={24} />
                <span>Dublin, Ireland</span>
              </div>

              <a
                href="https://linkedin.com/in/aldomatias"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg text-fg-secondary hover:text-accent-500 transition-colors group"
              >
                <Icon name="linkedin" size={24} className="group-hover:scale-110 transition-transform" />
                <span>linkedin.com/in/aldomatias</span>
              </a>

              <a
                href="https://github.com/aldomatias"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg text-fg-secondary hover:text-accent-500 transition-colors group"
              >
                <Icon name="github" size={24} className="group-hover:scale-110 transition-transform" />
                <span>github.com/aldomatias</span>
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideRight">
          <ContactForm />
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
