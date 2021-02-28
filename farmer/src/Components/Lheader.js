import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Link } from 'react-router-dom'

const styles = {
	root: {
		// flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	list: {
		width: 310,
		marginTop: '0px',
		// backgroundColor: 'grey',
	},
}

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.classes = props.classes
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<AppBar style={{ backgroundColor: '#EF6C00' }}>
					<Typography variant="title" color="inherit" className={classes.flex}>
						<span>
							<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img
									src="/freshconn_white.png"
									height="60"
									width="140"
									alt="logo"
								/>
							</Link>
						</span>
					</Typography>
				</AppBar>
			</div>
		)
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)
