import React from 'react';

const UserInfo = ({ userImage, userName, caption }) => {
  return (
    <div className="absolute bottom-20 left-4 text-white z-10">
      <div className="flex items-center mb-4">
        <img src={userImage} className="w-12 h-12 rounded-full border-2 border-white" alt={userName} />
        <span className="ml-2 font-bold">{userName}</span>
      </div>
      <p className="text-sm max-w-[80%]">{caption}</p>
    </div>
  );
};

export default UserInfo;