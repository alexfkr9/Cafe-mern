import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: "{ name: '', order: [{}] }",
    },
    reducers: {
        // setCurrentOrder(state, action) {       
        //     state.todos = action.payload
        // }
        setCurrentOrder: (state, action) => {
            console.log("action:", action)
            console.log("state:", state)
            state.order = action.payload
        }
    },
});

export const { setCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;