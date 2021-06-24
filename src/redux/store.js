import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import authReducer from './authSlice';
import tapReducer from './tapSlice';
import bottleReducer from './bottleSlice';
import brewFatherReducer from './brewFatherSlice';
import settingsReducer from './settingsSlice';

export default configureStore({
	reducer: {
		alerts: alertReducer,
		auth: authReducer,
		taps: tapReducer,
		bottles: bottleReducer,
		settings: settingsReducer,
		brewfather: brewFatherReducer,
	},
});
