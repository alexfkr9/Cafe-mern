// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            state.items.push(newItem);
        },
        removeItem(state, action) {
            const idToRemove = action.payload;
            state.items = state.items.filter(item => item.id !== idToRemove);
        },


        incrementQuantity(state, action) {

            console.log("incrementQuantity ~ action:", action.payload)

            const itemObj = action.payload;

            const itemToIncrement = state.items.find(item => item.id === itemObj.id);
            console.log("incrementQuantity ~ itemToIncrement:", itemToIncrement)

            if (itemToIncrement) {
                itemToIncrement.qty++;
            } else {
                state.items.push(itemObj);
            }
        },


        decrementQuantity(state, action) {
            const idToDecrement = action.payload;
            const itemToDecrement = state.items.find(item => item.id === idToDecrement);
            if (itemToDecrement && itemToDecrement.quantity > 1) {
                itemToDecrement.quantity--;
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
