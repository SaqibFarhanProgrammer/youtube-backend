
import React from 'react';
import { useLocation } from 'react-router-dom';

const Placeholder = () => {
  const location = useLocation();
  const pathName = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] text-center p-8">
      <div className="w-32 h-32 bg-[#272727] rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl text-[#aaaaaa]">📺</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">{pathName || 'Page'}</h1>
      <p className="text-[#aaaaaa] max-w-md">
        This is a UI clone placeholder for the <strong>{location.pathname}</strong> route. 
        In a real app, this would display relevant dynamic content.
      </p>
      <button className="mt-6 bg-[#3ea6ff] text-black px-4 py-2 rounded-full font-medium hover:bg-[#65b8ff]">
        Learn More
      </button>
    </div>
  );
};

export default Placeholder;
