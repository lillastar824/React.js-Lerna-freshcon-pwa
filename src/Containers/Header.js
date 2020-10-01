import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Notifications from '@material-ui/icons/Notifications'
import { Menu, MenuItem, Drawer } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import HeaderAvatar from '../Components/HeaderAvatar'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import { Link, withRouter } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MakeUsBetter from '../Components/MakeUsBetter'
import firebase from 'firebase/app'
import NavTabs from './NavTabs'
function Hid(props) {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('sm'))
	if (matches) {
		return <div>{props.children}</div>
	} else {
		return <React.Fragment />
	}
}
const styles = theme => ({
	root: {
		// flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
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
	notify: {
		marginRight: '1em',
		color: 'grey',
	},
	right: {
		marginRight: '1em',
		color: 'black',
		borderColor: 'black',
		textTransform: 'none',
		'&:hover': {
			backgroundColor: '#7CB342',
			color: '#FFFFFF',
			borderColor: '#FFFFFF',
		},
	},
	indicator: {
		backgroundColor: '#7CB342',
	},
	svg: {
		height: '2em',
		width: '2em',
	},
	tborder: {
		border: 'solid grey 1px',
		borderRadius: '5px',
		margin: '1em',
		backgroundColor: '#FFFFFF',
		height: '13vh',
		textTransform: 'none',
		'&$tabSelected': {
			backgroundColor: '#F9E957',
		},
	},
	tabSelected: {},
	pad: {
		[theme.breakpoints.up('md')]: {
			paddingTop: '80px',
			paddingLeft: '150px',
			paddingRight: '150px',
			paddingBottom: '30px',
			backgroundColor: '#F5F5F5',
		},
	},
})

class Header extends React.Component {
	state = {
		anchorEl: null,
		makeUsBetter: false,
	}

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget })
	}

	handleClose = () => {
		this.setState({ anchorEl: null })
	}
	static defaultProps = {
		cart: 0,
		noTab: false,
	}
	constructor(props) {
		super(props)
		this.classes = props.classes
		this.state = {
			left: false,
			back: props.back || null,
			tabs: ['/', '/manage', '/numbers', '/profile'],
			feed: false,
		}
	}

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		})
	}
	render() {
		const { anchorEl } = this.state
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<AppBar
					position="static"
					style={{ backgroundColor: '#FFFFFF' }}
					className={classes.appBar}
				>
					<Toolbar variant="dense">
						<Typography color="inherit" className={classes.flex}>
							<span>
								<Link
									to="/"
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									<img
										src="/freshconn_logo.png"
										height="60"
										width="140"
										alt="logo"
									/>
								</Link>
							</span>
						</Typography>
						<Hid>
							{/* <Button
								className={classes.right}
								variant="outlined"
								color="primary"
							>
								Grow Your Business
							</Button> */}
							<Button
								className={classes.right}
								variant="outlined"
								color="primary"
								onClick={() => {
									this.setState({ makeUsBetter: true })
								}}
							>
								Something New!
							</Button>
							<Button
								className={classes.right}
								variant="outlined"
								color="primary"
								onClick={() => {
									this.setState({ feed: true })
								}}
							>
								Make Us Better!
							</Button>
						</Hid>
						<IconButton className={classes.notify}>
							<Badge badgeContent={this.props.cart} color="error">
								<Notifications />
							</Badge>
						</IconButton>
						<span onClick={this.handleClick}>
							<HeaderAvatar anchor={anchorEl} />
						</span>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							open={Boolean(anchorEl)}
							onClose={this.handleClose}
						>
							<MenuItem
								onClick={() => {
									this.handleClose()
									this.props.history.push('/profile')
								}}
							>
								Profile
							</MenuItem>
							<MenuItem
								onClick={() => {
									firebase.auth().signOut()
									this.props.history.push('/welcome/login')
								}}
							>
								Logout
							</MenuItem>
						</Menu>
					</Toolbar>
				</AppBar>
				<NavTabs path={this.state.tabs.indexOf(this.props.location.pathname)} />
				<Drawer
					anchor="right"
					open={this.state.makeUsBetter}
					onClose={() => {
						this.setState({ makeUsBetter: false })
					}}
				>
					<div style={{ width: '20rem' }}></div>
				</Drawer>
				<MakeUsBetter
					open={this.state.feed}
					handleClose={() => this.setState({ feed: false })}
				/>
			</div>
		)
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Header))
