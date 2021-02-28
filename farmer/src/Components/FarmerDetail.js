import React from 'react'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid } from '@material-ui/core'

const ACC_BAL = gql`
	query balance($id: String) {
		getBalance(acc: $id) {
			available
			pending
		}
	}
`

function Stripe({ id }) {
	const { loading, error, data } = useQuery(ACC_BAL, { variables: { id } })
	if (loading) return <div>Loading..</div>
	if (error) return <div> Error</div>
	let balance = data.getBalance
	return (
		<Grid container spacing={2} justify="space-between">
			<Grid item>
				<div>
					<h5>Funds Tranfered</h5>
					<h1>{balance.available}</h1>
				</div>
			</Grid>
			<Grid item>
				<div>
					<h5>Yet to Payout</h5>
					<h1>{balance.pending}</h1>
				</div>
			</Grid>
		</Grid>
	)
}

export default Stripe
