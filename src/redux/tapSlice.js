import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { alertAsync } from './alertSlice';

export const tapSlice = createSlice({
	name: 'taps',
	initialState: { taps: null },
	reducers: {
		loadTaps: (state, action) => {
			state.taps = action.payload;
		},
		pourTap: (state, action) => {
			const index = state.taps.findIndex(
				(tap) => tap._id === action.payload._id
			);

			state.taps[index] = action.payload;
		},
		createTap: (state, action) => {
			state.taps.push(action.payload);
			state.taps = state.taps.sort((a, b) =>
				a.tapNumber > b.tapNumber ? 1 : -1
			);
		},
		updateTap: (state, action) => {
			const index = state.taps.findIndex(
				(tap) => tap._id === action.payload._id
			);

			state.taps[index] = action.payload;

			state.taps = state.taps.sort((a, b) =>
				a.tapNumber > b.tapNumber ? 1 : -1
			);
		},
		deleteTap: (state, action) => {
			state.taps = state.taps.filter((taps) => taps._id !== action.payload);
		},
	},
});

export const { loadTaps, pourTap, createTap, updateTap, deleteTap } =
	tapSlice.actions;

// Select Taps from State
export const selectTaps = (state) => state.taps.taps;

// Get Tap Beers Async
export const loadTapsAsync = () => async (dispatch) => {
	await api
		.get('/taps')
		.then((res) => {
			dispatch(loadTaps(res.data));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Pour Tap Async
export const pourTapAsync = (id, amt) => async (dispatch) => {
	await api
		.put(`/taps/${id}/${amt}`)
		.then(function (res) {
			dispatch(pourTap(res.data));
		})
		.catch(function (error) {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Create Tap Beer Async
export const createTapAsync = (tap) => async (dispatch) => {
	await api
		.post(`/taps/`, tap)
		.then(function (res) {
			dispatch(alertAsync(`Tap: ${tap.name} created successfully!`));
			dispatch(createTap(res.data));
		})
		.catch(function (error) {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Update Tap Beer Async
export const updateTapAsync = (tap) => async (dispatch) => {
	await api
		.put(`/taps`, tap)
		.then((res) => {
			dispatch(updateTap(res.data));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Delete Tap Beer Async
export const deleteTapAsync = (id) => async (dispatch) => {
	await api
		.delete(`/taps/${id}`)
		.then((res) => {
			dispatch(deleteTap(id));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

export default tapSlice.reducer;
