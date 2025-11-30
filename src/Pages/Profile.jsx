import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import './Modal.css';

const ProfileModal = ({ show, onClose, openLoginModal }) => {
    const { loggedInUser,  } = useContext(CartContext); 

    if (!show || !loggedInUser) {
        return null; 
    }

    const handleLogout = () => {
        openLoginModal()
        onClose(); 
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>User Profile</h2>
                <div>
                    <p><strong>Name:</strong> {loggedInUser.name}</p>
                    <p><strong>Email:</strong> {loggedInUser.email}</p>
                    <p><strong>City:</strong> {loggedInUser.city}</p>
                </div>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={onClose}>Close</button>
               
            </div>
        </div>
    );
};

export default ProfileModal;
