import React, { Component } from 'react'
import './NotFound.css'
import Suzie from '@greenery/all/lib/assets/EricSuzie.jpg'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export class NotFound extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="center">
					<div className="row">
						<img src={Suzie} alt="Not Found" className="image" />
						<div className="description">
							<Typography variant="h4" gutterBottom>
								Page Not Found
							</Typography>
							<Typography variant="body1" gutterBottom>
								We cannot go to this page
							</Typography>
							<Button variant="outlined" component={Link} to="/">
								Back
							</Button>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default NotFound
