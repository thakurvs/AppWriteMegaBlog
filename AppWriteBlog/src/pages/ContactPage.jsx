import React from 'react';
import SocialMediaLinks from '@/components/SocialMediaLinks/SocialMediaLinks ';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
      {/* Header */}
      <div className="bg-blue-600 w-full py-8 text-white text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2">We'd love to hear from you! Get in touch with us.</p>
      </div>

      {/* Contact Form Section */}
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg mt-10 mx-4 md:mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="6"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Social Media Links */}
      <SocialMediaLinks />

      {/* Map Section */}
      <div className="w-full max-w-4xl p-6 mt-10 mx-4 md:mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
        </div>
        <iframe
          className="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092547!2d144.9556513155047!3d-37.81732797975152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777769cb938a0!2sVictoria%20Street%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1632192568769!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Footer
      <footer className="w-full py-6 bg-gray-800 text-white text-center mt-10">
        <p>&copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
