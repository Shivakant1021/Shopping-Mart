import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../CartContext';
import PaymentModal from './PaymentModal';
import './ProductDetail.css';

const ProductDetail = () => {
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuyNowClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail">
            <div className='detail-main'> 
                    <div className='detail-container'>
                            <img src={product.thumbnail} alt={product.title} className="product-image" />
                            <div className="button-group">
                                <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                                <button className="buy-now" onClick={handleBuyNowClick}>Buy Now</button>
                            </div>
                    </div>
                        <div className='detail-next'>
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <p><strong>Price:</strong> ${product.price}</p>
                                <p><strong>Discount:</strong> {product.discountPercentage}%</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>Brand:</strong> {product.brand}</p>
                        </div>
            </div>

           
            <div className='detail-footer'>
                <h3>Reviews</h3>
                <div className="reviews">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p><strong>{review.reviewerName}</strong> ({new Date(review.date).toLocaleDateString()})</p>
                                <p>Rating: {review.rating} / 5</p>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet</p>
                    )}
                </div>
            </div>

            <PaymentModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default ProductDetail;
