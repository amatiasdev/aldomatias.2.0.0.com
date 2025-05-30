"use client";
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import JobCardDetail from '../components/JobCardDetail';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  period: string;
  city: string;
  description: string[];
}
export default function ExperiencePage() {


  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch data from jobs.json
    const loadJobs = async () => {
      const response = await fetch('/jobs.json');
      const data = await response.json();
      setJobs(data);

      const { hash } = window.location;
      if (hash) {
        scrollToSection(hash);
      }
    };

    loadJobs();
  }, []);

  const scrollToSection = (hash: string) => {
    const element = document.querySelector(hash);
    const yOffset = -100; // Ajusta este valor según la altura de tu header
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        scrollToSection(hash);
      }
    };

    // Escuchar cambios en el hash después de que los datos están disponibles
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <Fragment>
      <section className="flex flex-col items-center mt-20 p-4 md:flex-row md:justify-around">
        <div className="flex flex-col max-w-full md:max-w-[50%] ">
          <h1 className="text-2xl md:text-3xl">Employment History</h1>
          <p className="mt-2 text-base md:text-lg md:pb-3">
            In this section, you&apos;ll find an in-depth look at my professional journey,
            highlighting key projects, technologies, and roles that have shaped my career.
            From leading front-end development teams in dynamic financial environments to
            designing robust cloud infrastructure solutions, my experience spans across
            diverse industries and technical landscapes. Each project showcases my ability
            to drive innovation, streamline processes, and deliver high-quality results.
            Explore my professional history to discover how my technical expertise and leadership
            skills can add value to your team.
          </p>
        </div>
        <Image
          src="/Aldo+working.gif"
          alt="Mi foto"
          className="w-60 h-60 mt-4 md:mt-0 md:w-80 md:h-80 rounded"
          width={700}
          height={700}
          unoptimized
        />
      </section>

      <div className="space-y-6">
        {jobs.map((element, index) => (
          <JobCardDetail
            key={index}
            id={element.id}
            title={element.title}
            company={element.company}
            companyLogo={element.companyLogo}
            period={element.period}
            city={element.city}
            description={element.description}
          />
        ))}
      </div>
    </Fragment>
  );
}
