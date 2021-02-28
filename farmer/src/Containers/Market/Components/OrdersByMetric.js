import React from 'react'
import {
	Grid,
	Table,
	TableRow,
	TableCell,
	TableBody,
	TableHead,
	Chip,
} from '@material-ui/core'
import metrics from '@greenery/all/lib/utils/metrics'
import { getPrice } from '../../../utils'
import { Image } from '../../Manage/Components/Image'
import { makeStyles } from '@material-ui/styles'

const styles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '5em',
		padding: '0 1em',
	},
}))
function OrdersByMetric(props) {
	let products = new Map()
	for (let order of props.orders) {
		for (let item of order.items) {
			let temp = {
				...item,
				actual: item.actual,
				qty: item.qty,
				total: item.actual * item.price,
			}
			if (products.has(item.id)) {
				let has = products.get(item.id)
				products.set(item.id, {
					...has,
					qty: has.qty + item.qty,
					actual: has.actual + item.actual,
					total: has.total + item.actual * item.price,
				})
			} else {
				products.set(item.id, temp)
			}
		}
	}
	const classes = styles()
	return (
		<Grid container direction="column">
			<Grid
				container
				justify="space-between"
				alignItems="center"
				classes={{
					root: classes.root,
				}}
			>
				<Grid item>
					<Chip color="secondary" size="small" label="New Orders" />
				</Grid>
			</Grid>
			<Grid item>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Product Name</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Order Metric</TableCell>
							<TableCell>Actual Metric</TableCell>
							<TableCell>Revenue Earned</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.from(products.values()).map(product => (
							<TableRow key={product.id}>
								<TableCell>
									<Image
										type="product"
										size="200x200"
										alt={product.name}
										image={product.image}
									/>
								</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>
									{getPrice(product.price) + metrics[product.metric - 1].unit}
								</TableCell>
								<TableCell>
									{product.qty + metrics[product.metric - 1].unit}
								</TableCell>
								<TableCell>
									{product.actual + metrics[product.metric - 1].unit}
								</TableCell>
								<TableCell>{getPrice(product.total)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Grid>
		</Grid>
	)
}

export default OrdersByMetric
