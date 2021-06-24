import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
	name: 'alerts',
	initialState: {
		alerts: null,
	},
	reducers: {
		alert: (state, action) => {
			console.log(action.payload);
		},
	},
});

export const { alert } = alertSlice.actions;

// Add Alert Async
export const alertAsync = (msg) => async (dispatch) => {
	dispatch(alert(msg));
};

export default alertSlice.reducer;
