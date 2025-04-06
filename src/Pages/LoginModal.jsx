import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { toast ,Bounce} from 'react-toastify'

import './Modal.css';


const LoginModal = ({ show, onClose,  }) => {
    const { loginUser, setShowRegModal,setShowProfileModal } = useContext(CartContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = loginUser(email, password); 
        if (success) {
            toast.success('🦄 Logged In Successfull!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
            setShowProfileModal(true); // Should set showProfileModal to true
            onClose(); // Closes the login modal
        } else {
            alert('Invalid email or password');
        }
    };
    

    
    if (!show) {
        return null;
    }

    const handleRegisterClick = () => {
        onClose(); // Close the current modal
        setShowRegModal(true); // Open the registration modal
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <button onClick={onClose}>Close</button>
                <button onClick={handleRegisterClick}>
                    Don't have an account? Register
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
