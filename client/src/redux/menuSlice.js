import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: "",
    },
    reducers: {
        // setCurrentOrder(state, action) {       
        //     state.todos = action.payload
        // }
        addMenu: (state, action) => {
            state.menu = action.payload
        }
    },
});

export const { addMenu } = menuSlice.actions;

export default menuSlice.reducer;