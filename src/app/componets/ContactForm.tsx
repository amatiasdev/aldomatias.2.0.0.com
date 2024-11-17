"use client"
// src/app/components/ContactForm.tsx
import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setNotificationMessage("");
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, company, email, message }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      // Restablecer el formulario
      setName('');
      setCompany('');
      setEmail('');
      setMessage('');
  
      // Mensaje de éxito o redirección (opcional)
      setIsSubmited(true);
      setNotificationType("success");
      setNotificationMessage("Thank you. I’ll be in touch with you soon.");
    } catch (error) {
      console.error(error);
      setNotificationMessage("Something went wrong. Please try again later.");
      setNotificationType("error");
    }finally{
      setIsSubmitting(false);
      setShowNotification(true);
    }
  };
  
  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {showNotification && (
         <div
         className={`fixed top-4 right-4 w-80 p-4 rounded-lg shadow-xl flex items-center space-x-4 z-[9999] ${
           notificationType === "success"
             ? "bg-green-500 border-green-700 text-white"
             : "bg-red-600 border-red-800 text-white"
         }`}
         style={{
           borderWidth: "2px", // Borde visible
         }}
       >
         {/* Ícono */}
         <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
           {notificationType === "success" ? "✔" : "✖"}
         </div>
     
         {/* Mensaje */}
         <p className="text-sm flex-1">{notificationMessage}</p>
     
         {/* Botón de cerrar */}
         <button
           onClick={closeNotification}
           className="text-lg font-bold text-white hover:text-gray-200 focus:outline-none"
         >
           ✖
         </button>
       </div>
      )}
        {
          !isSubmited ?
          (
            <>
            
              <form onSubmit={handleSubmit} id="contact" className="bg-secondaryBackground p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <div className="mb-4">
                  <label htmlFor="name" className="block">Name <span className="text-red-500"> *</span></label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-gray-900 transition duration-200 hover:border-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="company" className="block">Company <span className="text-red-500"> *</span></label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-gray-900 transition duration-200 hover:border-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block">E-mail <span className="text-red-500"> *</span></label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-gray-900 transition duration-200 hover:border-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block">Message <span className="text-red-500"> *</span></label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-gray-900 transition duration-200 hover:border-gray-700"
                    rows={4}
                    maxLength={300}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`flex items-center justify-center bg-black text-white py-3 px-4 rounded-full hover:bg-gray-500 transition duration-200 ${
                    isSubmitting ? "cursor-not-allowed opacity-75" : ""
                  }`}
                  disabled={isSubmitting} // Desactiva el botón mientras envía
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="loader border-2 border-t-transparent border-white rounded-full w-4 h-4 animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            </>
          )
          :
          (
            <div className="p-4 text-center bg-foreground text-background rounded-lg shadow-md dark:bg-dark-foreground dark:text-dark-background">
              <h2 className="text-lg font-semibold">Thank you!</h2>
              <p>I’ll be in touch with you soon.</p>
            </div>
          )
        }
    </div>
    
  );
}
