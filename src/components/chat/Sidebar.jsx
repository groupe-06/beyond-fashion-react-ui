import React, { useState} from 'react';
import { Search, MoreVertical} from 'lucide-react';

const Sidebar = ({ chats, onChatClick, selectedChat }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchTerm('');
    }
  };

  return (
    <div className="w-1/3 bg-black text-white flex flex-col h-screen border-r border-gray-700">
      <div className="p-2 bg-gradient-to-b from-black to-purple-900 flex justify-between items-center">
        <img src="ousseynouODC.jpeg" alt="Profile" className="w-10 h-10 rounded-full" />
        <div className="flex space-x-4">
          <button onClick={toggleSearch}><Search className="text-white" size={20} /></button>
          <button><MoreVertical className="text-white" size={20} /></button>
        </div>
      </div>
      {searchVisible && (
        <div className="bg-black p-2">
          <div className="bg-white rounded-lg flex items-center px-4 py-1">
            <Search className="text-gray-500 mr-4" size={20} />
            <input
              type="text"
              placeholder="Rechercher ou démarrer une nouvelle discussion"
              className="bg-transparent text-black w-full focus:outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="flex-grow overflow-y-auto">
        {chats
          .filter(chat => chat.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-3 hover:bg-gray-800 cursor-pointer ${
              selectedChat?.id === chat.id ? 'bg-gray-800' : ''
            }`}
            onClick={() => onChatClick(chat)}
          >
            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full mr-3" />
            <div className="flex-grow border-b border-gray-700 pb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{chat.name}</h3>
                <span className="text-xs text-gray-400">{chat.lastMessageTime}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;