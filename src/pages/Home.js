import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { loadTapsAsync, selectTaps } from '../redux/tapSlice';
import { loadBottlesAsync, selectBottles } from '../redux/bottleSlice';
import { loadSettingsAsync, selectSettings } from '../redux/settingsSlice';
import { grey } from '@material-ui/core/colors';
import TapsGrid from '../components/beer/taps/TapsGrid';
import BottlesGrid from '../components/beer/bottles/BottlesGrid';
import Grow from '@material-ui/core/Grow';
import TabPanel from '../components/TabPanel';
import SettingsIcon from '@material-ui/icons/Settings';
import { selectIsAuthenticated } from '../redux/authSlice';
import publicIp from 'public-ip';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		//flexGrow: 1,
		backgroundColor: '#202020',
		padding: '0',
	},
	paper: {
		height: 140,
		width: 100,
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeIn,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: '#202020',
		boxShadow: 'none',
		height: '90px',
	},
	toolBar: {
		flexGrow: 0.5,
	},
	tabIndicator: {
		backgroundColor: grey[100],
	},
	logOut: {
		flexGrow: 1,
		textAlign: 'right',
	},
	notFound: {
		textAlign: 'center',
		color: 'white',
	},
}));

export const Home = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const taps = useSelector(selectTaps);
	const bottles = useSelector(selectBottles);
	const settings = useSelector(selectSettings);

	useEffect(() => {
		if (!taps) {
			dispatch(loadTapsAsync());
		}
		// eslint-disable-next-line
	}, [taps]);

	useEffect(() => {
		if (!bottles) {
			dispatch(loadBottlesAsync());
		}
		// eslint-disable-next-line
	}, [bottles]);

	useEffect(() => {
		if (!settings) {
			dispatch(loadSettingsAsync());
		}
		// eslint-disable-next-line
	}, [settings]);

	let initialValue = taps && taps.length > 0 ? 0 : 1;

	if (initialValue === 1) {
		initialValue = bottles && bottles.length > 0 ? 1 : 0;
	}

	const [value, setValue] = React.useState(initialValue);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [ip, setIp] = useState(null);

	useEffect(() => {
		async function getIpAddress() {
			const token = await publicIp.v4({
				fallbackUrls: ['https://ifconfig.co/ip'],
			});
			setIp(token);
		}
		getIpAddress();
	}, [ip]);

	const [activeTaps, setActiveTaps] = React.useState(null);

	useEffect(() => {
		if (taps) {
			setActiveTaps(taps.filter((tap) => tap.active !== false));
		}
	}, [taps]);

	const [activeBottles, setActiveBottles] = React.useState(null);

	useEffect(() => {
		if (bottles) {
			setActiveBottles(bottles.filter((bottle) => bottle.active !== false));
		}
	}, [bottles]);

	return (
		<div className={classes.root}>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h6' className={(classes.title, classes.toolBar)}>
						Lokko Brewing
					</Typography>
					<Tabs
						value={value}
						onChange={handleChange}
						classes={{
							indicator: classes.tabIndicator,
						}}
						centered
						aria-label='Taps and Bottles Tabs'
					>
						{activeTaps && activeTaps.length > 0 && (
							<Tab label='Tap List' {...a11yProps(0)} />
						)}
						{activeBottles && activeBottles.length > 0 && (
							<Tab label='Bottle List' {...a11yProps(1)} />
						)}
					</Tabs>
					{isAuthenticated && (
						<Typography
							variant='h6'
							className={(classes.title, classes.logOut)}
						>
							<Link to='/admin' className={(classes.title, classes.toolBar)}>
								<SettingsIcon />
							</Link>
						</Typography>
					)}
				</Toolbar>
			</AppBar>
			<Grow in={value === 0} timeout={500}>
				<TabPanel value={value} index={0}>
					{activeTaps && activeTaps.length > 0 && settings && (
						<TapsGrid taps={activeTaps} settings={settings} ip={ip} />
					)}
				</TabPanel>
			</Grow>
			<Grow in={value === 1} timeout={500}>
				<TabPanel value={value} index={1}>
					{activeBottles && activeBottles.length > 0 && settings && (
						<BottlesGrid bottles={activeBottles} settings={settings} ip={ip} />
					)}
				</TabPanel>
			</Grow>
			{activeTaps &&
				activeBottles &&
				activeTaps.length === 0 &&
				activeBottles.length === 0 && (
					<div className={classes.notFound}>
						<h1>No Beer Here Now!</h1>
						<h2>Check back later!</h2>
					</div>
				)}
		</div>
	);
};

Home.propTypes = {
	taps: PropTypes.array,
	bottles: PropTypes.array,
	settings: PropTypes.object,
};

export default Home;
