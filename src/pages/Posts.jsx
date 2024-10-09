import React from 'react';
import TikTokPost from '../components/posts/TikTokPost';
import { posts } from '../data/posts';
import { useVerticalScroll } from '/home/ousseynou_diedhiou/Bureau/react js/social_media_tailor/src/hooks/UseVerticalScrool.jsx';

const Posts = () => {
  const { activeIndex, containerRef } = useVerticalScroll(posts.length);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden bg-black touch-none"
      style={{ overscrollBehavior: 'none' }}
    >
      <div
        className="transition-transform duration-300 ease-out h-full"
        style={{
          transform: `translateY(-${activeIndex * 100}%)`,
          willChange: 'transform',
        }}
      >
        {posts.map((post, index) => (
          <TikTokPost key={post.id} post={post} isActive={index === activeIndex} />
        ))}
      </div>
    </div>
  );
};

export default Posts;