import React from 'react';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/login-animation.json';

const NotLoggedIn = () => {
    return (
        <div className="w-full flex justify-center items-center text-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                {/* Lottie Animation */}
                <Lottie animationData={loginAnimation} loop={true} className="w-80 h-80" />
                {/* Call-to-action text */}
                <h1 className="text-2xl font-bold hover:text-gray-500 mt-5">
                    Please log in to read posts
                </h1>
            </div>
        </div>
    );
};

export default NotLoggedIn;