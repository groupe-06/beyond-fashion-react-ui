import React, { useState } from 'react';
import Video from '../posts/Video';
import UserInfo from '../posts/UserInfo';
import InteractionButtonsAccueil from './InteractionButtonsAccueil';
import CommentsDialogAccueil from './CommentsDialogAccueil';

const TikTokPostAccueil = ({ post, isActive, onAuthAction }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className='relative h-full w-full flex'>
            <div className="w-full h-full flex justify-center">
                <div className="h-screen relative bg-black flex items-center justify-center">
                    <Video videoUrl={post.videoUrl} isActive={isActive} />
                    <UserInfo userImage={post.userImage} userName={post.userName} caption={post.caption} />
                    <InteractionButtonsAccueil
                        likes={post.likes}
                        comments={post.comments.length}
                        views={post.views}
                        onShowComments={() => setShowComments(true)}
                        onAuthAction={onAuthAction}
                    />
                </div>
            </div>
            <div
                className={`fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg transform transition-transform duration-300 
                ${showComments ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <CommentsDialogAccueil
                    isOpen={showComments}
                    onClose={() => setShowComments(false)}
                    comments={post.comments}
                    onAuthAction={onAuthAction}
                />
            </div>
        </div>
    );
};

export default TikTokPostAccueil;
