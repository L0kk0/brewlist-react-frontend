import React from 'react';
import { useDispatch } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { updateSettingsAsync } from '../../../redux/settingsSlice';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#101010',
		color: 'white',
		margin: 30,
		padding: 30,
		textAlign: 'center',
		alignItems: 'center',
		'& > *': {
			margin: theme.spacing(2),
		},
	},
}));

export const AdminSettings = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [settings, setSettings] = React.useState({
		displayRemaining: props.settings.displayRemaining,
		allowTracking: props.settings.allowTracking,
		pourPermissions: props.settings.pourPermissions,
		permittedAddress: props.settings.permittedAddress,
		pourSize: props.settings.pourSize,
		dynamicPour: props.settings.dynamicPour,
		theme: props.settings.theme === 'dark' ? true : false,
		kegSize: props.settings.kegSize,
	});

	const handleChange = (event) => {
		setSettings({ ...settings, [event.target.name]: event.target.value });
	};

	const handleCheckChange = (event) => {
		setSettings({ ...settings, [event.target.name]: event.target.checked });
	};

	const updateSettings = () => {
		dispatch(
			updateSettingsAsync({
				_id: props.settings._id,
				displayRemaining: settings.displayRemaining,
				allowTracking: settings.allowTracking,
				pourPermissions: settings.pourPermissions,
				permittedAddress: settings.permittedAddress,
				pourSize: settings.pourSize,
				dynamicPour: settings.dynamicPour,
				theme: settings.theme ? 'dark' : 'light',
				kegSize: settings.kegSize,
			})
		);
	};

	return (
		<div className={classes.root}>
			<h1>Settings:</h1>
			<div>
				Display Remaining:
				<Switch
					checked={settings.displayRemaining}
					onChange={handleCheckChange}
					name='displayRemaining'
					color='primary'
				/>
			</div>
			<div>
				Allow Tracking:
				<Switch
					checked={settings.allowTracking}
					onChange={handleCheckChange}
					name='allowTracking'
					color='primary'
				/>
			</div>
			<div>
				Pour Permissions:
				<Switch
					checked={settings.pourPermissions}
					onChange={handleCheckChange}
					name='pourPermissions'
					color='primary'
				/>
			</div>
			<div>
				<TextField
					type='text'
					label='Permitted Address:'
					name={'permittedAddress'}
					value={settings.permittedAddress}
					onChange={handleChange}
					variant='outlined'
					color='primary'
				/>
			</div>
			<div>
				<TextField
					type='number'
					label='Pour Size:'
					name={'pourSize'}
					value={settings.pourSize}
					onChange={handleChange}
					variant='outlined'
					color='primary'
				/>
			</div>
			<div>
				Dynamic Pour:
				<Switch
					checked={settings.dynamicPour}
					onChange={handleCheckChange}
					name='dynamicPour'
					color='primary'
				/>
			</div>
			<div>
				Theme - Light:
				<Switch
					checked={settings.theme}
					onChange={handleCheckChange}
					name='theme'
					color='primary'
				/>
				Theme - Dark:
			</div>
			<div>
				<TextField
					type='text'
					label='Keg Size:'
					name={'kegSize'}
					value={settings.kegSize}
					onChange={handleChange}
					variant='outlined'
					color='primary'
				/>
			</div>
			<Button
				style={{ margin: 5 }}
				variant='contained'
				color='primary'
				onClick={updateSettings}
			>
				Save
			</Button>
		</div>
	);
};

export default AdminSettings;
