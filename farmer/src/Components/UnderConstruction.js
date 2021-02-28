import React from 'react'
import Typography from '@material-ui/core/Typography'
import EricSuzie from '../../node_modules/@greenery/all/lib/assets/EricSuzie.jpg'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core'

function UnderConstruction() {
	return (
		<Paper>
			<Grid container spacing={0} alignItems="center" justify="center">
				<img src={EricSuzie} style={{ height: '62vh' }} alt="eric" />
				<Typography variant="h2" id="modal-title">
					Hey There!
				</Typography>
				<Typography
					style={{ margin: '2em', marginRight: '3em', marginLeft: '3em' }}
					variant="h5"
					id="simple-modal-description"
				>
					As we continue to rollout new updates to your dashboard, please give
					our team time to launch this feature.
				</Typography>
			</Grid>
		</Paper>
	)
}

export default UnderConstruction
