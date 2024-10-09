import React, { useState, useEffect } from 'react';

const StoryViewer = ({ story, closeStory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => prev + 1);
      } else {
        if (currentIndex < story.images.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setProgress(0);
        } else {
          closeStory();
        }
      }
    }, 30);

    return () => clearInterval(timer);
  }, [progress, currentIndex, story.images.length, closeStory]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < story.images.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-1/3 h-full bg-gradient-to-b from-black to-purple-900 rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-full flex p-2">
          {story.images.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-gray-600 mx-1">
              <div
                className="h-full bg-white"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                }}
              ></div>
            </div>
          ))}
        </div>
        
        <img src={story.images[currentIndex]} alt="Story" className="w-full h-full object-cover" />
        
        {/* En-tête avec info utilisateur */}
        <div className="absolute top-8 left-4 flex items-center">
          <img src={story.userImage} alt={story.userName} className="w-10 h-10 rounded-full mr-2 border-2 border-white" />
          <span className="text-white font-semibold">{story.userName}</span>
        </div>

        {/* Message du story */}
        <div className="absolute bottom-8 left-4 right-4 bg-black bg-opacity-50 p-4 rounded-lg">
          <p className="text-white">{story.messages[currentIndex]}</p>
        </div>

        <button onClick={closeStory} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
        
        <button onClick={handlePrev} className="absolute top-1/2 left-4 text-white text-4xl transform -translate-y-1/2 opacity-50 hover:opacity-100">&lt;</button>
        <button onClick={handleNext} className="absolute top-1/2 right-4 text-white text-4xl transform -translate-y-1/2 opacity-50 hover:opacity-100">&gt;</button>
      </div>
    </div>
  );
};

export default StoryViewer;