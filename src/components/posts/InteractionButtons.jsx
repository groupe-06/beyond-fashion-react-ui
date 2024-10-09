import React from 'react';
import { Heart, Share, MessageCircle, Repeat, Flag, Eye } from 'lucide-react';

const InteractionButtons = ({ isLiked, likes, comments, views, onLike, onShowComments, onShare, onRepost, onReport }) => {
  return (
    <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
      <InteractionButton Icon={Heart} count={likes} isActive={isLiked} onClick={onLike} />
      <InteractionButton Icon={MessageCircle} count={comments} onClick={onShowComments} />
      <InteractionButton Icon={Share} onClick={onShare} />
      <InteractionButton Icon={Repeat} onClick={onRepost} />
      <InteractionButton Icon={Flag} onClick={onReport} />
      <InteractionButton Icon={Eye} count={views} />
    </div>
  );
};

const InteractionButton = ({ Icon, count, isActive, onClick }) => (
  <div className="flex flex-col items-center">
    <button onClick={onClick} className="p-2">
      <Icon className={`w-8 h-8 ${isActive ? 'text-red-500 fill-current' : 'text-white'}`} />
      {count !== undefined && <span className="text-white text-xs">{count}</span>}
    </button>
  </div>
);

export default InteractionButtons;