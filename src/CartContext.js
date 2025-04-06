import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRegModal, setShowRegModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false); 
    const [showProfileModal, setShowProfileModal] = useState(false);


    

    // const addToCart = (product) => {
    //     setCartItems([...cartItems, product]);
    // };

    const addToCart = (product) => {
    
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
           
            setCartItems(cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
          
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };
    
    const incrementQuantity = (id) => {
        setCartItems(cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };
    
    const decrementQuantity = (id) => {
        setCartItems(cartItems.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0)); 
    };
    
     

    const registerUser = (userData) => {
        setRegisteredUsers([...registeredUsers, userData]); 
    };

    const loginUser = (email, password) => {
        const user = registeredUsers.find(
            (u) => u.email === email && u.password === password
        );
        if (user) {
            setLoggedInUser(user);
            setIsLoggedIn(true); 
            return true;
        } else {
            return false;
        }
    };

    const logoutUser = () => {
        setLoggedInUser(null);
        setIsLoggedIn(false); // Reset logged in state
        
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                products,
                setProducts,
                searchQuery,
                setSearchQuery,
                registeredUsers,
                loggedInUser,
                isLoggedIn, 
                registerUser,
                loginUser,
                logoutUser, 
                isModalOpen, setIsModalOpen,showRegModal, setShowRegModal,showLoginModal, setShowLoginModal,showProfileModal, setShowProfileModal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
