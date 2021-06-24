import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
	loadBatchesAsync,
	importBatchAsTapAsync,
	importBatchAsBottleAsync,
	selectBatches,
} from '../../redux/brewFatherSlice.js';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		zIndex: 50,
		minWidth: '80%',
		overflow: 'auto',
		height: '80%',
		display: 'block',
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',

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

	button: {
		marginLeft: 10,
		marginRight: 10,
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
		minWidth: 600,
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
	createButton: {
		marginRight: 16,
		marginBottom: 16,
	},
}));

export const BrewfatherBatchesModal = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [modalStyle] = React.useState(getModalStyle);
	const batches = useSelector(selectBatches);
	const settings = props.settings;

	const getBrewDate = (brewDate) => {
		var date = new Date(brewDate);
		return (
			(date.getMonth() > 8
				? date.getMonth() + 1
				: '0' + (date.getMonth() + 1)) +
			'/' +
			(date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
			'/' +
			date.getFullYear()
		);
	};

	const getBatches = () => {
		dispatch(loadBatchesAsync());
	};

	const importBatch = (id) => {
		if (props.type === 'tap') {
			dispatch(importBatchAsTapAsync(id, settings));
		}

		if (props.type === 'bottle') {
			dispatch(importBatchAsBottleAsync(id, settings));
		}

		props.handleCloseBrewfatherModal();
	};

	useEffect(() => {
		if (props.brewfatherModalOpen && !batches) {
			getBatches();
		}
		// eslint-disable-next-line
	}, [props.brewfatherModalOpen, batches]);

	return (
		<Modal
			open={props.brewfatherModalOpen}
			onClose={props.handleCloseBrewfatherModal}
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
					{batches ? (
						batches.map((batch) => (
							<React.Fragment key={batch._id}>
								<div className={classes.gridRoot}>
									<Grid container className={classes.gridContainer}>
										<Grid item xs={2} className={classes.tabPanel.gridPaper}>
											<Avatar className={classes.orange}>
												{batch.batchNo}
											</Avatar>
										</Grid>
										<Grid item xs={4} className={classes.tabPanel.gridPaper}>
											{batch.recipe.name}
										</Grid>
										<Grid item xs={4} className={classes.tabPanel.gridPaper}>
											{getBrewDate(batch.brewDate)}
										</Grid>
										<Grid item xs={2}>
											<Button
												variant='contained'
												className={classes.button}
												color='primary'
												onClick={() => importBatch(batch._id)}
											>
												Import
											</Button>
										</Grid>
									</Grid>
								</div>
							</React.Fragment>
						))
					) : (
						<h1>Loading Batches...</h1>
					)}
				</form>
				<div style={{ textAlign: 'center' }}>
					<Button
						style={{ margin: 5 }}
						variant='contained'
						color='secondary'
						onClick={props.handleCloseBrewfatherModal}
					>
						Close
					</Button>
					<Button
						style={{ margin: 5 }}
						variant='contained'
						color='primary'
						onClick={getBatches}
					>
						Reload Batches
					</Button>
				</div>
			</div>
		</Modal>
	);
};

BrewfatherBatchesModal.propTypes = {
	batches: PropTypes.array,
};

export default BrewfatherBatchesModal;
