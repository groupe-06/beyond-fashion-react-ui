import React, { useState } from 'react';
import { Camera, Edit2, MapPin, Mail, Phone, Star, Grid, Bookmark, Heart, MessageCircle, Settings, Bell, X, ArrowLeft, Shield, Lock } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstname: 'Ousseynou',
    lastname: 'Diedhiou',
    email: 'diedhiouousseynou53@gmail.com',
    phone: '785304869',
    bio: 'Passionate tailor with 5 years of experience.',
    address: 'Pikine',
    photo: 'ousseynouODC.jpeg',
    role: 'TAILOR',
    followers: 1234,
    following: 567,
    rating: 4.8,
    totalReviews: 156,
    showToast: false
  });

  const [reposts] = useState([
    {
      id: 1,
      image: '/api/placeholder/300/400',
      likes: 156,
      comments: 23,
      originalAuthor: 'Marie Dubois',
      originalDate: 'il y a 2 jours'
    },
    {
      id: 2,
      image: '/api/placeholder/300/400',
      likes: 89,
      comments: 12,
      originalAuthor: 'Pierre Martin',
      originalDate: 'il y a 1 semaine'
    }
  ]);

  const [currentPage, setCurrentPage] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState('posts');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notifications = [
    { id: 1, message: 'Nouveau message de Marie', time: 'Il y a 5min' },
    { id: 2, message: 'Pierre a aimé votre publication', time: 'Il y a 1h' },
    { id: 3, message: 'Nouvelle commande reçue', time: 'Il y a 2h' },
  ];

  const [posts] = useState([
    { id: 1, image: '/api/placeholder/300/400', likes: 234, comments: 45 },
    { id: 2, image: '/api/placeholder/300/400', likes: 187, comments: 32 },
    { id: 3, image: '/api/placeholder/300/400', likes: 543, comments: 89 },
  ]);

  const handleSaveProfile = () => {
    setUser({
      ...editedUser,
      showToast: true
    });
    setIsEditing(false);
    setTimeout(() => {
      setUser(prev => ({ ...prev, showToast: false }));
    }, 3000);
  };

  const PageHeader = ({ title, onBack }) => (
    <div className="flex items-center gap-4 mb-6 p-4 border-b">
      <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );

  const PrivacyPage = () => (
    <div className="max-w-7xl mx-auto bg-white">
      <PageHeader
        title="Confidentialité"
        onBack={() => setCurrentPage('profile')}
      />
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Compte privé</h3>
                  <p className="text-sm text-gray-500">Seuls vos abonnés peuvent voir vos publications</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Masquer le statut en ligne</h3>
                  <p className="text-sm text-gray-500">Les autres ne verront pas quand vous êtes en ligne</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsPage = () => (
    <div className="max-w-7xl mx-auto bg-white">
      <PageHeader
        title="Notifications"
        onBack={() => setCurrentPage('profile')}
      />
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 space-y-4">
            <div className="space-y-4">
              {notifications.map(notif => (
                <div key={notif.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{notif.message}</p>
                    <p className="text-sm text-gray-500">{notif.time}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityPage = () => (
    <div className="max-w-7xl mx-auto bg-white">
      <PageHeader
        title="Sécurité"
        onBack={() => setCurrentPage('profile')}
      />
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 space-y-4">
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium">Changer le mot de passe</h3>
                    <p className="text-sm text-gray-500">Dernière modification il y a 3 mois</p>
                  </div>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium">Authentification à deux facteurs</h3>
                    <p className="text-sm text-gray-500">Sécurisez davantage votre compte</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EditFormPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl">
        <div className="w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Modifier le profil</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prénom</label>
                  <input
                    type="text"
                    value={editedUser.firstname}
                    onChange={(e) => setEditedUser({ ...editedUser, firstname: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    value={editedUser.lastname}
                    onChange={(e) => setEditedUser({ ...editedUser, lastname: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={editedUser.phone}
                    onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adresse</label>
                <div className="relative">
                  <input
                    type="text"
                    value={editedUser.address}
                    onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={editedUser.bio}
                  onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleSettingsClick = (page) => {
    setCurrentPage(page);
    setShowSettings(false);
  };

  if (currentPage === 'privacy') return <PrivacyPage />;
  if (currentPage === 'notifications') return <NotificationsPage />;
  if (currentPage === 'security') return <SecurityPage />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div className="flex justify-end gap-4 mb-6">
        <div className="relative">
          <button
            onClick={() => handleSettingsClick('notifications')}
            className="p-2 hover:bg-gray-100 rounded-full relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
          {showSettings && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold">Paramètres</h3>
              </div>
              <div className="py-2">
                <button
                  onClick={() => handleSettingsClick('privacy')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Lock className="w-4 h-4" />
                  Confidentialité
                </button>
                <button
                  onClick={() => handleSettingsClick('notifications')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>
                <button
                  onClick={() => handleSettingsClick('security')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Shield className="w-4 h-4" />
                  Sécurité
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-shrink-0">
          <div className="relative w-40 h-40">
            <img
              src={user.photo}
              alt={`${user.firstname} ${user.lastname}`}
              className="w-full h-full object-cover rounded-full"
            />
            <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700">
              <Camera className="w-5 h-5 text-white" />
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              {user.firstname} {user.lastname}
            </h1>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              <Edit2 className="w-4 h-4" />
              Modifier le profil
            </button>
          </div>

          <div className="flex gap-6 mb-4">
            <div className="text-center">
              <div className="font-semibold">{user.followers}</div>
              <div className="text-gray-600 text-sm">Abonnés</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{user.following}</div>
              <div className="text-gray-600 text-sm">Abonnements</div>
            </div>
            <div className="text-center">
              <div className="font-semibold flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                {user.rating}
              </div>
              <div className="text-gray-600 text-sm">{user.totalReviews} avis</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" /> {user.email}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" /> {user.phone}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" /> {user.address}
            </div>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${activeTab === 'posts' ? 'border-purple-600 text-purple-600' : 'border-transparent'
              }`}
          >
            <Grid className="w-4 h-4" /> Posts
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${activeTab === 'liked' ? 'border-purple-600 text-purple-600' : 'border-transparent'
              }`}
          >
            <Heart className="w-4 h-4" /> Aimés
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${activeTab === 'saved' ? 'border-purple-600 text-purple-600' : 'border-transparent'
              }`}
          >
            <Bookmark className="w-4 h-4" /> Sauvegardés
          </button>
          <button
            onClick={() => setActiveTab('reposts')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${activeTab === 'reposts' ? 'border-purple-600 text-purple-600' : 'border-transparent'
              }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 014-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 01-4 4H3" />
            </svg>
            Republiés
          </button>
        </div>
      </div>

      {activeTab === 'posts' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="relative group aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <div className="flex items-center text-white">
                  <Heart className="w-5 h-5 mr-1" /> {post.likes}
                </div>
                <div className="flex items-center text-white">
                  <MessageCircle className="w-5 h-5 mr-1" /> {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'liked' && (
        <div className="text-center text-gray-500 py-8">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Aucun post aimé pour le moment</p>
          <p className="text-sm">Les publications que vous aimez apparaîtront ici</p>
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="text-center text-gray-500 py-8">
          <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Aucun post sauvegardé pour le moment</p>
          <p className="text-sm">Les publications que vous sauvegardez apparaîtront ici</p>
        </div>
      )}

      {activeTab === 'reposts' && (
        reposts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {reposts.map((post) => (
              <div key={post.id} className="relative group aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={`Repost ${post.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                    <div className="text-sm">
                      Republié depuis @{post.originalAuthor}
                      <br />
                      <span className="text-gray-300">{post.originalDate}</span>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 mr-1" /> {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 mr-1" /> {post.comments}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 014-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 01-4 4H3" />
            </svg>
            <p className="text-lg font-medium">Aucune publication republiée</p>
            <p className="text-sm">Les publications que vous republiez apparaîtront ici</p>
          </div>
        )
      )}

      {isEditing && <EditFormPopup />}

      {showSettings && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSettings(false)}
        />
      )}

      {user.showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-lg">
            <p className="text-green-800">
              Profil mis à jour avec succès !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;