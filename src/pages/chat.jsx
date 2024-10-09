import React, { useState} from 'react';
import ChatWindow from '../components/chat/ChatWindow';
import Sidebar from '../components/chat/Sidebar';
// import chats from '../data/chats';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [showUserInfo, setShowUserInfo] = useState(false);

  const chats = [
    {
        id: 1,
        name: 'SAER MBOW',
        avatar: 'WhatsApp Image 2024-04-29 at 15.38.36.jpeg',
        lastMessage: 'Mbaye Kasse: 📹 Vidéo',
        lastMessageTime: '07:38',
        status: 'en ligne',
      },
      {
        id: 2,
        name: 'EL HADJI ODC',
        avatar: 'WhatsApp Image 2024-04-29 at 15.39.20.jpeg',
        lastMessage: 'Les membres chargé de l\'organisation',
        lastMessageTime: '00:22',
        status: 'en ligne',
      },
      {
        id: 3,
        name: 'FATOUMATA ODC',
        avatar: 'WhatsApp Image 2024-04-29 at 15.40.54.jpeg',
        lastMessage: 'Bilay iow',
        lastMessageTime: 'Hier',
        status: 'en ligne aujourd\'hui à 15:43',
      },
      {
        id: 4,
        name: 'NDIAGA LO',
        avatar: 'WhatsApp Image 2024-06-30 at 00.26.33.jpeg',
        lastMessage: 'Bayil sahti sama sticker bi',
        lastMessageTime: 'Hier',
        status: 'vu hier',
      },
  ];

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    if (!messages[chat.id]) {
      setMessages(prev => ({
        ...prev,
        [chat.id]: [
          { sender: 'other', text: 'Ousseynon esk dofo', time: '23:10' },
          { sender: 'me', text: 'dou tay 😂😂😂 wouy loupé', time: '23:11' },
          { sender: 'me', text: 'tay dama am dolé hoo touss nak', time: '23:14' },
          { sender: 'other', text: 'Dinala damaté souba si match bi allons rék', time: '23:19' },
          { sender: 'me', text: 'nieuwouma ma bagne', time: '23:19' },
          { sender: 'me', text: 'sinon gayi danioumay neukeul', time: '23:19' },
          { sender: 'other', text: 'Baadou', time: '23:38' },
          { sender: 'me', text: 'Bilay iow', time: '23:41' },
        ]
      }));
    }
  };

  const handleSendMessage = (messageText) => {
    const newMessage = { sender: 'me', text: messageText, time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar chats={chats} onChatClick={handleChatClick} selectedChat={selectedChat} />
      {selectedChat ? (
        <>
          <ChatWindow
            selectedChat={selectedChat}
            messages={messages[selectedChat.id] || []}
            onSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center bg-white">
          <p className="text-black">Sélectionnez une discussion pour commencer à discuter</p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;