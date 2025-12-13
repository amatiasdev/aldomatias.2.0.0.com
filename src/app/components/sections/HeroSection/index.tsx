"use client";

import { motion } from 'framer-motion';
import Typography from '@/app/components/atoms/Typography';
import Button from '@/app/components/atoms/Button';
import { useCVModal } from '@/contexts/CVModalContext';
import { fadeInUp, staggerContainer } from '@/app/constants/animations';

export default function HeroSection() {
  const { openModal } = useCVModal();

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/aldo-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient fade to black at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[5]" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center text-center px-6 pt-20"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="max-w-7xl">
          <motion.div variants={fadeInUp}>
            <h1
              className="text-7xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-br from-fg-primary via-fg-secondary to-accent-500 bg-clip-text text-transparent leading-[0.9]"
            >
              ALDO MATIAS
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              as="h2"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-500 mb-10 tracking-tight uppercase"
            >
              Cloud Infrastructure Engineer & Front-End Developer
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography as="p" className="text-fg-secondary text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
              Building scalable solutions with AWS, React, and modern web technologies. Based in Dublin, Ireland.
            </Typography>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="lg"
                href="#experience"
                className="text-lg px-12 py-5 shadow-accent-lg hover:shadow-accent font-bold"
              >
                View Projects
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={openModal}
                className="text-lg px-12 py-5 font-bold"
              >
                View CV
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
