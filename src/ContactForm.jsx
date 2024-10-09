import React from 'react';

// Composant pour le formulaire de contact
const ContactForm = ({ currentContact, handleInputChange, handleSubmit }) => {
    return (
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
    );
};

export default ContactForm;
