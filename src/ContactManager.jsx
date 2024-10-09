import React, { useReducer } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

// État initial pour les contacts et le formulaire
const initialState = {
    contacts: [],
    currentContact: { id: null, NomComplet: '', phone: '' }
};

// Réducteur pour gérer les actions
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CONTACT':
            return { ...state, currentContact: action.payload };
        case 'ADD_CONTACT':
            return { 
                ...state, 
                contacts: [...state.contacts, { ...action.payload, id: Date.now() }] 
            };
        case 'UPDATE_CONTACT':
            return { 
                ...state, 
                contacts: state.contacts.map(contact => 
                    contact.id === action.payload.id ? action.payload : contact 
                ),
                currentContact: { id: null, NomComplet: '', phone: '' } // Réinitialiser le formulaire
            };
        case 'DELETE_CONTACT':
            return { 
                ...state, 
                contacts: state.contacts.filter(contact => contact.id !== action.payload) 
            };
        default:
            return state;
    }
};

// Composant principal de gestion des contacts
export default function ContactManager() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Fonction pour gérer les modifications des champs de formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'SET_CURRENT_CONTACT', payload: { ...state.currentContact, [name]: value } });
    };

    // Fonction pour ajouter ou modifier un contact
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.currentContact.id === null) {
            // Ajouter un nouveau contact
            dispatch({ type: 'ADD_CONTACT', payload: state.currentContact });
        } else {
            // Modifier le contact existant
            dispatch({ type: 'UPDATE_CONTACT', payload: state.currentContact });
        }
    };

    // Fonction pour supprimer un contact
    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_CONTACT', payload: id });
    };

    // Fonction pour charger les données d'un contact dans le formulaire pour modification
    const handleEdit = (contact) => {
        dispatch({ type: 'SET_CURRENT_CONTACT', payload: contact });
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-white">
            <ContactForm 
                currentContact={state.currentContact} 
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit} 
            />
            <ContactList 
                contacts={state.contacts} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
            />
        </div>
    );
}
