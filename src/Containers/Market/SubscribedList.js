import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import {
	Paper,
	Button,
	Toolbar,
	makeStyles,
	Tabs,
	withStyles,
	Tab,
	Badge,
} from '@material-ui/core'
import { marketContext } from './context'
import { dialogContext } from './dialog'
import SvgManageMyItems from '../../Components/ManageMyItems'

const styles = makeStyles({
	marketTool: {
		backgroundColor: '#7CB342',
	},
	white: {
		position: 'absolute',
		right: 0,
		backgroundColor: '#FFFFFF',
		color: '#7CB342',
		marginRight: '1em',
	},
	marketHead: {
		width: '100%',
		overflowX: 'auto',
	},
	title: {
		color: 'white',
		fontWeight: 'bolder',
		width: '100%',
		overflow: 'visible',
	},
})
const VerticalTabs = withStyles(theme => ({
	flexContainer: {
		flexDirection: 'column',
	},
	indicator: {
		display: 'none',
	},
}))(Tabs)
const MyTab = withStyles(theme => ({
	wrapper: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row-reverse',
		justifyContent: 'space-evenly',
	},
	selected: {
		color: '#EF6C00',
		borderLeft: '4px solid #EF6C00',
	},
	textColorInherit: {
		fontWeight: '	',
	},
}))(Tab)

function SubscribedList() {
	const { open } = useContext(dialogContext)
	const { subs, market, set } = useContext(marketContext)
	let current = false
	if (market) current = subs.findIndex(m => m.ref.id === market.ref.id)
	const classes = styles()
	return (
		<Paper className={classes.marketHead}>
			<Toolbar className={classes.marketTool}>
				<Typography variant="subtitle2" className={classes.title} noWrap>
					My Markets
				</Typography>
				<Button className={classes.white} size="small" onClick={open}>
					<Typography variant="caption">+ Add</Typography>
				</Button>
			</Toolbar>
			<VerticalTabs
				variant="fullWidth"
				value={current}
				onChange={(_, index) => {
					set(subs[index])
				}}
			>
				{subs.map(market => (
					<MyTab
						key={market.ref.id}
						label={market.name}
						icon={
							<Badge badgeContent={market.incomplete} color="primary">
								<SvgManageMyItems />
							</Badge>
						}
					/>
				))}
			</VerticalTabs>
		</Paper>
	)
}

export default SubscribedList
