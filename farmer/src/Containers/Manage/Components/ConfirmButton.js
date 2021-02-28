import { Button, CircularProgress } from '@material-ui/core'
import React, { useContext } from 'react'
import { dialogContext } from '../context'
export function ConfirmButton({ loading, valid }) {
	const {
		view: { type },
	} = useContext(dialogContext)
	if (loading)
		return (
			<CircularProgress
				size={18}
				style={{ height: '2rem', width: '2rem', padding: '1rem' }}
			/>
		)
	else
		return (
			<React.Fragment>
				{type === 'add' && (
					<Button
						color="primary"
						type="submit"
						variant="contained"
						disabled={loading || !valid}
					>
						ADD
					</Button>
				)}
				{type === 'edit' && (
					<Button
						color="primary"
						type="submit"
						variant="contained"
						disabled={loading || !valid}
					>
						UPDATE
					</Button>
				)}
			</React.Fragment>
		)
}
