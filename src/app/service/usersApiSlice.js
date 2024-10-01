// src/app/service/usersApiSlice.js

import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/users/login',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/api/v1/users/signup',
        method: 'POST',
        body: data,
      }),
    }),
    otpverification: builder.mutation({
      query: (data) => ({
        url: '/api/v1/users/verifyOtp',
        method: 'POST',
        body: data,
      }),
    }),

    resendotp: builder.mutation({ 
      query: (data) => ({
       
        url: '/api/v1/users/resendOtp',
        method: 'POST',
        body: data,
      }),
    }),

    forgot: builder.mutation({
      query: (data) => ({
        url: '/api/v1/users/forgot',
        method: 'POST',
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/api/v1/users/logout',
        method: 'GET', // The backend defines the logout as a GET request
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/api/v1/users/profile',
        method: 'PUT',
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/api/v1/users/updatePassword',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useOtpverificationMutation,
  useResendotpMutation,
  useForgotMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  // useGetVerificationQuery,
} = userApiSlice
