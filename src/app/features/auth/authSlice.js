// src/app/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit'

// const initialState = { isAuthenticated: false, userInfo: null }

// Retrieve initial authentication state from localStorage
const initialState = {
  isAuthenticated: localStorage.getItem('userInfo') ? true : false,
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true
      state.userInfo = action.payload
      // console.log(state.userInfo)
      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.userInfo = null;

      // Remove from localStorage
      localStorage.removeItem('userInfo')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
