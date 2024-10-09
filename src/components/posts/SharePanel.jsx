import React, { useState } from 'react';
import { X, Search} from 'lucide-react';

const SharePanel = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Liste factice de contacts
  const contacts = [
    { id: 1, name: 'John Doe', image: 'ousseynouODC.jpeg' },
    { id: 2, name: 'Jane Smith', image: 'images.jpeg' },
    // Ajoutez plus de contacts ici
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleContact = (contactId) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleShare = () => {
    // Logique pour partager avec les contacts sélectionnés
    console.log('Partager avec:', selectedContacts);
    onClose();
  };

  return (
    <div className="w-1/3 h-full bg-white flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Partager</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4 border-b">
        <div className="flex items-center bg-gray-100 rounded-full p-2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent flex-grow outline-none"
            placeholder="Rechercher des contacts..."
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredContacts.map(contact => (
          <div
            key={contact.id}
            className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer ${
              selectedContacts.includes(contact.id) ? 'bg-blue-100' : ''
            }`}
            onClick={() => toggleContact(contact.id)}
          >
            <img src={contact.image} alt={contact.name} className="w-10 h-10 rounded-full mr-3" />
            <span>{contact.name}</span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <button
          onClick={handleShare}
          className={`w-full p-2 rounded-full ${
            selectedContacts.length > 0 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
          }`}
          disabled={selectedContacts.length === 0}
        >
          Envoyer à {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
};

export default SharePanel;