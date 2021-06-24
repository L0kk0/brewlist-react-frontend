import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { deleteTapAsync, selectTaps } from '../../../redux/tapSlice';
import NewTapModal from './NewTapModal';
import EditTapModal from './EditTapModal';
import BrewfatherModal from '../BrewfatherBatchesModal';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

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
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		minWidth: 500,
		overflow: 'auto',
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

export const AdminTaps = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const taps = useSelector(selectTaps);

	const [newTapModalOpen, setNewModalOpen] = React.useState(false);

	const handleOpenNewTapModal = () => {
		setNewModalOpen(true);
	};

	const handleCloseNewTapModal = () => {
		setNewModalOpen(false);
	};

	const [editTapModalOpen, setEditTapModalOpen] = React.useState(false);

	const handleOpenEditTapModal = () => {
		setEditTapModalOpen(true);
	};

	const handleCloseEditTapModal = () => {
		setEditTapModalOpen(false);
	};

	const [brewfatherModalOpen, setBrewfatherModalOpen] = React.useState(false);

	const handleOpenBrewfatherModal = () => {
		setBrewfatherModalOpen(true);
	};

	const handleCloseBrewfatherModal = () => {
		setBrewfatherModalOpen(false);
	};

	const [editTap, setEditTap] = React.useState({
		active: false,
		_id: '',
		tapNumber: 0,
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

	const editTapBeer = (id) => {
		const selectedTap = taps.filter((tap) => {
			return tap._id === id;
		});

		setEditTap(selectedTap[0]);
		handleOpenEditTapModal();
	};

	const deleteTapBeer = (id) => {
		dispatch(deleteTapAsync(id));
	};

	return (
		<div className={classes.tabPanel}>
			<Button
				className={classes.createButton}
				variant='contained'
				color='primary'
				onClick={handleOpenNewTapModal}
			>
				Create Tap Beer
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
				Tap List:
			</Typography>
			<Typography
				variant='body1'
				component='p'
				className={classes.text}
				gutterBottom
			>
				Currently Serving
			</Typography>
			{taps &&
				taps.map((tap) => (
					<React.Fragment key={tap._id}>
						{tap.active && (
							<div className={classes.gridRoot}>
								<Grid container className={classes.gridContainer}>
									<Grid item xs={2} className={classes.tabPanel.gridPaper}>
										<Avatar className={classes.orange}>{tap.tapNumber}</Avatar>
									</Grid>
									<Grid item xs={6} className={classes.tabPanel.gridPaper}>
										{tap.name}
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='contained'
											color='primary'
											onClick={() => editTapBeer(tap._id)}
										>
											EDIT
										</Button>
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='contained'
											color='secondary'
											onClick={() => deleteTapBeer(tap._id)}
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
			{taps &&
				taps.map((tap) => (
					<React.Fragment key={tap._id}>
						{!tap.active && (
							<div className={classes.gridRoot}>
								<Grid container className={classes.gridContainer}>
									<Grid item xs={2} className={classes.tabPanel.gridPaper}>
										<Avatar className={classes.orange}>{tap.tapNumber}</Avatar>
									</Grid>
									<Grid item xs={6} className={classes.tabPanel.gridPaper}>
										{tap.name}
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='contained'
											className={classes.button}
											color='primary'
											onClick={() => editTapBeer(tap._id)}
										>
											EDIT
										</Button>
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='contained'
											className={classes.button}
											color='secondary'
											onClick={() => deleteTapBeer(tap._id)}
										>
											DEL
										</Button>
									</Grid>
								</Grid>
							</div>
						)}
					</React.Fragment>
				))}
			<NewTapModal
				newTapModalOpen={newTapModalOpen}
				handleCloseNewTapModal={handleCloseNewTapModal}
			/>
			<EditTapModal
				editTap={editTap}
				setEditTap={setEditTap}
				editTapModalOpen={editTapModalOpen}
				handleCloseEditTapModal={handleCloseEditTapModal}
			/>
			<BrewfatherModal
				type={'tap'}
				settings={props.settings}
				brewfatherModalOpen={brewfatherModalOpen}
				handleCloseBrewfatherModal={handleCloseBrewfatherModal}
			/>
		</div>
	);
};

AdminTaps.propTypes = {
	taps: PropTypes.array,
};

export default AdminTaps;
