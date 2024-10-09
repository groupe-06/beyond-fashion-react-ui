import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Mic, Send } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import UserInfoPanel from './UserProfil';

const ChatWindow = ({ selectedChat, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioFileName, setAudioFileName] = useState('');
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const audioRecorder = useRef(null);
    const intervalRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    const handleEmojiClick = (emoji) => {
        setNewMessage(prev => prev + emoji);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onSendMessage(`[Image: ${file.name}]`); // Remplacez ceci par votre logique d'envoi d'image
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleRecording = async () => {
        if (isRecording) {
            // Si l'enregistrement est en cours, envoyer le message
            const audioURL = URL.createObjectURL(audioBlob);
            const file = new File([audioBlob], audioFileName || 'audio_message.wav', { type: 'audio/wav' });
            onSendMessage({ type: 'audio', file: file, url: audioURL, duration: recordingTime });
            clearInterval(intervalRef.current);
            setRecordingTime(0);
            setAudioBlob(null);
        } else {
            // Démarrer l'enregistrement
            setIsRecording(true);
            setRecordingTime(0);
            setAudioFileName(`audio_${Date.now()}.wav`);
            audioRecorder.current = new (window.AudioContext || window.webkitAudioContext)();
            const mediaRecorder = new MediaRecorder(await navigator.mediaDevices.getUserMedia({ audio: true }));
            const audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                setAudioBlob(new Blob(audioChunks, { type: 'audio/wav' }));
            };

            mediaRecorder.start();

            intervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1); // Incrémenter le temps d'enregistrement
            }, 1000);
        }
        setIsRecording(!isRecording);
    };

    // Gérer l'affichage du panneau utilisateur
    const handleProfileClick = () => {
        setShowUserInfo(true);
    };

    return (
        <div className="flex-grow bg-white flex flex-col h-screen relative">
            <div className="p-2 bg-gradient-to-b from-black to-purple-900 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src={selectedChat.avatar}
                        alt={selectedChat.name}
                        className="w-10 h-10 rounded-full mr-3 cursor-pointer"
                        onClick={handleProfileClick}
                    />
                    <div>
                        <h3 className="font-medium text-white">{selectedChat.name}</h3>
                        <p className="text-xs text-gray-300">{selectedChat.status}</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button><Search className="text-white" size={20} /></button>
                    <button><MoreVertical className="text-white" size={20} /></button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-2" style={{backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"}}>
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2 rounded-lg max-w-[65%] ${
                            message.sender === 'me' ? 'bg-gradient-to-b from-black to-purple-900' : 'bg-gray-200'
                        }`}>
                            {message.type === 'audio' ? (
                                <audio controls>
                                    <source src={message.url} type="audio/wav" />
                                    Your browser does not support the audio element.
                                </audio>
                            ) : (
                                <p className={`text-sm ${message.sender === 'me' ? 'text-white' : 'text-black'}`}>{message.text}</p>
                            )}
                            <div className="flex justify-end items-center space-x-1 mt-1">
                                <span className="text-[10px] text-gray-400">{message.time}</span>
                                {message.sender === 'me' && (
                                    <span className="text-gray-400">✓✓</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-2 bg-white flex items-center space-x-2 relative">
                <button onClick={() => setShowEmojis(!showEmojis)}><Smile className="text-gray-500" size={24} /></button>
                {showEmojis && <EmojiPicker onEmojiClick={handleEmojiClick} />}
                <button onClick={() => fileInputRef.current.click()}><Paperclip className="text-gray-500" size={24} /></button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <input
                    type="text"
                    placeholder="Entrez un message"
                    className="flex-grow bg-gray-100 text-black p-2 rounded-lg focus:outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={toggleRecording} className={`relative ${isRecording ? 'animate-pulse' : ''}`}>
                    {newMessage.trim() ? (
                        <Send className="text-gray-500" size={24} />
                    ) : (
                        <Mic className={`${isRecording ? 'text-red-500' : 'text-gray-500'}`} size={24} />
                    )}
                    {isRecording && (
                        <span className="absolute -top-1 -right-1 text-xs text-red-500">{recordingTime}s</span>
                    )}
                </button>
            </div>

            <UserInfoPanel user={selectedChat} closePanel={() => setShowUserInfo(false)} isOpen={showUserInfo} />
        </div>
    );
};

export default ChatWindow;