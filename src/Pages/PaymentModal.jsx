import React from 'react';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Payment Details</h2>
                <form>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="Enter card number" required />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="DATE" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="CVV" required />
                    </div>
                    <div className="form-group">
                        <label>Cardholder Name</label>
                        <input type="text" placeholder="Enter name on card" required />
                    </div>

                    <h3>Alternative Payment Methods</h3>
                    <div className="payment-options">
                        <button type="button" className="payment-option">
                            Pay via QR Code
                        </button>
                        <button type="button" className="payment-option">
                            Pay via Paytm
                        </button>
                        <button type="button" className="payment-option">
                            Pay via Google Pay
                        </button>
                    </div>
                    <button type="submit" className="submit-payment">
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
