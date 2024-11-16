"use client"
// src/app/components/ContactForm.tsx
import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
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
      alert('Message sent successfully');
    } catch (error) {
      console.error(error);
      alert('Error sending message');
    }
  };
  

  return (
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
          required
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white py-3 px-4 rounded-full hover:bg-gray-500 transition duration-200"
      >
        Send
      </button>

    </form>
  );
}
