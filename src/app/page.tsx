
"use client";
import { Fragment, useEffect } from 'react';
import ContactForm from '@/app/components/ContactForm';
import EmploymentSection from './components/EmploymentSection';

export default function HomePage() {

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  
  return (
    <Fragment>
      <EmploymentSection/>
      <section className="p-8">
        <ContactForm />
      </section>
    </Fragment>
  );
}
