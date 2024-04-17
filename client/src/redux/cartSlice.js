// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            console.log("addItem ~ newItem:", newItem);
            state.cart.push(newItem);
        },
        removeItem(state, action) {
            const idToRemove = action.payload;
            state.cart = state.cart.filter(item => item.id !== idToRemove);
        },


        incrementQuantity(state, action) {

            console.log("incrementQuantity ~ action:", action.payload)

            const itemObj = action.payload;

            const itemToIncrement = state.cart.find(item => item.id === itemObj.id);
            console.log("incrementQuantity ~ itemToIncrement:", itemToIncrement)

            if (itemToIncrement) {
                itemToIncrement.qty++;
            } else {
                state.cart.push(itemObj);
            }
        },


        decrementQuantity(state, action) {
            const idToDecrement = action.payload;
            const itemToDecrement = state.cart.find(item => item.id === idToDecrement);
            if (itemToDecrement && itemToDecrement.quantity > 1) {
                itemToDecrement.quantity--;
            }
        },
        clearCart(state) {
            state.cart = [];
        },
    },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
