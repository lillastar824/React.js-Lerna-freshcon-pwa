import {
	Avatar,
	Button,
	Chip,
	FormGroup,
	Grid,
	Paper,
	TextField,
	Toolbar,
	Typography,
	Container,
	makeStyles,
	MenuItem,
} from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import ErrorAlert from '../Components/ErrorAlert'
import { ImageView } from './ImageView'
import Password from './Password'
import produce from 'immer'
import { useSnackbar } from 'notistack'

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
	bt: {
		borderRadius: 5,
		width: '20em',
		backgroundColor: '#EF6C00',
		color: 'white',
		fontWeight: 'bold',
	},
	allset: {
		backgroundColor: '#7CB342',
		color: 'white',
		fontWeight: 'bold',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(),
		marginRight: theme.spacing(),
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
	stripe: {
		cursor: 'pointer',
	},
}))

const theme = createMuiTheme({
	palette: {
		primary: grey,
	},
	typography: { useNextVariants: true },
})
function Profile() {
	const [state, setState] = useState({
		name: '',
		address: '',
		type: 'pick',
		email: '',
		phone: 0,
		url: '',
		story: '',
		image: null,
	})
	const snack = useSnackbar()
	useEffect(() => {
		let cancel = false
		const { uid } = firebase.auth().currentUser
		firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.get()
			.then(snap => {
				if (!cancel) setState(snap.data())
			})
		return () => {
			cancel = true
		}
	}, [])
	let submitProfile = event => {
		event.preventDefault()
	}

	let handleProfilePicture = async e => {
		let name = e.currentTarget.files[0].name
		const response = new Response(e.currentTarget.files[0])
		let blob = await response.blob()
		setState({
			...state,
			image: { name, blob },
		})
	}
	const classes = styles()
	return (
		<Container maxWidth="lg">
			<Paper className={classes.pap}>
				<Toolbar className={classes.tool}>
					<Typography variant="h6" className={classes.title}>
						My Profile
					</Typography>
				</Toolbar>
				<form
					className={classes.container}
					onSubmit={async event => {
						submitProfile(event)
						const user = firebase.auth().currentUser
						if (state.image.blob) {
							const storage = firebase.storage().ref()
							let snap = await storage
								.child(`farmers/${state.image.name}`)
								.put(state.image.blob)
							let url = await snap.ref.getDownloadURL()
							user.updateProfile({
								photoURL: url,
							})
						}
						await firebase
							.firestore()
							.collection('farmers')
							.doc(user.uid)
							.update({
								...state,
								image: state.image.name,
							})
						snack.enqueueSnackbar('profile updated', {
							variant: 'success',
						})
					}}
					noValidate
					autoComplete="off"
				>
					<Grid container spacing={2} justify="space-evenly">
						<Grid item xs={8}>
							<Chip
								avatar={<Avatar className={classes.avatar}>1</Avatar>}
								label="Upload your Company details here."
								className={classes.chip}
								color="primary"
							/>
							<FormGroup>
								<MuiThemeProvider theme={theme}>
									<TextField
										id="name"
										label="Company Name"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState(
												produce(state, draft => {
													draft.name = event.target.value
												})
											)
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
											setState(
												produce(state, draft => {
													draft.address = event.target.value
												})
											)
										}
										value={state.address}
									/>
									<TextField
										id="type"
										label="Type Of Delivery"
										select
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState(
												produce(state, draft => {
													draft.type = event.target.value
												})
											)
										}
										value={state.type}
									>
										<MenuItem value="pick">Pick Up</MenuItem>
										<MenuItem value="home">Home Delivery</MenuItem>
									</TextField>
									<TextField
										id="phone"
										label="Business Phone Number"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState(
												produce(state, draft => {
													draft.phone = Number.parseInt(event.target.value)
												})
											)
										}
										value={state.phone}
									/>
									<TextField
										id="email"
										label="Business Email"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										onChange={event =>
											setState(
												produce(state, draft => {
													draft.email = event.target.value
												})
											)
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
											setState(
												produce(state, draft => {
													draft.url = event.target.value
												})
											)
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
											setState(
												produce(state, draft => {
													draft.story = event.target.value
												})
											)
										}
										value={state.story}
									/>
								</MuiThemeProvider>
							</FormGroup>
						</Grid>
						<Grid item xs={4} container spacing={2} justify="center">
							<Grid item>
								<Chip
									avatar={<Avatar className={classes.avatar}>2</Avatar>}
									label="Upload your Company Logo image here."
									className={classes.chip}
									color="primary"
								/>
							</Grid>
							<Grid item>
								<ImageView
									image={state.image}
									type="farmer"
									change={image => {
										setState({ ...state, image })
									}}
								/>
								<input
									id="pPic"
									type="file"
									accept="image/*"
									className={classes.input}
									onChange={handleProfilePicture}
								/>
							</Grid>
							<Grid item>
								<label htmlFor="pPic">
									<Button
										className={classes.bt}
										component="span"
										variant="contained"
									>
										+ Upload your logo here
									</Button>
								</label>
							</Grid>
							<Grid item>
								{state.error && (
									<ErrorAlert>Please Enter all the Details</ErrorAlert>
								)}
								<div className={classes.submitBtn}>
									<Button
										className={`${classes.bt} ${classes.allset}`}
										type="submit"
										value="Submit"
										variant="contained"
									>
										All Set
									</Button>
								</div>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Paper>
			<br />
			<Password />
		</Container>
	)
}

export default Profile
