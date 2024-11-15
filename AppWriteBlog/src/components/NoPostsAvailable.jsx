import React from 'react';
import Lottie from 'lottie-react';
import noPostsAnimation from '../assets/no-posts-animation.json'

const NoPostsAvailable = () => {
    return (
        <div className="w-full text-center flex justify-center items-center min-h-screen bg-gray-100  dark:bg-gray-800 text-black dark:text-white  dark:border-gray-700">
            <div className="flex flex-col items-center">
                {/* Lottie Animation for No Posts */}
                <Lottie animationData={noPostsAnimation} loop={true} className="w-80 h-80" />
                {/* Message to the User */}
                <h1 className="text-2xl font-bold hover:text-gray-500 mt-5">
                    No posts available right now, please add a post to see posts here
                </h1>
            </div>
        </div>
    );
};

export default NoPostsAvailable;