import React from 'react';

const EmojiPicker = ({ onEmojiClick }) => {
  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '🎉', '🔥', '❤️', '😎', '📹'];
  
  return (
    <div className="absolute bottom-16 left-0 bg-white p-2 rounded-lg shadow-lg">
      <div className="grid grid-cols-5 gap-2">
        {emojis.map(emoji => (
          <button
            key={emoji}
            onClick={() => onEmojiClick(emoji)}
            className="text-2xl hover:bg-gray-200 p-1 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;