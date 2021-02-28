import React, { useContext } from 'react'
import {
	Grid,
	Chip,
	FormControl,
	Avatar,
	FormGroup,
	Button,
} from '@material-ui/core'
import Thumbnail from './Thumbnail'
import { dialogContext } from '../context'
import { styles } from './ProductForm'
import StockSearch from './StockSearch'
export function ProductImage({ values, setFieldValue, errors }) {
	const {
		view: { type },
	} = useContext(dialogContext)
	const classes = styles()
	return (
		<Grid item xs={3} container direction="column" alignItems="center">
			<Chip
				avatar={<Avatar className={classes.avatar}>2</Avatar>}
				label={"Search for an item's image in the search box below. "}
				className={classes.chip}
				color="primary"
			/>

			<StockSearch
				name={values.name}
				change={image => {
					setFieldValue('image', {
						name: image.name,
						blob: image.blob,
					})
				}}
				type={type}
			/>
			<div style={{ marginTop: '18px' }}>
				<Thumbnail
					image={values.image}
					name={values.name}
					type={type}
					changeImage={image => {
						setFieldValue('image', image)
					}}
				/>
			</div>
			<p style={{ color: '#EF6C00', textAlign: 'center' }}>
				Dont see the image you need? Let us know by sending a message through
				the Make us Better button
			</p>
			<FormGroup className={classes.imagegroup}>
				<FormControl
					margin="normal"
					variant="filled"
					className={classes.formControl}
					error={errors.image ? true : false}
				>
					<label htmlFor="image">
						<Button className={classes.bt} component="span" variant="contained">
							+ Upload a different image
						</Button>
					</label>
					<input
						type="file"
						accept="image/*"
						id="image"
						className={classes.file}
						onChange={async e => {
							let name = e.currentTarget.files[0].name
							const response = new Response(e.currentTarget.files[0])
							let blob = await response.blob()
							setFieldValue('image', {
								name: name,
								blob,
							})
						}}
					/>
				</FormControl>
			</FormGroup>
		</Grid>
	)
}
