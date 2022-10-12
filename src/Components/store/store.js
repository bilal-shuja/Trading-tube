import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// import {userLogin} from '../services/Login';
import {getBlogs} from '../services/GetBlogs';

export const store = configureStore({
    reducer:{
        // [userLogin.reducerPath]:userLogin.reducer,
        [getBlogs.reducerPath]:getBlogs.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat
    ([
            // userLogin.middleware,
            getBlogs.middleware
        ])
})

setupListeners(store.dispatch)