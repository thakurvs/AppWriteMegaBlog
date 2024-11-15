import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


const SocialMediaLinks = () => {
  return (
    <div className="social-media-section w-full max-w-4xl p-6 mt-10 mx-4 md:mx-auto bg-gray-50 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Follow Us On Social Media</h2>
        <div className="flex justify-center space-x-8">
          {/* Facebook Link */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon bg-blue-600 hover:bg-blue-800 text-white p-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>

          {/* Twitter Link */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon bg-blue-400 hover:bg-blue-600 text-white p-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>

          {/* Instagram Link */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon bg-pink-600 hover:bg-pink-800 text-white p-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
