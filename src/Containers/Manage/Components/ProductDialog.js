import {
	AppBar,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Toolbar,
	Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close as CloseIcon } from '@material-ui/icons'
import firebase from 'firebase/app'
import { Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { dialogContext } from '../context'
import { addProduct, updateProduct } from '../functions'
import ProductForm from './ProductForm'
import { schema } from './utils'
import { useSnackbar } from 'notistack'
const styles = makeStyles(theme => ({
	appBar: {
		color: '#616161',
		backgroundColor: '#F9E957',
	},
	grow: {
		flexGrow: 1,
	},
}))

function ProductDialog({ open }) {
	const [markets, setMarkets] = useState([])
	const [pricing, setPricing] = useState({ dynamic: false, markets: [] })
	const snackbar = useSnackbar()
	const {
		view: { type, product, state },
		display,
	} = useContext(dialogContext)
	const classes = styles()
	let initial = {}
	if (!product)
		initial = {
			name: '',
			category: 0,
			metric: 0,
			average: 0,
			price: '',
			image: '',
			description: '',
			facts: '',
			discount: 0,
		}
	else initial = { ...product, image: { name: product.image } }
	useEffect(() => {
		const { uid } = firebase.auth().currentUser
		let dynamicUnsub = () => {}
		let cancelled = false
		firebase
			.firestore()
			.collection('farmers')
			.doc(uid)
			.collection('subscribed')
			.where('status', '==', true)
			.get()
			.then(snap => {
				if (!cancelled)
					setMarkets(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
			})
		if (product)
			dynamicUnsub = firebase
				.firestore()
				.collection('farmers')
				.doc(uid)
				.collection('products')
				.doc(product.id)
				.collection('dynamic')
				.onSnapshot(snap => {
					if (!snap.empty && !cancelled)
						setPricing({
							dynamic: true,
							markets: snap.docs.map(doc => doc.data()),
						})
				})
		return async () => {
			cancelled = true
			dynamicUnsub()
			display(null)
		}
	}, [product, display])
	function handleClose() {
		display({ id: 0, state: false })
	}
	return (
		<Dialog fullScreen open={state} onClose={handleClose}>
			<DialogTitle>
				<AppBar className={classes.appBar} position="relative">
					<Toolbar>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							{type === 'edit' ? 'Edit a item' : 'Adding a new item'}{' '}
						</Typography>
						<IconButton
							color="inherit"
							aria-label="Close"
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{ ...initial }}
					validationSchema={schema}
					onSubmit={async (values, action) => {
						if (type === 'add') {
							await addProduct({ product: values, pricing, markets })
							snackbar.enqueueSnackbar('Product Added', { variant: 'success' })
						}
						if (type === 'edit') {
							await updateProduct({
								id: product.id,
								product: values,
								pricing,
								markets,
							})
							snackbar.enqueueSnackbar('Product Added', { variant: 'success' })
						}
						// await handleProduct(values)
						action.setSubmitting(false)
						handleClose()
					}}
				>
					{props => (
						<ProductForm
							pricing={pricing}
							setPricing={setPricing}
							markets={markets}
							product={product}
							{...props}
						/>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}

export default ProductDialog
