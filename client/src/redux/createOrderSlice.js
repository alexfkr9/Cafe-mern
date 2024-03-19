import { createSlice } from '@reduxjs/toolkit';

const createOrderSlice = createSlice({
    name: 'createOrder',
    initialState: {
        createOrder: "",
    },
    reducers: {
        // setCurrentOrder(state, action) {       
        //     state.todos = action.payload
        // }
        setCreateOrder: (state, action) => {
            // state.order = action.payload
            state.createOrder = action.payload;
        }
    },
});

export const { setCreateOrder } = createOrderSlice.actions;

export default createOrderSlice.reducer;