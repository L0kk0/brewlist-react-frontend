import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { alertAsync } from './alertSlice';

export const settingsSlice = createSlice({
	name: 'settings',
	initialState: { settings: null },
	reducers: {
		loadSettings: (state, action) => {
			state.settings = action.payload;
		},
		updateSettings: (state, action) => {
			state.settings = action.payload;
		},
	},
});

export const { loadSettings, updateSettings } = settingsSlice.actions;

// Select Settings from State
export const selectSettings = (state) => state.settings.settings;

// Get Settings Async
export const loadSettingsAsync = () => async (dispatch) => {
	await api
		.get('/settings')
		.then((res) => {
			dispatch(loadSettings(res.data));
		})
		.catch((error) => {
			console.log(error);
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Update Settings Async
export const updateSettingsAsync = (settings) => async (dispatch) => {
	console.log(settings);
	await api
		.put(`/settings`, settings)
		.then((res) => {
			dispatch(updateSettings(res.data));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

export default settingsSlice.reducer;
