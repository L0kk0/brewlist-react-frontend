import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { updateTapAsync } from '../../../redux/tapSlice';
import Switch from '@material-ui/core/Switch';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		zIndex: 50,
		minWidth: '50%',
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
	text: {
		color: 'white',
	},

	button: {
		marginLeft: 10,
		marginRight: 10,
	},
}));

export const EditTapModal = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [modalStyle] = React.useState(getModalStyle);

	const updateTapBeer = () => {
		dispatch(updateTapAsync(props.editTap));
		props.handleCloseEditTapModal();
	};

	const onEditTapChange = (e) => {
		props.setEditTap({ ...props.editTap, [e.target.name]: e.target.value });
	};

	const onEditTapCheckedChange = (event) => {
		props.setEditTap({
			...props.editTap,
			[event.target.name]: event.target.checked,
		});
	};

	return (
		<Modal
			open={props.editTapModalOpen}
			onClose={props.handleCloseEditTapModal}
			disableBackdropClick={true}
			aria-labelledby='simple-modal-title'
			aria-describedby='simple-modal-description'
		>
			<div style={modalStyle} className={classes.paper}>
				<h2 style={{ textAlign: 'center' }}>Edit Tap Beer</h2>
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
							checked={props.editTap.active}
							onChange={onEditTapCheckedChange}
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
						value={props.editTap.tapNumber}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='text'
						label='Name'
						name={'name'}
						value={props.editTap.name}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='text'
						label='Style'
						name={'style'}
						value={props.editTap.style}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='text'
						label='Notes'
						name={'notes'}
						value={props.editTap.notes}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='number'
						label='OG'
						name={'og'}
						value={props.editTap.og}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='number'
						label='FG'
						name={'fg'}
						value={props.editTap.fg}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='number'
						label='SRM'
						name={'srm'}
						value={props.editTap.srm}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='number'
						label='IBU'
						name={'ibu'}
						value={props.editTap.ibu}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='number'
						label='Amount Left (oz)'
						name={'amtLeft'}
						value={props.editTap.amtLeft}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
					<TextField
						type='number'
						label='Keg Size (oz)'
						name={'kegSize'}
						value={props.editTap.kegSize}
						onChange={onEditTapChange}
						variant='outlined'
						color='primary'
					/>
				</form>
				<div style={{ textAlign: 'center' }}>
					<Button
						style={{ margin: 5 }}
						variant='contained'
						color='secondary'
						onClick={props.handleCloseEditTapModal}
					>
						Close
					</Button>
					<Button
						style={{ margin: 5 }}
						variant='contained'
						color='primary'
						onClick={updateTapBeer}
					>
						Save
					</Button>
				</div>
			</div>
		</Modal>
	);
};

EditTapModal.propTypes = {
	editTap: PropTypes.object,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditTapModal);
