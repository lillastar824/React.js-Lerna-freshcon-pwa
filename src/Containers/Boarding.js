import {
	Avatar,
	Button,
	Chip,
	CircularProgress,
	Container,
	FormGroup,
	Grid,
	Step,
	StepLabel,
	Stepper,
	TextField,
	MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import { parse } from 'query-string'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import ErrorAlert from '../Components/ErrorAlert'
import { uploadImage } from '../utils'
import { Complete } from './Complete'
import Header from './Header'
import { Payment } from './Payment'
import './boarding.css'
import { ImageView } from './ImageView'

export const styles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	heading: {
		fontSize: theme.typography.pxToRem(20),
		fontWeight: theme.typography.fontWeightRegular,
	},
	fullWidth: {
		width: '100vw',
	},
	submitBtn: {
		textAlign: 'center',
		marginTop: '2em',
	},
	allset: {
		backgroundColor: '#7CB342',
		color: 'white',
		fontWeight: 'bold',
		marginTop: '8em',
	},
	bt: {
		borderRadius: 5,
		width: '20em',
		backgroundColor: '#EF6C00',
		color: 'white',
		fontWeight: 'bold',
		marginLeft: '3vw',
	},
	container: {
		padding: '3rem 0rem',
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	pap: {
		margin: '4em',
	},
	chip: {
		marginLeft: '1em',
		backgroundColor: '#FFFFFF',
		color: 'black',
	},
	avatar: {
		backgroundColor: '#7CB342',
	},
	input: {
		display: 'none',
	},
	tool: {
		backgroundColor: '#F9E957',
		marginBottom: '3vh',
	},
	image: {
		objectFit: 'scale-down',
	},
}))

function checkForEmpty(state) {
	// Math.ceil(Math.log10(n+1)) length of the number
	/*
		e: state.name,
		email: state.email,
		address: state.address,
		type: state.type,
		phoneno: state.phoneno,
		url: state.url,
		story: state.story,
		image
	*/
	let check = true
	if (Math.ceil(Math.log10(state.phoneno + 1)) === 0) check = false
	if (
		state.name.length <= 0 &&
		state.address.length <= 0 &&
		state.type.length <= 0 &&
		state.url.length <= 7 &&
		state.story.length <= 0
	)
		check = false

	return check
}

