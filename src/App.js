import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Shops from './Pages/Shops';
import Cart from './Pages/Cart';
import ProductDetail from './Pages/ProductDetail';
import { CartProvider } from './CartContext';

function App() {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Shops />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
