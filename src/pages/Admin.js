import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grow from '@material-ui/core/Grow';
import TabPanel from '../components/TabPanel';
import { makeStyles } from '@material-ui/core/styles';
import { logoutAsync } from '../redux/authSlice';
import { loadTapsAsync, selectTaps } from '../redux/tapSlice';
import { loadBottlesAsync, selectBottles } from '../redux/bottleSlice';
import { loadSettingsAsync, selectSettings } from '../redux/settingsSlice';
import { grey } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AdminTaps from '../components/admin/taps/AdminTaps';
import AdminBottles from '../components/admin/bottles/AdminBottles';
import AdminSettings from '../components/admin/settings/AdminSettings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
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
		flexGrow: 1,
	},
	logOut: {
		flexGrow: 1,
		textAlign: 'right',
	},
	tabIndicator: {
		backgroundColor: grey[100],
	},
}));

export const Admin = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const dispatch = useDispatch();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
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

	const logOut = (e) => {
		dispatch(logoutAsync());
	};

	return (
		<div className={classes.root}>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h6' className={(classes.title, classes.toolBar)}>
						<Link to='/' className={(classes.title, classes.toolBar)}>
							Lokko Brewing
						</Link>
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
						<Tab label='Tap List' {...a11yProps(0)} />
						<Tab label='Bottle List' {...a11yProps(1)} />
						<Tab label='Settings' {...a11yProps(1)} />
					</Tabs>
					<Typography
						onClick={logOut}
						variant='h6'
						className={(classes.title, classes.logOut)}
					>
						<Link to='/' className={(classes.title, classes.toolBar)}>
							<ExitToAppIcon />
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
			<Grow in={value === 0} timeout={500}>
				<TabPanel value={value} index={0}>
					<AdminTaps taps={taps} settings={settings} />
				</TabPanel>
			</Grow>
			<Grow in={value === 1} timeout={500}>
				<TabPanel value={value} index={1}>
					<AdminBottles bottles={bottles} settings={settings} />
				</TabPanel>
			</Grow>
			<Grow in={value === 2} timeout={500}>
				<TabPanel value={value} index={2}>
					<AdminSettings settings={settings} />
				</TabPanel>
			</Grow>
		</div>
	);
};

Admin.propTypes = {
	taps: PropTypes.array,
	selectTaps: PropTypes.func,
	loadTapsAsync: PropTypes.func,
	bottles: PropTypes.array,
	selectBottles: PropTypes.func,
	loadBottlesAsync: PropTypes.func,
};
export default Admin;
