import React, { useState } from 'react';

const UserInfoPanel = ({ user, closePanel, isOpen }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!user) return null;

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`fixed top-0 right-0 w-1/3 bg-gray-900 text-white h-full z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between px-6 pt-6">
        <div className="flex items-center space-x-4 mb-6 p-6">
          <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full border-2 border-purple-500 p-0.5" />
          <div>
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-sm text-gray-400">{user.location}</p>
          </div>
        </div>
        <button onClick={closePanel} className="text-white text-2xl">&times;</button>
      </div>
      <div className="flex justify-between px-6">
        <div>
          <p className="text-xl font-bold">{user.followers}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div>
          <p className="text-xl font-bold">{user.following}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
        <button className="bg-purple-600 text-white w-1/4 h-10 rounded-3xl">Follow</button>
      </div>
      <div className="mt-20 bg-white rounded-t-3xl overflow-hidden h-screen p-10 mr-3">
        <h3 className="text-3xl font-bold text-black">Portfolio</h3>
        <div className="flex space-x-4 mt-6">
          <span className="text-sm text-purple-600 border-b-2 border-purple-600">Neon City</span>
          <span className="text-sm text-gray-500">Street Art</span>
          <span className="text-sm text-gray-500">Fashion</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {user.portfolio.map((img, index) => (
            <img key={index} src={img} alt="Portfolio image" className="rounded-lg cursor-pointer" onClick={() => openImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Visualiseur d'image en plein écran */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <img src={selectedImage} alt="Full screen" className="max-w-full max-h-full" />
          <button onClick={closeImage} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
        </div>
      )}
    </div>
  );
};

export default UserInfoPanel;
