import React, { useState } from 'react';
import TikTokPostAccueil from '../components/accueil/TikTokPostAccueil';
import AuthPopup from './AuthPopup';
import { posts } from '../data/posts';
import { useVerticalScroll } from '../hooks/UseVerticalScrool';


const Accueil = () => {
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const { activeIndex, containerRef } = useVerticalScroll(posts.length);

    const handleAuthAction = () => {
        setShowAuthPopup(true);
    };

    return (
        <div className="h-screen w-full bg-black flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center py-4 px-6 bg-black text-white animate-slide-in-down">
                <h1 className="text-2xl font-bold">Media Social Tailor</h1>
                <div className="flex items-center space-x-4">
                    <p className="text-sm hidden md:block">Rejoignez la communauté des tailleurs créatifs !</p>
                    <button
                        onClick={handleAuthAction}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                    >
                        S'inscrire
                    </button>
                </div>
            </header>
            {/* Main content */}
            <main className="flex-grow relative">
                <div
                    ref={containerRef}
                    className="h-full overflow-hidden touch-none"
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
                            <TikTokPostAccueil
                                key={post.id}
                                post={post}
                                isActive={index === activeIndex}
                                onAuthAction={handleAuthAction}
                                className={`transition-transform duration-500 ease-in-out ${index === activeIndex ? 'scale-105 rotate-3' : 'scale-100'}`}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <AuthPopup isOpen={showAuthPopup} onClose={() => setShowAuthPopup(false)} />
        </div>
    );
};

export default Accueil;
