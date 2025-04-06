import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../CartContext';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from './LoginModal';
import PaymentModal from './PaymentModal';
import './Shop.css';

const Shops = () => {
    const { addToCart, setProducts, products, isModalOpen, setIsModalOpen, isLoggedIn, showLoginModal, setShowLoginModal } = useContext(CartContext);
    const [isToastShown, setIsToastShown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); 
    const searchQuery = location.state?.searchQuery || '';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [setProducts]);

    useEffect(() => {
        // Reset toast shown state on new search
        setIsToastShown(false);
    }, [searchQuery]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // this show my No Products error message
    useEffect(() => {
        if (filteredProducts.length === 0 && !isToastShown) {
            toast.error('No products Found!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setIsToastShown(true);
        }
    }, [filteredProducts, isToastShown]);

    const handleImageClick = (id) => {
        if (isLoggedIn) {
            navigate(`/product/${id}`);
        } else {
            toast.warn('😎 Please log in first to see the Product detail.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setShowLoginModal(true);
        }
    };
    //  for cart tostify

    const handleAddToCartClick = (product) => {
        if (isLoggedIn) {
            addToCart(product);
        } else {
            toast.warn('Please log in first to add items in cart.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setShowLoginModal(true);
        }
    };

    return (
        <div className='main-container'>
            <h2>Shop</h2>
            <ToastContainer />
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <img 
                                src={product.thumbnail} 
                                alt={product.title} 
                                onClick={() => handleImageClick(product.id)} 
                                className="product-image"
                            />
                            <h3>{product.title}</h3>
                            <p>Price: ${product.price}</p>
                            <div className='Button-prod'>
                                <button className="add-to-cart-btn cart" onClick={() => handleAddToCartClick(product)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products match your search.</p>
                )}
            </div>
            <PaymentModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </div>
    );
};

export default Shops;
