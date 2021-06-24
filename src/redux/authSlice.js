import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import setToken from '../utils/setAuthToken';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		token: localStorage.getItem('token'),
		isAuthenticated: false,
	},
	reducers: {
		login: (state, action) => {
			state.token = action.payload.token;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			localStorage.removeItem('token');
		},
		loadUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { login, logout, loadUser } = authSlice.actions;

// Select isAuthenticated from State
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Login User Async
export const loginAsync = (email, password) => async (dispatch) => {
	const body = { email, password };

	await api
		.post('/auth', body)
		.then((res) => {
			dispatch(login(res.data));
			setToken(res.data.token);
			dispatch(loadUserAsync());
		})
		.catch((error) => {
			console.log(error);
		});
};

export const logoutAsync = (poops) => async (dispatch) => {
	dispatch(logout());
};

// Load User Async
export const loadUserAsync = () => async (dispatch) => {
	await api
		.get('/auth')
		.then((res) => {
			dispatch(loadUser(res.data));
		})
		.catch((error) => {
			console.log(error);
		});
};

export default authSlice.reducer;
