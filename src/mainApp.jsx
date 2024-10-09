import React, { useState } from 'react';
import Sidebar from './pages/Sidebar';
import Dashboard from './components/Dashboard';
import AddMediaPost from './components/AddMediaPost';
import Posts from './pages/Posts';
import Chats from './pages/chat';

const MainApp = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Dashboard />;
      case 'likes':
        return <Posts/>;
      case 'messages':
        return <Chats/>;
        case 'add':
        return <AddMediaPost/>;
      case 'profile':
        return (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-gray-400">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)} Page
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-grow overflow-hidden">
        {renderPage()}
      </div>
    </div>
  );
};

export default MainApp;