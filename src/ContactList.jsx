import React from 'react';

// Composant pour afficher la liste des contacts
const ContactList = ({ contacts, handleEdit, handleDelete }) => {
    return (
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
    );
};

export default ContactList;
