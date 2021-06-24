import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import {
	createBottleAsync,
	deleteBottleAsync,
	updateBottleAsync,
} from '../../../redux/bottleSlice';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import BrewfatherModal from '../BrewfatherBatchesModal';

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
		},
	},
	text: {
		color: 'white',
	},
	gridRoot: {
		flexGrow: 1,
		marginTop: 30,
		marginBottom: 30,
	},
	gridContainer: {
		backgroundColor: '#404040',
		padding: 16,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},

	gridPaperEdit: {
		backgroundColor: 'blue',
	},
	gridPaperDelete: {
		backgroundColor: 'red',
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	tabPanel: {
		padding: 64,
	},
	button: {
		marginLeft: 10,
		marginRight: 10,
	},
	createButton: {
		marginRight: 16,
		marginBottom: 16,
	},
}));

export const AdminBottles = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const bottles = props.bottles;

	const [modalStyle] = React.useState(getModalStyle);
	const [createModalOpen, setCreateModalOpen] = React.useState(false);

	const handleOpenCreateModal = () => {
		setCreateModalOpen(true);
	};

	const handleCloseCreateModal = () => {
		setCreateModalOpen(false);
	};

	const [updateModalOpen, setUpdateModalOpen] = React.useState(false);

	const handleOpenUpdateModal = () => {
		setUpdateModalOpen(true);
	};

	const handleCloseUpdateModal = () => {
		setUpdateModalOpen(false);
	};

	const [brewfatherModalOpen, setBrewfatherModalOpen] = React.useState(false);

	const handleOpenBrewfatherModal = () => {
		setBrewfatherModalOpen(true);
	};

	const handleCloseBrewfatherModal = () => {
		setBrewfatherModalOpen(false);
	};

	const [newBottle, setNewBottle] = React.useState({
		active: true,
		name: 'Make America Amber Again',
		style: 'American Amber Ale',
		notes: 'Amber!',
		og: '1.050',
		fg: '1.010',
		srm: '13',
		ibu: '20',
		bottlesLeft: '50',
	});

	const [editBottle, setEditBottle] = React.useState({
		_id: '',
		active: false,
		name: '',
		style: '',
		notes: '',
		og: '',
		fg: '',
		srm: '',
		ibu: '',
		bottlesLeft: '',
	});

	const onCreateChange = (e) => {
		setNewBottle({ ...newBottle, [e.target.name]: e.target.value });
	};

	const onEditChange = (e) => {
		setEditBottle({ ...editBottle, [e.target.name]: e.target.value });
	};

	const saveBottleBeer = () => {
		dispatch(createBottleAsync(newBottle));
		setCreateModalOpen(false);
	};

	const editBottleBeer = (id) => {
		const selectedBottle = bottles.filter((bottle) => {
			return bottle._id === id;
		});

		setEditBottle(selectedBottle[0]);
		handleOpenUpdateModal();
	};

	const updateBottleBeer = () => {
		dispatch(updateBottleAsync(editBottle));
		handleCloseUpdateModal();
	};

	const deleteBottleBeer = (id) => {
		dispatch(deleteBottleAsync(id));
	};

	const handleCreateCheckedChange = (event) => {
		setNewBottle({ ...newBottle, [event.target.name]: event.target.checked });
	};

	const handleEditCheckedChange = (event) => {
		setEditBottle({ ...editBottle, [event.target.name]: event.target.checked });
	};

	React.useEffect(() => {
		// eslint-disable-next-line
	}, [bottles]);

	return (
		<div className={classes.tabPanel}>
			<Button
				className={classes.createButton}
				variant='contained'
				color='primary'
				onClick={handleOpenCreateModal}
			>
				Create Bottle
			</Button>
			<Button
				className={classes.createButton}
				variant='contained'
				color='primary'
				onClick={handleOpenBrewfatherModal}
			>
				Load Brewfather Batches
			</Button>
			<Typography
				variant='h4'
				component='h1'
				className={classes.text}
				gutterBottom
			>
				Bottle List:
			</Typography>
			<Typography
				variant='body1'
				component='p'
				className={classes.text}
				gutterBottom
			>
				Currently Serving
			</Typography>
			{bottles &&
				bottles.map((bottle) => (
					<React.Fragment key={bottle._id}>
						{bottle.active && (
							<div className={classes.gridRoot}>
								<Grid container className={classes.gridContainer}>
									<Grid item xs={2} className={classes.tabPanel.gridPaper}>
										<Avatar className={classes.orange}>
											{bottle.bottlesLeft}
										</Avatar>
									</Grid>
									<Grid item xs={6} className={classes.tabPanel.gridPaper}>
										{bottle.name}
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='contained'
											color='primary'
											onClick={() => editBottleBeer(bottle._id)}
										>
											EDIT
										</Button>
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='contained'
											color='secondary'
											onClick={() => deleteBottleBeer(bottle._id)}
										>
											DEL
										</Button>
									</Grid>
								</Grid>
							</div>
						)}
					</React.Fragment>
				))}
			<Typography
				variant='body1'
				component='p'
				className={classes.text}
				gutterBottom
			>
				On Deck
			</Typography>
			{bottles &&
				bottles.map((bottle) => (
					<React.Fragment key={bottle._id}>
						{!bottle.active && (
							<div className={classes.gridRoot}>
								<Grid container className={classes.gridContainer}>
									<Grid item xs={2} className={classes.tabPanel.gridPaper}>
										<Avatar className={classes.orange}>
											{bottle.bottlesLeft}
										</Avatar>
									</Grid>
									<Grid item xs={6} className={classes.tabPanel.gridPaper}>
										{bottle.name}
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='contained'
											color='primary'
											onClick={() => editBottleBeer(bottle._id)}
										>
											EDIT
										</Button>
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='contained'
											color='secondary'
											onClick={() => deleteBottleBeer(bottle._id)}
										>
											DEL
										</Button>
									</Grid>
								</Grid>
							</div>
						)}
					</React.Fragment>
				))}
			<Modal
				open={createModalOpen}
				onClose={handleCloseCreateModal}
				disableBackdropClick={true}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				<div style={modalStyle} className={classes.paper}>
					<h2 style={{ textAlign: 'center' }}>Create New Bottle Beer</h2>
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
								checked={newBottle.active}
								onChange={handleCreateCheckedChange}
								label='Active'
								name='active'
								color='primary'
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						</div>
						<TextField
							type='text'
							label='Name'
							name={'name'}
							value={newBottle.name}
							onChange={onCreateChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='text'
							label='Style'
							name={'style'}
							value={newBottle.style}
							onChange={onCreateChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='text'
							label='Notes'
							name={'notes'}
							value={newBottle.notes}
							onChange={onCreateChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='OG'
							name={'og'}
							value={newBottle.og}
							onChange={onCreateChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='FG'
							name={'fg'}
							value={newBottle.fg}
							onChange={onCreateChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='SRM'
							name={'srm'}
							value={newBottle.srm}
							onChange={onCreateChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='IBU'
							name={'ibu'}
							value={newBottle.ibu}
							onChange={onCreateChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='Bottles Left'
							name={'amtLeft'}
							value={newBottle.bottlesLeft}
							onChange={onCreateChange}
							variant='outlined'
							color='primary'
						/>
					</form>
					<div style={{ textAlign: 'center' }}>
						<Button
							style={{ margin: 5 }}
							variant='contained'
							color='secondary'
							onClick={handleCloseCreateModal}
						>
							Close
						</Button>
						<Button
							style={{ margin: 5 }}
							variant='contained'
							color='primary'
							onClick={saveBottleBeer}
						>
							Save
						</Button>
					</div>
				</div>
			</Modal>
			<Modal
				open={updateModalOpen}
				onClose={handleCloseUpdateModal}
				disableBackdropClick={true}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				<div style={modalStyle} className={classes.paper}>
					<h2 style={{ textAlign: 'center' }}>Edit Bottle Beer</h2>
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
								checked={editBottle.active}
								onChange={handleEditCheckedChange}
								label='Active'
								name='active'
								color='primary'
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						</div>
						<TextField
							type='text'
							label='Name'
							name={'name'}
							value={editBottle.name}
							onChange={onEditChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='text'
							label='Style'
							name={'style'}
							value={editBottle.style}
							onChange={onEditChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='text'
							label='Notes'
							name={'notes'}
							value={editBottle.notes}
							onChange={onEditChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='OG'
							name={'og'}
							value={editBottle.og}
							onChange={onEditChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='FG'
							name={'fg'}
							value={editBottle.fg}
							onChange={onEditChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='SRM'
							name={'srm'}
							value={editBottle.srm}
							onChange={onEditChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='IBU'
							name={'ibu'}
							value={editBottle.ibu}
							onChange={onEditChange}
							variant='outlined'
							color='primary'
						/>
						<TextField
							type='number'
							label='Bottles Left'
							name={'bottlesLeft'}
							value={editBottle.bottlesLeft}
							onChange={onEditChange}
							variant='outlined'
							color='primary'
						/>
					</form>
					<div style={{ textAlign: 'center' }}>
						<Button
							style={{ margin: 5 }}
							variant='contained'
							color='secondary'
							onClick={handleCloseUpdateModal}
						>
							Close
						</Button>
						<Button
							style={{ margin: 5 }}
							variant='contained'
							color='primary'
							onClick={updateBottleBeer}
						>
							Save
						</Button>
					</div>
				</div>
			</Modal>
			<BrewfatherModal
				type={'bottle'}
				settings={props.settings}
				brewfatherModalOpen={brewfatherModalOpen}
				handleCloseBrewfatherModal={handleCloseBrewfatherModal}
			/>
		</div>
	);
};

AdminBottles.propTypes = {
	bottles: PropTypes.array,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBottles);
