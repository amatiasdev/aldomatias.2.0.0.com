
"use client";
import { Fragment, useEffect } from 'react';
import ContactForm from '@/app/componets/ContactForm';
import EmploymentSection from './componets/EmploymentSection';

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
