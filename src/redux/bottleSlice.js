import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { alertAsync } from './alertSlice';

export const bottleSlice = createSlice({
	name: 'bottles',
	initialState: {
		bottles: null,
	},
	reducers: {
		loadBottles: (state, action) => {
			state.bottles = action.payload;
		},
		pourBottle: (state, action) => {
			const index = state.bottles.findIndex(
				(bottle) => bottle._id === action.payload._id
			);

			state.bottles[index] = action.payload;
		},
		createBottle: (state, action) => {
			state.bottles.push(action.payload);
			state.bottles = state.bottles.sort((a, b) => (a.name > b.name ? 1 : -1));
		},
		updateBottle: (state, action) => {
			const index = state.bottles.findIndex(
				(bottle) => bottle._id === action.payload._id
			);

			state.bottles[index] = action.payload;

			state.bottles = state.bottles.sort((a, b) =>
				a.bottlesLeft > b.bottlesLeft ? 1 : -1
			);
		},
		deleteBottle: (state, action) => {
			console.log(action.payload);
			state.bottles = state.bottles.filter(
				(bottle) => bottle._id !== action.payload
			);
		},
	},
});

export const {
	loadBottles,
	pourBottle,
	createBottle,
	updateBottle,
	deleteBottle,
} = bottleSlice.actions;

// Select Bottles from State
export const selectBottles = (state) => state.bottles.bottles;

// Load Bottles Async
export const loadBottlesAsync = () => async (dispatch) => {
	await api
		.get('/bottles')
		.then((res) => {
			dispatch(loadBottles(res.data));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Pour Bottle Async
export const pourBottleAsync = (id) => async (dispatch) => {
	await api
		.put(`/bottles/${id}`)
		.then((res) => {
			dispatch(pourBottle(res.data));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Create Bottle Beer Async
export const createBottleAsync = (bottle) => async (dispatch) => {
	await api
		.post('/bottles', bottle)
		.then((res) => {
			dispatch(createBottle(res.data));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Update Bottle Beer Async
export const updateBottleAsync = (bottle) => async (dispatch) => {
	await api
		.put(`/bottles/`, bottle)
		.then((res) => {
			dispatch(updateBottle(res.data));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Delete Bottle Beer Async
export const deleteBottleAsync = (id) => async (dispatch) => {
	await api
		.delete(`/bottles/${id}`)
		.then((res) => {
			dispatch(deleteBottle(id));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

export default bottleSlice.reducer;
