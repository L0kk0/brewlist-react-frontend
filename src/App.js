import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import PrivateRoute from './routes/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import {
	createMuiTheme,
	//makeStyles,
	ThemeProvider,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		/* 		primary: {
			// Purple and green play nicely together.
			main: '#202020',
		},
		secondary: {
			// This is green.A700 as hex.
			//main: '#11cb5f',
		}, */
	},
});

function App() {
	useEffect(() => {
		setAuthToken(localStorage.token);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<PrivateRoute exact path='/Admin' component={Admin} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
