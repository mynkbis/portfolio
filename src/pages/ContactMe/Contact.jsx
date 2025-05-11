import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import conctactus from "../../assets/Contactus.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [success, setSuccess] = useState("");
  const [successShow, setSuccessShow] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track submission status
  const [error, setError] = useState({}); // Error state to handle validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Reset specific error when the user starts typing
    setError(prevState => ({
      ...prevState,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) {
      errors.name = "Name is required.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.subject) {
      errors.subject = "Subject is required.";
    }
    if (!formData.message) {
      errors.message = "Message cannot be empty.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    // Replace with your EmailJS details
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      to_name: "Surya",
      from_name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result) => {
        setSuccessShow(true);
        setSuccess("Thanks for your message! I'll get back to you soon.");
        setSubmitted(true); // Mark the form as submitted
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form data
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setError(prevState => ({
          ...prevState,
          apiError: 'Oops! Something went wrong. Please try again later.'
        }));
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSubmitted(false); // Reset submission state
    setSuccessShow(false); // Hide success message
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    setError({}); // Clear validation errors
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 z-0">
        <img 
          src={conctactus} 
          alt="Reach us" 
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      <div className="bg-gradient-to-br from-slate-600 via-slate-900 to-slate-900 absolute opacity-90 w-full h-full"></div>
      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4">
        <span className="text-5xl md:text-6xl font-normal mb-6 text-center">Let’s Work Together</span>
        <div className="border-t-2 border-teal-500 w-32 mb-10"></div>
        <div className="text-center mb-12 max-w-2xl">
          <p className="text-xl">Excited about your project? So am I!.</p>
          <p className="text-xl pt-1">Drop me a line, and let’s create something amazing</p>
        </div>
        
        <form className="w-full max-w-2xl">
          <div className="mb-6">
            <label htmlFor="name" className="block text-white tracking-wide text-sm font-normal mb-2">Name <span className='!text-red-600'>*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setError(prevState => ({ ...prevState, name: "" }))}
              required
              className="w-full bg-white rounded-sm h-10 !pl-3 !text-teal-900 border border-gray-600 focus:!border-teal-500 px-10 py-2 outline-none"
            />
            {error.name && <span className="text-red-500 text-sm">{error.name}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-white tracking-wide text-sm font-normal mb-2">Email <span className='!text-red-600'>*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setError(prevState => ({ ...prevState, email: "" }))}
              required
              className="w-full bg-white rounded-sm h-10 !pl-3 !text-teal-900 border border-gray-600 focus:!border-teal-500 px-10 py-2 outline-none"
            />
            {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-white tracking-wide text-sm font-normal mb-2">Subject <span className='!text-red-600'>*</span></label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setError(prevState => ({ ...prevState, subject: "" }))}
              required
              className="w-full bg-white rounded-sm h-10 !pl-3 !text-teal-900 border border-gray-600 focus:!border-teal-500 px-10 py-2 outline-none"
            />
            {error.subject && <span className="text-red-500 text-sm">{error.subject}</span>}
          </div>

          <div className="mb-10">
            <label htmlFor="message" className="block text-white tracking-wide text-sm font-normal mb-2">Message <span className='!text-red-600'>*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setError(prevState => ({ ...prevState, message: "" }))}
              required
              rows="4"
              className="w-full bg-white rounded-sm h-20 !pl-3 !text-teal-900 border border-gray-600 focus:!border-teal-500 px-10 py-2 outline-none"
            ></textarea>
            {error.message && <span className="text-red-700 text-sm">{error.message}</span>}
            {error.apiError && <span className="text-red-700 text-sm">{error.apiError}</span>}
            {successShow && <span className='!text-white'>{success}</span>}
          </div>

          <div className="flex justify-center">
            <button
              onClick={(e) => {
                submitted ? handleReset(e) : handleSubmit(e)
              }}
              className="border border-teal-500 !p-2 rounded-sm text-teal-500 hover:!bg-teal-700 hover:text-white px-8 py-3 tracking-wider duration-300 !bg-teal-500"
            >
              {submitted ? "Send Another Message" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
