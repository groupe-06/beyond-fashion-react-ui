import React, { useState } from 'react';
import Video from './Video';
import UserInfo from './UserInfo';
import InteractionButtons from './InteractionButtons';
import CommentsPanel from './CommentsPanel';
import SharePanel from './SharePanel';
import RepostDialog from './RepostDialog';
import ReportDialog from './ReportDialog';

const TikTokPost = ({ post, isActive }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleReply = (commentId) => {
  };

  const handleLikeComment = (commentId) => {
  };

  const handleAddComment = (newComment) => {
  };

  const handleRepost = (note) => {
    setShowRepostDialog(false);
  };

  const handleReport = (reason) => {
    setShowReportDialog(false);
  };

  return (
    <div className="relative h-full w-full flex">
      <div className="w-full h-full flex justify-center">
        <div className="flex-grow flex items-center justify-center">
          <Video videoUrl={post.videoUrl} isActive={isActive} />
          <UserInfo userImage={post.userImage} userName={post.userName} caption={post.caption} />
          <InteractionButtons
            isLiked={isLiked}
            likes={likes}
            comments={post.comments.length}
            views={post.views}
            onLike={handleLike}
            onShowComments={() => setShowComments(true)}
            onShare={() => setShowSharePanel(true)}
            onRepost={() => setShowRepostDialog(true)}
            onReport={() => setShowReportDialog(true)}
          />
        </div>

        {showSharePanel && (
          <SharePanel
            onClose={() => setShowSharePanel(false)}
          />
        )}

        <RepostDialog
          isOpen={showRepostDialog}
          onClose={() => setShowRepostDialog(false)}
          onRepost={handleRepost}
        />
        <ReportDialog
          isOpen={showReportDialog}
          onClose={() => setShowReportDialog(false)}
          onReport={handleReport}
        />
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg transform transition-transform duration-300 
                ${showComments ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {showComments && (
          <CommentsPanel
            comments={post.comments}
            onClose={() => setShowComments(false)}
            onAddComment={handleAddComment}
            onReply={handleReply}
            onLikeComment={handleLikeComment}
          />
        )}
      </div>
    </div>
  );
};

export default TikTokPost;