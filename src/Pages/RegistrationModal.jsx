import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext'; 
import { toast ,Bounce} from 'react-toastify'
import { validationRegx } from './validationRegx'; //regex
import './Modal.css';

const RegistrationModal = ({ show, onClose, }) => {
    const { registerUser, setShowLoginModal } = useContext(CartContext); // Access register function from context
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', 
        city: ''
    });
    const [errors, setErrors] = useState({}); // State to store error messages

 
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData({ ...formData, [name]: value });


        validateField(name, value);
    };

   
    const validateField = (name, value) => {
        let error = '';
        if (name === 'name' && !validationRegx.username.test(value)) {
            error = "Name should be 3-30 characters and only include letters and spaces.";
        } else if (name === 'email' && !validationRegx.email.test(value)) {
            error = "Please enter a valid email address.";
        } else if (name === 'password' && !validationRegx.password.test(value)) {
            error = "Password must be at least 8 characters, with letters and numbers.";
        } else if (name === 'city' && value.trim() === '') {
            error = "City is required.";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).every((error) => error === '') && 
            Object.values(formData).every((value) => value)) {
            registerUser(formData); 
            toast.success('🦄 Registered Successfull!', {
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
            console.log(formData);
            onClose();
            setShowLoginModal(true)  
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                        {errors.city && <p className="error">{errors.city}</p>}
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div className="close-btn">
                    <button onClick={onClose}>Close</button>
                </div>
                
            </div>
        </div>
    );
};

export default RegistrationModal;