function Stages({ stage, children }) {
	const steps = ['Profile', 'Payment', 'Complete']
	return (
		<div>
			<Stepper activeStep={stage}>
				{steps.map((step, index) => (
					<Step key={index} completed={stage > index}>
						<StepLabel>{step}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>{children.filter((_, index) => stage === index)}</div>
		</div>
	)
}

function Welcome(props) {
	const { history, location } = props
	const classes = styles()
	const { uid, email } = firebase.auth().currentUser
	const [loading, load] = useState(false)
	const [stage, set] = useState(0)

	const [state, setState] = useState({
		name: '',
		address: '',
		type: '',
		email: email,
		zipcode: 0,
		phone: 0,
		url: '',
		story: '',
		image: null,
		error: false,
	})
	useEffect(() => {
		async function get() {
			const { uid } = firebase.auth().currentUser
			let snap = await firebase
				.firestore()
				.collection('farmers')
				.doc(uid)
				.get()
			let data = snap.data()
			setState({ ...data })
			if (q.state) {
				set(1)
			}
		}
		let q = parse(location.search)
		get()
	}, [location])
	async function handleProfilePicture(event) {
		if (event.target.files && event.target.files[0]) {
			try {
				const name = event.target.files[0].name
				const blob = await new Response(event.target.files[0]).blob()

				setState({ ...state, image: { name, blob } })
			} catch (e) {
				console.log(e)
			}
		}
	}
	return (
		<div>
			<Header noTab />
			<Container>
				<Stages stage={stage}>
					<form
						className={classes.container}
						onSubmit={async event => {
							event.preventDefault()
							setState({
								...state,
								error: false,
							})
							load(true)
							if (checkForEmpty(state)) {
								try {
									let { error, ...data } = state

									await firebase
										.firestore()
										.collection('farmers')
										.doc(`${uid}`)
										.update({
											...data,
											image:
												typeof state.image === 'string'
													? state.image
													: state.image.name,
										})
									if (typeof state.image !== 'string')
										await uploadImage({
											name: state.image.name,
											blob: state.image.blob,
										})
									set(1)
								} catch (err) {
									console.log(err)
								}
							} else {
								load(false)
								setState({
									...state,
									error: true,
								})
							}
						}}
						noValidate
						autoComplete="off"
					>
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<Chip
									avatar={<Avatar className={classes.avatar}>1</Avatar>}
									label="Upload your Company details here."
									className={classes.chip}
									color="primary"
								/>
								<FormGroup>
									<TextField
										id="name"
										label="Company Name"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState({ ...state, name: event.target.value })
										}
										value={state.name}
									/>
									<TextField
										id="address"
										label="Company Address"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState({ ...state, address: event.target.value })
										}
										value={state.address}
									/>
									<TextField
										id="zipcode"
										label="Zipcode"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState({ ...state, zipcode: event.target.value })
										}
										value={state.zipcode}
									/>
									<TextField
										id="type"
										label="Type Of Delivery"
										select
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState({ ...state, type: event.target.value })
										}
										value={state.type}
									>
										<MenuItem value="pick">Pick Up</MenuItem>
										<MenuItem value="home">Home Delivery</MenuItem>
									</TextField>
									<TextField
										id="phoneno"
										label="Phone Number"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState({
												...state,
												phone:
													event.target.value === ''
														? 0
														: Number.parseInt(event.target.value),
											})
										}
										value={state.phone}
									/>
									<TextField
										id="email"
										label="Email"
										className={classes.textField}
										margin="normal"
										type="email"
										variant="outlined"
										onChange={event =>
											setState({ ...state, email: event.target.value })
										}
										value={state.email}
									/>
									<TextField
										id="url"
										label="Website"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState({ ...state, url: event.target.value })
										}
										value={state.url}
									/>
									<TextField
										id="story"
										multiline
										rows="4"
										label="Your Company's Story"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState({ ...state, story: event.target.value })
										}
										value={state.story}
									/>
								</FormGroup>
							</Grid>
							<Grid item xs={3}>
								<Chip
									avatar={<Avatar className={classes.avatar}>2</Avatar>}
									label="Upload your Company Logo image here."
									className={classes.chip}
									color="primary"
								/>
								<div style={{ paddingTop: '3em' }}>
									{state.image ? (
										<ImageView
											image={state.image}
											type="farmer"
											change={image => {
												setState({ ...state, image })
											}}
										/>
									) : (
										<img
											src="../images/images.png"
											height="400"
											width="340"
											alt="logo"
										/>
									)}
									<input
										id="pPic"
										type="file"
										accept="image/*"
										className={classes.input}
										onChange={handleProfilePicture}
									/>
									<label htmlFor="pPic">
										<Button
											className={classes.bt}
											component="span"
											variant="contained"
										>
											+ Upload your logo here
										</Button>
									</label>
								</div>
							</Grid>
						</Grid>
						<Grid container spacing={2} justify="center">
							<Grid item xs={4}>
								{state.error && (
									<ErrorAlert>Please Enter all the Details</ErrorAlert>
								)}
								<div className={classes.submitBtn}>
									{loading ? (
										<CircularProgress
											size={18}
											style={{ height: '2rem', width: '2rem', padding: '1rem' }}
										/>
									) : (
										<Button
											className={classes.allset}
											type="submit"
											value="Submit"
											variant="contained"
										>
											Next
										</Button>
									)}
								</div>
							</Grid>
						</Grid>
					</form>
					<Payment next={() => set(2)} farmer={state} location={location} />
					<Complete next={() => history.push('/')} />
				</Stages>
			</Container>
		</div>
	)
}

export default withRouter(Welcome)
