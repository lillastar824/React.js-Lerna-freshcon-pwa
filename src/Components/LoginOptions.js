import React from 'react'
import Button from '@material-ui/core/Button'

const styles = {
	buttonsDiv: {
		textAlign: 'center',
		padding: 10,
	},
	btcolor: {
		color: 'white',
		fontWeight: 'bold',
	},
}

const SocialMediaLogin = props => {
	return (
		<div style={styles.buttonsDiv}>
			<Button variant="text" style={styles.btcolor}>
				Forgot Password
			</Button>
		</div>
	)
}

export default SocialMediaLogin
