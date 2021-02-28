import React, { useState, useContext } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
	TextField,
	Button,
} from '@material-ui/core'
import { authContext } from '../Context/Auth'

function MakeUsBetter({ open, handleClose }) {
	const context = useContext(authContext)
	const [msg, set] = useState('')
	const [loading, load] = useState(false)
	return (
		<Mutation
			mutation={gql`
				mutation order($id: String, $msg: String) {
					contactUs(email: $id, message: $msg) {
						result
					}
				}
			`}
		>
			{(contactUs) => (
				<Dialog
					fullWidth
					maxWidth={'sm'}
					open={open}
					onClose={handleClose}
					aria-labelledby="max-width-dialog-title"
				>
					<DialogTitle id="max-width-dialog-title">
						How can we help you?
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<TextField
								fullWidth
								mulitline
								value={msg}
								placeholder={'Tell us your issues with dashboard'}
								onChange={(e) => {
									set(e.target.value)
								}}
							/>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						{loading ? (
							<CircularProgress
								size={18}
								style={{ height: '2rem', width: '2rem', padding: '1rem' }}
							/>
						) : (
							<Button
								onClick={() => {
									load(true)
									contactUs({
										variables: {
											id: context.auth.email,
											msg,
										},
									}).then(() => {
										handleClose()
										load(false)
									})
								}}
								color="primary"
							>
								Send
							</Button>
						)}
					</DialogActions>
				</Dialog>
			)}
		</Mutation>
	)
}

export default MakeUsBetter
