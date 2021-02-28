import React from 'react'
import { Slide } from '@material-ui/core'
import * as yup from 'yup'

const schema = yup.object().shape({
	name: yup.string().required(),
	image: yup.object().nullable(),
	price: yup
		.number()
		.positive()
		.moreThan(0)
		.required(),
	metric: yup
		.number()
		.positive()
		.moreThan(0)
		.required(),
	category: yup
		.number()
		.positive()
		.moreThan(0)
		.required(),
	description: yup.string().required(),
	facts: yup.string(),
	discount: yup
		.number()
		.min(0)
		.max(100)
		.required(),
})

function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
}
const capitalize = s => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}
export { Transition, capitalize, schema }
