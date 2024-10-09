import React, { useState, useEffect } from 'react';

const AddMediaPostPage = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  // Gérer la récupération automatique de l'emplacement avec l'API Geolocation + Reverse Geocoding
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Utiliser l'API de géocodage inversé pour obtenir le nom de l'emplacement
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            setLocation(data.display_name || "Location not found");
          } catch (error) {
            console.error("Error retrieving location name:", error);
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    }
  }, []);

  const handleMediaChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newMediaFiles = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'video'
      }));
      setMediaFiles(prevFiles => [...prevFiles, ...newMediaFiles]);
    }
  };

  const removeMedia = (index) => {
    setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (mediaFiles.length > 0 && description) {
      console.log({ mediaFiles, description, location });
      // Réinitialiser les champs
      setMediaFiles([]);
      setDescription('');
      setLocation('');
    }
  };
  const getGridClasses = () => {
    const numImages = mediaFiles.length;
    if (numImages === 1) return "w-full h-full";
    if (numImages === 2) return "w-1/2 h-1/2";
    if (numImages <= 4) return "w-1/2 h-1/2";
    if (numImages <= 6) return "w-1/3 h-1/3";
    return "w-1/4 h-1/4";
  };

  return (
    <div className="flex w-full h-full">
      <div className="w-1/3 h-full flex flex-col items-center justify-center" style={{backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"}}>
        <div className="w-3/4 h-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Media</h2>
            <div className="border-2 border-dashed border-purple-500 rounded-lg p-4 hover:bg-purple-50 transition duration-200 ease-in-out">
              <input
                type="file"
                id="media"
                accept="image/,video/"
                onChange={handleMediaChange}
                multiple 
                className="hidden"
              />
              <label
                htmlFor="media"
                className="cursor-pointer flex flex-col items-center justify-center p-4 text-purple-600"
              >
                <i className="fas fa-upload text-3xl mb-2"></i>
                <span className="text-lg font-semibold">Upload photos/videos</span>
                <span className="text-sm text-gray-500 mt-1">or drag and drop</span>
              </label>
            </div>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            rows={3}
            placeholder="Write a caption..."
          />
          <div className="mt-4">
            <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
              <i className="fas fa-map-marker-alt text-purple-600"></i>
              <input
                type="text"
                value={location}
                readOnly
                className="flex-grow focus:outline-none"
                placeholder="Fetching location..."
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out
                ${mediaFiles.length === 0 || !description ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={mediaFiles.length === 0 || !description}
            >
              Share
            </button>
          </div>
        </div>
      </div>
      <div className="w-2/3 h-full p-4 mb-4">
        {mediaFiles.length > 0 ? (
          <div className="flex flex-wrap h-full">
            {mediaFiles.map((media, index) => (
              <div key={index} className={`relative group ${getGridClasses()}`}>
                {media.type === 'image' ? (
                  <img
                    src={media.preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <video
                    src={media.preview}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    controls
                  />
                )}
                <button
                  onClick={() => removeMedia(index)}
                  className="absolute top-1 right-1 bg-white p-2 rounded-full text-red-600 shadow hover:bg-red-100 transition duration-150 ease-in-out group-hover:opacity-100 opacity-0"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No media selected. Please upload some files.</p>
        )}
      </div>
    </div>
  );
};

export default AddMediaPostPage;
