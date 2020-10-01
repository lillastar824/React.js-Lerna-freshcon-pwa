import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ErrorAlert from '../Components/ErrorAlert'
import LoginOptions from '../Components/LoginOptions'
import Lheader from '../Components/Lheader'
import { withStyles } from '@material-ui/core/styles'
import { authContext } from '../Context/Auth'
import firebase from 'firebase/app'

const styles = {
	loginContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		alignContent: 'center',
		marginTop: '25vh',
	},
	paper: {
		backgroundImage: `url('/images/berry.jpg')`,
		boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.2)',
		backgroundSize: 'cover',
		margin: '0',
		overflow: 'auto',
		height: '100%',
	},
	loginBtn: {
		textAlign: 'center',
		paddingTop: '2em',
	},
	err: {
		backgroundColor: '#D4DBE1',
		borderRadius: 25,
		border: '1px solid #ced4da',
		fontSize: 20,
		boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		width: '14em',
		height: '2em',
		marginBottom: '1em',
		paddingLeft: 20,
	},
	bt: {
		borderRadius: 15,
		width: '20em',
		backgroundColor: '#EF6C00',
		color: 'white',
		fontWeight: 'bold',
	},
	gr: {
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
		position: 'fixed',
	},
}

class Login extends React.Component {
	static contextType = authContext
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			error: '',
		}
	}

	componentDidMount() {
		if (this.context.auth) {
			this.props.history.replace('/')
		}
	}
	componentDidUpdate() {
		if (this.context.auth) {
			this.props.history.replace('/')
		}
	}

	submitLogin(event) {
		event.preventDefault()
		// this.props.login(this.state.email, this.state.password).then(() => {
		// 	console.log(this.props.userInfo().uid)
		// 	this.props.history.replace('/home')
		// 	console.log('Logged in')
		// }).catch(err => {
		// 	this.setState({
		// 		error: err
		// 	})
		// })
		let r = firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
		r.then((suc) => {
			console.log('login sucessfull')
			this.props.history.push('/')
		}).catch((err) => {
			console.log(err)
			this.setState({
				error: err,
			})
		})
	}

	render() {
		const { classes } = this.props
		return (
			<React.Fragment>
				<Lheader />
				<Grid className={classes.gr} container spacing={24}>
					<Grid item xs={4}>
						<div className={classes.loginContainer}>
							<Typography style={{ paddingBottom: '2vh' }} variant="h5">
								Log In{' '}
							</Typography>
							<Typography style={{ paddingBottom: '2vh' }} variant="h6">
								{' '}
								Not a Member? Learn more
							</Typography>
							<div>
								<form
									onSubmit={(event) => {
										this.submitLogin(event)
									}}
								>
									<TextField
										placeholder="  E-mail"
										id="email"
										type="text"
										fullWidth={true}
										InputProps={{ disableUnderline: true }}
										onChange={(event) =>
											this.setState({ email: event.target.value })
										}
										className={classes.err}
									/>
									<br />
									<TextField
										placeholder="  Password"
										id="password"
										type="password"
										fullWidth={true}
										InputProps={{ disableUnderline: true }}
										onChange={(event) =>
											this.setState({ password: event.target.value })
										}
										className={classes.err}
									/>
									{this.state.error && (
										<ErrorAlert>Your username/password is incorrect</ErrorAlert>
									)}
									<div className={classes.loginBtn}>
										<Button
											className={classes.bt}
											type="submit"
											value="Submit"
											variant="contained"
										>
											Login
										</Button>
									</div>
								</form>
								Forgot your password?{' '}
								<a href="mailto:Hellofreshconn@gmail.com">
									<Typography color="primary" variant="body2">
										Contact Us
									</Typography>
								</a>
							</div>
							<LoginOptions {...this.props} />
						</div>
					</Grid>
					<Grid item xs>
						<div className={classes.paper} />
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}
}

export default withStyles(styles)(Login)
