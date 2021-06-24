import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { createTapAsync } from '../../../redux/tapSlice';
import Switch from '@material-ui/core/Switch';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		zIndex: 50,
		minWidth: '75%',
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: '#101010',
		color: 'white',
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		textAlign: 'center',
	},
	root: {
		backgroundColor: '#101010',
		color: 'white',
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

export const NewTapModal = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [modalStyle] = React.useState(getModalStyle);

	const [newTap, setNewTap] = React.useState({
		active: false,
		tapNumber: '',
		name: '',
		style: '',
		notes: '',
		og: '',
		fg: '',
		srm: '',
		ibu: '',
		amtLeft: '',
		kegSize: '',
	});

	const onNewTapChange = (e) => {
		setNewTap({ ...newTap, [e.target.name]: e.target.value });
	};

	const onNewTapCheckedChange = (e) => {
		setNewTap({ ...newTap, [e.target.name]: e.target.checked });
	};

	const saveTapBeer = () => {
		dispatch(createTapAsync(newTap));
		props.handleCloseNewTapModal();
	};

	return (
		<Modal
			open={props.newTapModalOpen}
			onClose={props.handleCloseNewTapModal}
			disableBackdropClick={true}
			aria-labelledby='simple-modal-title'
			aria-describedby='simple-modal-description'
		>
			<div style={modalStyle} className={classes.paper}>
				<h2 style={{ textAlign: 'center' }}>Create New Tap Beer</h2>
				<br />
				<form
					style={{ textAlign: 'center !important', alignItems: 'center' }}
					className={classes.root}
					noValidate
					autoComplete='off'
				>
					<div>
						Active:
						<Switch
							checked={newTap.active}
							onChange={onNewTapCheckedChange}
							label='Active'
							name='active'
							color='primary'
							inputProps={{ 'aria-label': 'secondary checkbox' }}
						/>
					</div>
					<TextField
						type='number'
						label='Tap Number'
						name={'tapNumber'}
						value={newTap.tapNumber}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='text'
						label='Name'
						name={'name'}
						value={newTap.name}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='text'
						label='Style'
						name={'style'}
						value={newTap.style}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='text'
						label='Notes'
						name={'notes'}
						value={newTap.notes}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='number'
						label='OG'
						name={'og'}
						value={newTap.og}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='number'
						label='FG'
						name={'fg'}
						value={newTap.fg}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='number'
						label='SRM'
						name={'srm'}
						value={newTap.srm}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='number'
						label='IBU'
						name={'ibu'}
						value={newTap.ibu}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='number'
						label='Amount Left (oz)'
						name={'amtLeft'}
						value={newTap.amtLeft}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
					<TextField
						type='number'
						label='Keg Size (oz)'
						name={'kegSize'}
						value={newTap.kegSize}
						onChange={onNewTapChange}
						variant='outlined'
						color='primary'
						required
					/>
				</form>
				<div style={{ textAlign: 'center' }}>
					<Button
						style={{ margin: 5 }}
						variant='contained'
						color='secondary'
						onClick={props.handleCloseNewTapModal}
					>
						Close
					</Button>
					<Button
						style={{ margin: 5 }}
						variant='contained'
						color='primary'
						onClick={saveTapBeer}
					>
						Save
					</Button>
				</div>
			</div>
		</Modal>
	);
};

NewTapModal.propTypes = {
	newTap: PropTypes.object,
};

export default NewTapModal;
