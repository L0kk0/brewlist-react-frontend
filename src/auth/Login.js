import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../redux/authSlice';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'table',
		width: '100%',
		height: '60vh',
	},
	form: {
		display: 'table-cell',
		textAlign: 'center',
		verticalAlign: 'middle',
		alignItems: 'center',
	},
	container: {
		border: '1px solid white',
		padding: 16,
		paddingTop: 30,
		position: 'absolute',
		left: '25%',
		backgroundColor: '#303030',
		width: '50%',
		boxShadow: '0px 0px 10px black',
	},
	textField: {
		margin: 16,
	},
	button: {
		margin: 16,
	},
}));
const Login = ({ login, isAuthenticated }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(loginAsync(email, password));
	};

	if (isAuthenticated) {
		return <Redirect to='/admin' />;
	}

	return (
		<div className={classes.root}>
			<form className={classes.form} onSubmit={onSubmit}>
				<div className={classes.container}>
					<TextField
						className={classes.textField}
						type='text'
						id='email'
						name='email'
						value={email}
						onChange={onChange}
						placeholder='email'
						autoComplete='on'
						variant='outlined'
						color='primary'
						label='Email'
						required
					/>
					<TextField
						className={classes.textField}
						type='password'
						id='password'
						name='password'
						value={password}
						onChange={onChange}
						placeholder='Password'
						autoComplete='on'
						variant='outlined'
						color='primary'
						label='Password'
						required
					/>
					<div>
						<Button
							className={classes.button}
							type='submit'
							variant='contained'
							color='primary'
						>
							Login
						</Button>
					</div>
					<div>
						<Link to='/'>Back to Site</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

Login.propTypes = {
	loginAsync: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginAsync })(Login);
