
import Image from 'next/image';
import React, {Fragment} from 'react';
import JobCard from './JobCard';
import Link from 'next/link';
export default function EmploymentSection() {

  return (
    <Fragment>
        <section className="flex flex-col items-center mt-20 p-4 md:flex-row md:justify-around">
            <div className="flex flex-col max-w-full md:max-w-[50%] ">
            <h1 className="text-2xl md:text-3xl">Aldo Matias</h1>
            <p className="mt-2 text-base md:text-lg md:pb-3">
                I am a highly skilled Full-Stack Developer with over 5 years of experience designing, 
                developing, and implementing web applications across diverse industries. I have a proven 
                ability to lead and mentor development teams, ensuring project success and high-quality results. 
                I am proficient in both front-end and back-end technologies, including  
                <strong> JavaScript (ES6), ReactJS, HTML5, CSS3, Java, SQL, </strong> and
                <strong> AWS Cloud services.</strong>
            </p>
            </div>
            <Image
            src="/aldo-matias.jpg"
            alt="Mi foto"
            className="w-60 h-60 mt-4 md:mt-0 md:w-80 md:h-80 rounded-full"
            width={500}
            height={500}
            />
        </section>



        <section className="p-8">
            <h2 className="text-2xl mb-4">Employment History</h2>
            <div className="grid gap-4">
            <JobCard title="Cloud Infrastructure Engineer" company="IT-KEEPER" companyLogo="/IT-KEEPER-logo.png"
                description="Designing and implementing disaster recovery solutions using AWS. Responsible 
                for setting up secure VPNs with EC2, managing Windows Server for DNS and Active Directory, 
                and overseeing the project lifecycle to ensure security and performance." 
                link="it-keeper"
            />
            <JobCard title="Front-End Developer" company="BBVA Bank" companyLogo="/bbva-logo.png"
                description="Led the development of an internal app with JavaScript ES6, Lit-Element, HTML5,
                and CSS3. Streamlined development with reusable components and maintained API documentation. 
                Key in migrating the legacy system to modern architecture." 
                link="bbva"
            />
            <JobCard title="Front-End Developer" company="AHEA University" companyLogo="/AHEA-logo.png"
                description="Developed a platform for managing students, professors, and administrators using
                React, Redux, and WebRTC. Created a scalable video conferencing module with Amazon Chime and 
                a custom component library for efficiency." 
                link="ahea" 
            />
            </div>
            <div className="flex justify-center mt-4">
            <Link href="/experience">
                <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-500 transition duration-200 p-4 mt-4 ">See more</button>
            </Link>
            </div>
        </section>
      </Fragment>
  );
}
