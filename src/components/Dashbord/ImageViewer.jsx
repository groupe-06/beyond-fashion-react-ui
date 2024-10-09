// Importation de la fonction useState de React
import React, { useState } from 'react';

const ImageViewer = ({ images, startIndex, closeViewer }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <img 
        src={images[currentIndex]} 
        alt="Full screen" 
        className="max-w-full w-1/2 max-h-full h-full" 
      />
      <button 
        onClick={handlePrev} 
        className="absolute top-1/2 left-4 text-white text-4xl transform -translate-y-1/2"
      >
        &lt;
      </button>
      <button 
        onClick={handleNext} 
        className="absolute top-1/2 right-4 text-white text-4xl transform -translate-y-1/2"
      >
        &gt;
      </button>
      <button 
        onClick={closeViewer} 
        className="absolute top-4 right-4 text-white text-2xl"
      >
        &times;
      </button>
    </div>
  );
};

export default ImageViewer;
