import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const CommentItem = ({ comment, onReply, onLike }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex space-x-3">
        <img src={comment.userImage} className="w-8 h-8 rounded-full" alt={comment.userName} />
        <div className="flex-1">
          <p className="font-bold">{comment.userName}</p>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
            <span>{comment.timestamp}</span>
            <button
              onClick={() => onLike(comment.id)}
              className="flex items-center space-x-1"
            >
              <Heart className={`w-4 h-4 ${comment.isLiked ? 'text-red-500 fill-current' : ''}`} />
              <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center space-x-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Répondre</span>
            </button>
          </div>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="ml-11 text-sm text-blue-500"
        >
          {showReplies ? 'Masquer les réponses' : `Voir les ${comment.replies.length} réponses`}
        </button>
      )}

      {showReplies && (
        <div className="ml-11 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} onLike={onLike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;