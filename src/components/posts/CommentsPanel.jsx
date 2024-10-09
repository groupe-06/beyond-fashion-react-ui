import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import CommentItem from './CommentItem';

const CommentsPanel = ({ comments, onClose, onAddComment, onReply, onLikeComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Commentaires</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={onReply}
            onLike={onLikeComment}
          />
        ))}
      </div>
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-full mr-2"
          placeholder="Ajouter un commentaire..."
        />
        <button onClick={handleSubmitComment} className="bg-blue-500 text-white p-2 rounded-full">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CommentsPanel;