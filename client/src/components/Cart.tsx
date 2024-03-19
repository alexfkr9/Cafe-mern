// Cart.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity, clearCart } from '../redux/cartSlice';
import { Button } from '@mui/material';

function Cart({ id }: any) {
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(0);
    // const orderObj = { [id]: quantity };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);

        dispatch(incrementQuantity({ id, qty: quantity + 1 }));
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(decrementQuantity(id));
        }
    };

    // -----------------------------

    const cartItems = useSelector((state: any) => state.cart.items);
    console.log("Cart ~ cartItems:", cartItems);


    const handleRemove = (id: any) => {
        dispatch(removeItem(id));
    };

    const handleIncrement = (id: any) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id: any) => {
        dispatch(decrementQuantity(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };


    return (
        <div>
            <Button variant="outlined" onClick={decreaseQuantity}>-</Button>
            <span>{quantity}</span>
            <Button variant="outlined" onClick={increaseQuantity}>+</Button>

            <h2>Shopping Cart</h2>
            {/* <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - Quantity: {item.quantity}
                        <button onClick={() => handleIncrement(item.id)}>+</button>
                        <button onClick={() => handleDecrement(item.id)}>-</button>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </li>
                ))}
            </ul> */}
            <button onClick={handleClearCart}>Clear Cart</button>
        </div>
    );
}

export default Cart;
