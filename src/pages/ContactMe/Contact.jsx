import React, { useState } from 'react';
import conctactus from "../../assets/Contactus.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically handle the form submission, like sending to an API
    alert('Thanks for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={conctactus} 
          alt="Reach us" 
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      <div className="bg-black absolute opacity-90  w-full h-full"></div>

      
      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4">
        <span className="text-5xl md:text-6xl font-bold mb-6 text-center">Get In Touch</span>
        
        <div className="border-t-2 border-teal-500 w-32 mb-10"></div>
        
        <div className="text-center mb-12 max-w-2xl">
          <p className="text-xl">
            Have a sweet project in mind or just want to say hi?
          </p>
          <p className="text-xl">
            Feel free to send me a message!
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-400 uppercase tracking-wide text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-600 focus:!border-teal-500 px-3 py-2 outline-none transition-colors"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-400 uppercase tracking-wide text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-teal-500 px-3 py-2 outline-none transition-colors"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-400 uppercase tracking-wide text-sm font-bold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-teal-500 px-3 py-2 outline-none transition-colors"
            />
          </div>
          
          <div className="mb-10">
            <label htmlFor="message" className="block text-gray-400 uppercase tracking-wide text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-transparent border-b !border-gray-600 focus:!border-teal-500 px-3 py-2 outline-none transition-colors"
            ></textarea>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="border !border-teal-500 !p-2 rounded-sm text-teal-500 hover:!bg-teal-500 hover:text-white px-8 py-3 uppercase tracking-wider transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;