import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { useHistory } from 'react-router-dom'

const mutation = gql`
	mutation($acc: String, $farmer: String) {
		stripeComplete(farmer: $farmer, acc: $acc) {
			result
		}
	}
`

function Load({ complete }) {
	let [load, set] = useState(true)
	useEffect(() => {
		if (load) {
			complete()
			set(false)
		}
	}, [complete, load])
	return <div />
}
function StripeLoad({ acc, farmer }) {
	let history = useHistory()
	const [stripeComplete] = useMutation(mutation)
	return (
		<Load
			complete={() =>
				stripeComplete({
					variables: {
						acc,
						farmer,
					},
				}).then(dat => {
					console.log(dat)
					history.push('/profile')
					window.location.reload()
				})
			}
		/>
	)
}

export default StripeLoad
