import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'redux/api/authApi';
import authSlice from '../features/auth/authSlice';

export const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
   devTools: true,
});
