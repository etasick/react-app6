import React from "react";
import { Helmet } from 'react-helmet-async';

function ContactUs() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      
           <Helmet>
                <title>Contact us</title>
                <meta name="description" content="Contact us page" />
            </Helmet>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        Have questions or need help? Get in touch with us!
      </p>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-800">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-800">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-800">Message</label>
          <textarea
            placeholder="Your Message"
            className="w-full border border-gray-300 p-2 rounded h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
