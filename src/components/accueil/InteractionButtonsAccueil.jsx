import React from 'react';
import { Heart, Share, MessageCircle, Repeat, Flag, Eye } from 'lucide-react';

const InteractionButtonsAccueil = ({ likes, comments, views, onShowComments, onAuthAction }) => {
  return (
    <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
      <InteractionButton Icon={Heart} count={likes} onClick={onAuthAction} />
      <InteractionButton Icon={MessageCircle} count={comments} onClick={onShowComments} />
      <InteractionButton Icon={Share} onClick={onAuthAction} />
      <InteractionButton Icon={Repeat} onClick={onAuthAction} />
      <InteractionButton Icon={Flag} onClick={onAuthAction} />
      <InteractionButton Icon={Eye} count={views} />
    </div>
  );
};

const InteractionButton = ({ Icon, count, onClick }) => (
  <div className="flex flex-col items-center">
    <button onClick={onClick} className="p-2">
      <Icon className="w-8 h-8 text-white" />
      {count !== undefined && <span className="text-white text-xs">{count}</span>}
    </button>
  </div>
);

export default InteractionButtonsAccueil;