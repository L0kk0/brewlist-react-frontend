import api from './api';
import { loadUserAsync } from '../redux/authSlice';

const setAuthToken = (token) => {
	if (token) {
		api.defaults.headers.common['x-auth-token'] = token;
		localStorage.setItem('token', token);
		loadUserAsync();
	} else {
		delete api.defaults.headers.common['x-auth-token'];
		localStorage.removeItem('token');
	}
};

export default setAuthToken;
