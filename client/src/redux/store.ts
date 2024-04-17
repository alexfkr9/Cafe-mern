import { configureStore } from '@reduxjs/toolkit';

import orderReducer from './orderSlice';
import cartReducer from './cartSlice';
import menuReducer from './menuSlice';

export const store = configureStore({
    reducer: {
        order: orderReducer,
        cart: cartReducer,
        menu: menuReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;