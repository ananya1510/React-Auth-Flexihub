import { createSlice } from '@reduxjs/toolkit';

// Try to get token from localStorage, fallback to sessionStorage
const getInitialToken = () => {
return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const authSlice = createSlice({
name: 'auth',
initialState: { token: getInitialToken() },
reducers: {
loginSuccess: (state, action) => {
state.token = action.payload;
// Note: actual storage (local/session) is handled in Login.jsx
},
logout: (state) => {
state.token = null;
localStorage.removeItem('token');
sessionStorage.removeItem('token');
},
},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;