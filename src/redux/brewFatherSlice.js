import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import { alertAsync } from './alertSlice';
import { createTapAsync } from './tapSlice';
import { createBottleAsync } from './bottleSlice';

export const brewFatherSlice = createSlice({
	name: 'brewfather',
	initialState: { batches: null },
	reducers: {
		loadBatches: (state, action) => {
			state.batches = action.payload;
		},
	},
});

export const { loadBatches } = brewFatherSlice.actions;

// Select Brewfather Batches from State
export const selectBatches = (state) => state.brewfather.batches;

// Get Brewfather Batches Async
export const loadBatchesAsync = () => async (dispatch) => {
	await api
		.get('/brewfather')
		.then((res) => {
			dispatch(loadBatches(res.data));
		})
		.catch((error) => {
			dispatch(alertAsync(error.response.data.msg));
		});
};

// Import Brewfather Batch as Tap -> Async
export const importBatchAsTapAsync = (id, settings) => async (dispatch) => {
	await api
		.get(`/brewfather/${id}`)
		.then((res) => {
			let notes = '';

			res.data.batchFermentables.forEach(
				(fermentable) => (notes += `${fermentable.name}, `)
			);
			notes += ' Malts.  ';

			res.data.batchHops.forEach((hop) => (notes += `${hop.name}, `));
			notes += ' Hops.  ';

			res.data.batchYeasts.forEach(
				(yeast) =>
					(notes += `${yeast.name} (${yeast.laboratory} ${yeast.productId}) `)
			);
			notes += ' Yeast.';

			const tap = {
				active: false,
				tapNumber: 0,
				name: res.data.recipe.name,
				style: res.data.recipe.style.name,
				notes: notes,
				og: res.data.measuredOg,
				fg: res.data.measuredFg,
				srm: res.data.estimatedColor.toFixed(1),
				ibu: res.data.estimatedIbu,
				amtLeft: settings.kegSize,
				kegSize: settings.kegSize,
			};
			dispatch(createTapAsync(tap));
		})
		.catch((error) => {
			dispatch(alertAsync(error));
		});
};

// Import Brewfather Batch as Bottle -> Async
export const importBatchAsBottleAsync = (id, settings) => async (dispatch) => {
	await api
		.get(`/brewfather/${id}`)
		.then((res) => {
			let notes = '';

			res.data.batchFermentables.forEach(
				(fermentable) => (notes += `${fermentable.name}, `)
			);
			notes += ' Malts.  ';

			res.data.batchHops.forEach((hop) => (notes += `${hop.name}, `));
			notes += ' Hops.  ';

			res.data.batchYeasts.forEach(
				(yeast) =>
					(notes += `${yeast.name} (${yeast.laboratory} ${yeast.productId}) `)
			);
			notes += ' Yeast.';

			const bottle = {
				active: false,
				name: res.data.recipe.name,
				style: res.data.recipe.style.name,
				notes: notes,
				og: res.data.measuredOg,
				fg: res.data.measuredFg,
				srm: res.data.estimatedColor.toFixed(1),
				ibu: res.data.estimatedIbu,
				bottlesLeft: 48,
			};

			dispatch(createBottleAsync(bottle));
		})
		.catch((error) => {
			dispatch(alertAsync(error));
		});
};

export default brewFatherSlice.reducer;
