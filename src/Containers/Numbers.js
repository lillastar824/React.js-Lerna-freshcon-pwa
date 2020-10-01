import { Toolbar, Typography, Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { VictoryLine } from 'victory'
import UnderConstruction from '../Components/UnderConstruction'
const styles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	tool: {
		backgroundColor: '#F9E957',
	},
}))

function Numbers() {
	const classes = styles()
	return (
		<Container>
			<UnderConstruction />
			<Paper className={classes.root}>
				<VictoryLine
					padding={10}
					height={70}
					style={{
						parent: {
							background: '#494949',
						},
						data: {
							stroke: '#607c43',
							strokeWidth: 0.5,
						},
					}}
					data={Array.from({ length: 40 }, () => ({
						x: Math.floor(Math.random() * 10),
						y: Math.floor(Math.random() * 40),
					}))}
				/>

				<Toolbar className={classes.tool}>
					<Typography variant="h6" className={classes.title}>
						My Revenue
					</Typography>
				</Toolbar>
				{/* <MyComponent /> */}
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">previous</TableCell>
							<TableCell align="right" />
							<TableCell align="right">Current</TableCell>
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					{/* <TableBody>
						{revenue.map(row => {
							return (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.previousRev}</TableCell>
									<TableCell align="right">
										{(
											((row.currentRev - row.previousRev) / row.previousRev) *
											100
										).toFixed(2)}
										%
									</TableCell>
									<TableCell align="right">{row.currentRev}</TableCell>
									<TableCell align="right">
										<VictoryLine
											padding={0}
											height={20}
											style={{
												data: {
													stroke: '#EF6C00',
													strokeWidth: 0.3,
												},
											}}
											data={Array.from({ length: 40 }, () => ({
												x: Math.floor(Math.random() * 10),
												y: Math.floor(Math.random() * 40),
											}))}
										/>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody> */}
				</Table>
			</Paper>
		</Container>
	)
}

export default Numbers
