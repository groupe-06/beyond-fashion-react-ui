import React, { useState, useRef } from "react";
import UserInfoPanel from "./Dashbord/UserInfoPanel";
import StoryViewer from "./Dashbord/StoryViewer";
import ImageViewer from "./Dashbord/ImageViewer";
import {
  Plus,
  Bell,
  Settings,
  CreditCard
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Alert } from "./ui/alert";
const currentUser = {
  name: "John Doe",
  role: "Tailleur",
  image: "ousseynouODC.jpeg",
  credits: 150,
};
const users = [
  {
    name: "Jennifer",
    location: "Paris, France",
    image: "ousseynouODC.jpeg",
    followers: "17K",
    following: "387",
    portfolio: ["images.jpeg", "images.jpeg", "images.jpeg"],
  },
  {
    name: "Michael Stone",
    location: "London, UK",
    image: "ousseynouODC.jpeg",
    followers: "20K",
    following: "400",
    portfolio: ["images.jpeg", "images.jpeg", "images.jpeg"],
  },
  {
    name: "Ousseynou Diedhiou",
    location: "London, UK",
    image: "ousseynouODC.jpeg",
    followers: "20K",
    following: "400",
    portfolio: ["images.jpeg", "images.jpeg", "images.jpeg"],
  },
];
const stories = [
  {
    userName: "Jennifer",
    userImage: "ousseynouODC.jpeg",
    images: [
      "download6.jpg",
      "WhatsApp Image 2024-04-29 at 15.39.20.jpeg",
      "images.jpeg",
    ],
    messages: ["Beautiful day!", "Having fun!", "Perfect moment"],
  },
  {
    userName: "Michael Stone",
    userImage: "ousseynouODC.jpeg",
    images: [
      "images.jpeg",
      "WhatsApp Image 2024-04-29 at 15.40.54.jpeg",
      "WhatsApp Image 2024-04-29 at 15.38.36.jpeg",
    ],
    messages: ["At work!", "Coffee time", "Weekend vibes"],
  },
  {
    userName: "Lana Smith",
    userImage: "ousseynouODC.jpeg",
    images: [
      "WhatsApp Image 2024-06-30 at 00.26.33.jpeg",
      "WhatsApp Image 2024-04-29 at 15.38.36.jpeg",
      "images.jpeg",
    ],
    messages: ["Party time!", "With friends", "Best day ever"],
  },
];


