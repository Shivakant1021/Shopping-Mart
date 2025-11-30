import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, incrementQuantity, decrementQuantity } = useContext(CartContext);

    
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <div className="cart-items-container">
                <h2>Your Cart</h2>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Description: {item.description}</p>
                                <div className="cart-quantity-controls">
                                    <button className="cart-decrement" onClick={() => decrementQuantity(item.id)}>-</button>
                                    <p>{item.quantity}</p>
                                    <button className="cart-increment" onClick={() => incrementQuantity(item.id)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            {/* Checkout Summary Section */}
            <div className="cart-checkout-menu">
                <h3>Checkout Summary</h3>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="checkout-item">
                            <img src={item.thumbnail} alt={item.title} className="checkout-item-image" />
                            <div className="checkout-item-details">
                                <p>{item.title}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items in the checkout summary.</p>
                )}
                {cartItems.length > 0 && (
                    <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
                )}
                <button className="checkout-button" disabled={cartItems.length === 0}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
