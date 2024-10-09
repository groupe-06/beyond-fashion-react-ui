import React from 'react';

const Sidebar = ({ setActivePage, activePage }) => {
  const navItems = [
    { name: 'home', icon: 'fas fa-home' },
    { name: 'messages', icon: 'fas fa-comment-dots' },
    { name: 'add', icon: 'fas fa-plus' },
    { name: 'likes', icon: 'fas fa-heart' },
    { name: 'profile', icon: 'fas fa-user' },
  ];

  return (
    <div className="w-24 h-screen bg-gradient-to-b from-black to-purple-900 flex flex-col items-center py-6">
      <div className="mb-20">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
          <img src="logoo.png" alt="Profile" className="w-20 h-20 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-8">
        {navItems.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => setActivePage(name)}
            className={`relative cursor-pointer transition-all duration-300 ${
              activePage === name ? 'text-blue-500 scale-110 rounded-xl bg-gray-800' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className={`w-16 h-16 flex items-center justify-center ${activePage === name}`}>
              <i className={`${icon} text-2xl`}></i>
            </div>
            {name === 'notifications' && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500"></span>
            )}
          </div>
        ))}
      </div>
      <div className="flex-grow"></div>
      <div>
        <i className="fas fa-power-off text-gray-400 text-2xl"></i>
      </div>
    </div>
  );
};

export default Sidebar;
