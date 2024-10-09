import React, { useState } from 'react';

// Composant principal de gestion des contacts
export default function ContactManager() {
    // État pour stocker la liste des contacts
    const [contacts, setContacts] = useState([]);
    // État pour gérer le contact actuellement modifié
    const [currentContact, setCurrentContact] = useState({ id: null, NomComplet: '', phone: '' });

    // Fonction pour gérer les modifications des champs de formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentContact({ ...currentContact, [name]: value });
    };

    // Fonction pour ajouter ou modifier un contact
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentContact.id === null) {
            // Ajouter un nouveau contact
            setContacts([...contacts, { ...currentContact, id: Date.now() }]);
        } else {
            // Modifier le contact existant
            setContacts(contacts.map(contact => (contact.id === currentContact.id ? currentContact : contact)));
        }
        // Réinitialiser le formulaire
        setCurrentContact({ id: null, NomComplet: '', phone: '' });
    };

    // Fonction pour supprimer un contact
    const handleDelete = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    // Fonction pour charger les données d'un contact dans le formulaire pour modification
    const handleEdit = (contact) => {
        setCurrentContact(contact);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-white">
            <div className="flex flex-col justify-center border-4 rounded-2xl p-4 items-center h-1/4 w-2/6">
                <h1 className="text-lg font-bold mb-4 bg-white border-2 p-1 rounded-xl">Gestion des Contacts</h1>
                <form onSubmit={handleSubmit} className="flex flex-col mb-4">
                    <input
                        type="text"
                        name="NomComplet"
                        placeholder="Nom Complet"
                        value={currentContact.NomComplet}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border rounded"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Téléphone"
                        value={currentContact.phone}
                        onChange={handleInputChange}
                        className="mb-4 p-2 border rounded"
                        required
                    />
                    <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                        {currentContact.id === null ? 'Ajouter' : 'Modifier'}
                    </button>
                </form>
            </div>
            <div className="flex flex-col justify-between border-4 rounded-2xl p-4 items-center h-auto w-2/6">
                <table className="w-full">
                    {contacts.map(contact => (
                        <tr key={contact.id} className="flex justify-between items-center mb-2 p-2 border rounded">
                            <td>
                                {contact.NomComplet}
                            </td>
                            <td>
                                {contact.phone}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(contact)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mx-1">Modifier</button>
                                <button onClick={() => handleDelete(contact.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}