const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeStory, setActiveStory] = useState(null);
  const [viewingImages, setViewingImages] = useState(null);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isNewStoryModalOpen, setIsNewStoryModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [storyMessage, setStoryMessage] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState(0);
  const [redeemCode, setRedeemCode] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles(fileURLs);
    setIsNewStoryModalOpen(true);
  };

  const openUserInfo = (user) => {
    setSelectedUser(user);
    setIsUserPanelOpen(true);
  };

  const closeUserInfo = () => {
    setIsUserPanelOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  };

  const addNewStory = () => {
    fileInputRef.current.click();
  };

  const handleStorySubmit = () => {
    console.log(
      "Publishing story with files:",
      selectedFiles,
      "and message:",
      storyMessage
    );
    setIsNewStoryModalOpen(false);
    setSelectedFiles([]);
    setStoryMessage("");
  };

  const handleCreditPurchase = () => {
    console.log("Achat de crédits:", creditAmount);
  };

  const handleCodeRedeem = () => {
    console.log("Code à racheter:", redeemCode);
  };

  const openStory = (story) => {
    setActiveStory(story);
  };

  const closeStory = () => {
    setActiveStory(null);
  };

  const openImageViewer = (images, startIndex) => {
    setViewingImages({ images, startIndex });
  };

  const closeImageViewer = () => {
    setViewingImages(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        accept="image/*,video/*"
        onChange={handleFileSelect}
      />
      <Dialog open={isNewStoryModalOpen} onOpenChange={setIsNewStoryModalOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={currentUser.image}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg">{currentUser.name}</h3>
                <p className="text-sm text-gray-500">{currentUser.role}</p>
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4 h-full">
            <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[50vh]">
              {selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={file}
                  alt={`Preview ${index}`}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              ))}
            </div>
            <textarea
              className="w-full p-4 border rounded-lg h-32"
              placeholder="Ajouter un message à votre story..."
              value={storyMessage}
              onChange={(e) => setStoryMessage(e.target.value)}
            />
            <button
              className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
              onClick={handleStorySubmit}
            >
              Publier
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <Alert>
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <p>Nouveau like sur votre photo</p>
              </div>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Paramètres</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-purple-50">
              <h3 className="font-semibold mb-2">
                Préférences de notification
              </h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="w-2/3 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-64">
            <input
              type="text"
              className="p-2 w-72 pl-10 rounded-full bg-gray-200 text-gray-700"
              placeholder="Search"
            />
            <i className="fas fa-search text-gray-500 absolute left-4 top-3"></i>
            <i className="fas fa-microphone absolute right-1 top-3 text-purple-600"></i>

          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-purple-600">
                {currentUser.credits}
              </span>
              <CreditCard className="text-purple-600" />
            </div>
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <button onClick={() => setIsSettingsOpen(true)}>
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={currentUser.image}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Section des meilleurs photographes */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top photographers</h2>
          <div className="flex flex-wrap gap-4">
            {users.map((user, index) => (
              <div key={index} className="w-72 p-4 bg-white rounded-xl relative shadow-md cursor-pointer" onClick={() => openUserInfo(user)}>
                <div className="grid grid-cols-2 gap-2">
                  <img src="download6.jpg" alt="Close-up of a DJ's hand on a mixer" className="w-32 h-28 object-cover rounded-3xl" />
                  <img src="images.jpeg" alt="Fashionable woman posing under neon lights" className="w-32 h-28 object-cover rounded-3xl" />
                </div>
                <div className="absolute top-16 left-24">
                  <img src={user.image} alt={user.name} className="w-20 h-20 rounded-full border-2 border-white" />
                </div>
                <div className="text-center mt-6">
                  <p className="text-xl font-semibold text-gray-800">{user.name}</p>
                </div>
                <div className="flex justify-center items-center mt-6 text-yellow-500">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span className="ml-2 text-sm text-gray-500">4.5/5 (90%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Section du fil d'actualité */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your feed</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <img src="WhatsApp Image 2024-04-29 at 15.38.36.jpeg" alt="Patricia Stivenson" className="w-16 h-16 rounded-full border-2 border-white" />
              <div>
                <p className="text-gray-700 font-bold">Patricia Stivenson</p>
                <p className="text-gray-500 text-sm">3 minutes ago</p>
                <div className="flex gap-4 mt-2">
                  {["images.jpeg", "images.jpeg", "images.jpeg", "images.jpeg"].map((img, index) => (
                    <img key={index} src={img} alt={img} className="rounded-lg cursor-pointer w-1/4" onClick={() => openImageViewer(["images.jpeg", "images.jpeg", "images.jpeg", "images.jpeg"], index)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-6">
          <div className="flex-1 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Acheter des crédits</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Montant</label>
                <input
                  type="number"
                  min="0"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(Number(e.target.value))}
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20"
                  placeholder="Entrez le montant"
                />
              </div>
              <button
                onClick={handleCreditPurchase}
                className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Acheter
              </button>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-black to-purple-900 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Utiliser un code</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Code de rachat</label>
                <input
                  type="text"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20"
                  placeholder="Entrez votre code"
                />
              </div>
              <button
                onClick={handleCodeRedeem}
                className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-gradient-to-b from-black to-purple-900 text-white p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Statut</h2>
        
        {/* Mon statut */}
        <div className="flex items-center mb-6 cursor-pointer" onClick={addNewStory}>
          <div className="relative">
            <img src="ousseynouODC.jpeg" alt="Your status" className="w-14 h-14 rounded-full" />
            <button className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-1">
              <Plus size={16} />
            </button>
          </div>
          <div className="ml-4">
            <p className="font-semibold">Mon statut</p>
            <p className="text-gray-400 text-sm">Appuyez pour ajouter un statut</p>
          </div>
        </div>

        {/* Statuts récents */}
        <h3 className="text-lg font-semibold mb-2 text-teal-500">RÉCENTS</h3>
        {stories.map((story, index) => (
          <div key={index} className="flex items-center mb-4 cursor-pointer" onClick={() => openStory(story)}>
            <img src={story.userImage} alt={story.userName} className="w-12 h-12 rounded-full border-2 border-teal-500" />
            <div className="ml-4">
              <p className="font-semibold">{story.userName}</p>
              <p className="text-gray-400 text-sm">Il y a 20 minutes</p>
            </div>
          </div>
        ))}
      </div>
      <UserInfoPanel user={selectedUser} closePanel={closeUserInfo} isOpen={isUserPanelOpen} />
      {activeStory && (
        <StoryViewer story={activeStory} closeStory={closeStory} />
      )}
      {viewingImages && (
        <ImageViewer
          images={viewingImages.images}
          startIndex={viewingImages.startIndex}
          closeViewer={closeImageViewer}
        />
      )}
    </div>
  );
};
export default Dashboard;
