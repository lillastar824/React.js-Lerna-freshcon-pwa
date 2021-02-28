import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import styles from './profile.module.css'
import { appContext } from '../Provider'
import produce from 'immer'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Modal from '@material-ui/core/Modal'
import ProfileImage from './ProfileImage'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}))

function getModalStyle() {
	const top = 50
	const left = 50

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	}
}

async function updateUserInfo(profile, user) {
	const auth = firebase.auth().currentUser
	if (profile.image !== user.image.name) {
		const storage = firebase.storage().ref()
		let snap = await storage
			.child(`users/${user.image.name}`)
			.put(user.image.blob)
		let url = await snap.ref.getDownloadURL()
		auth.updateProfile({
			photoURL: url,
		})
	}
	await firebase
		.firestore()
		.collection('users')
		.doc(auth.uid)
		.update({ ...user, image: user.image.name })

	auth.updateProfile({
		displayName: user.name,
	})
}
async function changePassword(current, new_password, confirm_password) {
	const user = firebase.auth().currentUser
	if (new_password === confirm_password) {
		let credential = firebase.auth.EmailAuthProvider.credential(
			user.email,
			current
		)
		try {
			await user.reauthenticateWithCredential(credential)
			await user.updatePassword(confirm_password)
			return true
		} catch (e) {
			return false
		}
	} else {
		return false
	}
}

function Password() {
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const [state, set] = useState({
		current: '',
		password: '',
		confirm: '',
	})

	const classes = useStyles()

	const [modalStyle] = React.useState(getModalStyle)

	const MySwal = withReactContent(Swal)

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<div className="control has-text-centered ">
				<div className="label">Change Password</div>
				<form
					onSubmit={(event) => {
						event.preventDefault()
						changePassword(state.current, state.password, state.confirm).then(
							(message) => {
								if (message) {
									MySwal.fire({
										toast: true,
										position: 'bottom',
										icon: 'success',
										title: 'Password',
										titleText: 'Password changed',
										timer: 2000,
									})
									handleClose()
								} else {
									MySwal.fire({
										toast: true,
										position: 'bottom',
										icon: 'error',
										title: 'Password',
										titleText: 'Wrong password',
										timer: 2000,
									})
								}
								set({
									current: '',
									password: '',
									confirm: '',
								})
							}
						)
					}}
				>
					<div className="field">
						<div className="control">
							<input
								className="input"
								type="password"
								placeholder="Current password"
								onChange={(event) =>
									set(
										produce(state, (draft) => {
											draft.current = event.target.value
										})
									)
								}
								value={state.current}
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<input
								className="input"
								type="password"
								placeholder="New password"
								onChange={(event) =>
									set(
										produce(state, (draft) => {
											draft.password = event.target.value
										})
									)
								}
								value={state.password}
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<input
								className="input"
								type="password"
								placeholder="Confirm password"
								onChange={(event) =>
									set(
										produce(state, (draft) => {
											draft.confirm = event.target.value
										})
									)
								}
								value={state.confirm}
							/>
						</div>
					</div>
					<button className="button" type="submit" value="submit">
						Change
					</button>
				</form>
			</div>
		</div>
	)

	return (
		<div>
			<button className="button" type="button" onClick={handleOpen}>
				Change Password
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	)
}
function Info() {
	const currentUser = firebase.auth().currentUser
	const { state, reset } = useContext(appContext)
	const [user, set] = useState({
		name: '',
		phone: '',
		image: {
			name: '',
		},
	})
	useEffect(() => {
		set((prev) => ({ ...prev, ...state.profile }))
	}, [state.profile])
	const MySwal = withReactContent(Swal)
	return (
		<div className="Profile">
			<div label="My Info">
				<div className="container">
					<section className="hero is-medium">
						<div className={`${styles.profile} section`}>
							<h6
								className="subtitle has-text-weight-bold"
								style={{ color: '#616161' }}
							>
								Profile
							</h6>
							<div className="control has-text-centered ">
								<div className="box">
									<div className="label">Account Information</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="email"
												placeholder="Email"
												disabled
												value={currentUser.email}
												style={{ cursor: 'default' }}
											/>
										</div>
									</div>
									<div className="field">
										<div className="control">
											<input
												className="input"
												type="password"
												placeholder="Name"
												disabled
												value="default password"
												style={{ cursor: 'default' }}
											/>
										</div>
									</div>
									<Password />
								</div>
								<form
									onSubmit={(event) => {
										event.preventDefault()
										updateUserInfo(state.profile, user).then((_) => {
											MySwal.fire({
												toast: true,
												position: 'bottom',
												icon: 'success',
												title: 'Profile',
												titleText: 'Profile updated',
												timer: 2000,
											})
										})
									}}
								>
									<div className="box">
										<div className="label">Personal Information</div>

										<ProfileImage
											src={user.image}
											onChange={(image) => {
												set(
													produce(user, (draft) => {
														draft.image = image
													})
												)
											}}
										/>

										<div className="field">
											<div className="control">
												<input
													className="input"
													type="name"
													placeholder="Name"
													onChange={(event) =>
														set(
															produce(user, (draft) => {
																draft.name = event.target.value
															})
														)
													}
													value={user.name}
												/>
											</div>
										</div>
										<div className="field">
											<div className="control">
												<input
													className="input"
													type="phone"
													placeholder="Phone Number"
													onChange={(event) =>
														set(
															produce(user, (draft) => {
																draft.phone = event.target.value
																	? Number.parseInt(event.target.value)
																	: ''
															})
														)
													}
													value={user.phone}
												/>
											</div>
										</div>
										<button className="button" type="submit" value="submit">
											Update
										</button>
									</div>
								</form>
							</div>

							<div style={{ display: 'flex', placeContent: 'center' }}>
								<button
									className="button"
									style={{
										marginTop: '2em',
										backgroundColor: '#EF6C00',
										color: '#FFFFFF',
									}}
									onClick={() => {
										reset()
										window.localStorage.clear()
										firebase.auth().signOut()
									}}
								>
									Logout
								</button>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default Info
