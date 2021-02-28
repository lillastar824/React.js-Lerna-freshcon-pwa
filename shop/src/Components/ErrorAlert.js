import React from 'react'

const ErrorAlert = props => {
	return (
		<div className="has-text-white" role="alert">
			{props.children}
		</div>
	)
}

export default ErrorAlert
