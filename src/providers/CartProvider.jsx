import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add to cart function
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Remove from cart function
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== id));
    };

    const cartInfo = {
        cart,
        addToCart,
        removeFromCart,
    };

    return (
        <CartContext.Provider value={cartInfo}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;