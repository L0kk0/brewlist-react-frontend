import axios from 'axios';
//import store from '../redux/store';
//import { LOGOUT } from '../redux/types';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL || '/api',
	headers: {
		'Content-Type': 'application/json',
	},
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 logout the user if the token has expired
**/

/* api.interceptors.response.use(
	(res) => {
		console.log(res);
		return res;
	},
	(error) => {
		console.log('Tacos', error);
		if (error.response.data.msg === 'Token is not valid') {
			//store.dispatch({ type: LOGOUT });
		}

		//store.dispatch({ type: LOGOUT });
		console.log('Burritos', error);
		return Promise.reject(error);
	}
); */

export default api;
