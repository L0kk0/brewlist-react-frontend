import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/authSlice';
import setAuthToken from '../utils/setAuthToken';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
			}
		/>
	);
};

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;
