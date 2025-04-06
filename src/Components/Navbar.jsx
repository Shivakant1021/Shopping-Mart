import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { CartContext } from '../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import RegistrationModal from '../Pages/RegistrationModal';
import LoginModal from '../Pages/LoginModal'; 
import Profile from '../Pages/Profile';
import '../Components/Navbar.css'; 

const Navbar = () => {
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery, cartItems, isLoggedIn, logoutUser,showRegModal, setShowRegModal,showLoginModal, setShowLoginModal,showProfileModal, setShowProfileModal } = useContext(CartContext);
    

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        navigate('/', { state: { searchQuery: query } });
    };

    const handleLogout = () => {
        logoutUser();
  
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/" ><img src="../3571143.jpg" alt="Logo" /></Link>
                </div>
                <div>
                {new Date().toUTCString().slice(0, 16)}
                </div>
                
                <ul className="navbar-links">
                    <li><Link to="/">Shop</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
                
                <input 
                    type="text" 
                    className="navbar-search" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

                <div className="navbar-cart">
                    <span>Cart: {cartItems.length} items</span>
                </div>

                <div className="navbar-register">
                    {isLoggedIn ? (
                        <>
                            <span style={{ cursor: 'pointer' }} onClick={() => setShowProfileModal(true)}>Profile</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <FontAwesomeIcon 
                            icon={faUser} 
                            size="lg" 
                            onClick={() => setShowLoginModal(true)} 
                            style={{ cursor: 'pointer' }} 
                        />
                    )}
                </div>
            </nav>

            {/* Registration Modal */}
            <RegistrationModal 
                show={showRegModal} 
                onClose={() => setShowRegModal(false)} 
                openLoginModal={() => setShowLoginModal(true)} 
            />

            {/* Login Modal */}
            <LoginModal 
                show={showLoginModal} 
                onClose={() => setShowLoginModal(false)} 
                openProfileModal={() => setShowProfileModal(true)} 
            /> 

            {/* Profile Modal */}
            <Profile 
                show={showProfileModal} 
                onClose={() => setShowProfileModal(false)} 
                openLoginModal={() => setShowLoginModal(true)} 
            /> 
        </>
    );
};

export default Navbar;
