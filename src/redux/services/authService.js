import { authApi } from 'redux/api/authApi';

export const authService = authApi.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (credentials) => ({
            url: '/auth',
            method: 'POST',
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useLoginMutation } = authService;
