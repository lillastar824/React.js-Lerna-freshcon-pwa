import { categories, metrics } from '@greenery/all'
import {
	Avatar,
	Chip,
	FilledInput,
	FormGroup,
	Grid,
	InputAdornment,
	MenuItem,
	TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Form } from 'formik'
import React from 'react'
import { ConfirmButton } from './ConfirmButton'
import { DynamicPricing } from './DynamicPricing'
import { ProductImage } from './ProductImage'

export const styles = makeStyles(theme => ({
	container: {
		margin: '1.5rem',
	},
	chip: {
		backgroundColor: '#FFFFFF',
		color: 'black',
	},
	imagegroup: {
		marginLeft: '1em',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		backgroundColor: '#7CB342',
	},
	file: {
		visibility: 'hidden',
	},
}))
function ProductForm({
	product,
	markets,
	values,
	errors,
	handleChange,
	setFieldValue,
	isSubmitting,
	isValid,
	pricing,
	setPricing,
	type,
	...props
	/* and other goodies */
}) {
	const classes = styles()
	return (
		<Form className={classes.container}>
			<Grid container spacing={2} justify="space-between">
				<Grid item xs={8}>
					<Chip
						avatar={<Avatar className={classes.avatar}>1</Avatar>}
						label="Add your item details below."
						className={classes.chip}
						color="primary"
					/>

					<FormGroup>
						<Grid container justify="space-between">
							<TextField
								fullWidth
								error={errors.name ? true : false}
								value={values.name}
								id="name"
								margin="normal"
								label="Product Name"
								variant="outlined"
								onChange={handleChange}
								required={true}
							/>
						</Grid>

						<Grid
							container
							spacing={2}
							justify="space-between"
							alignContent="center"
						>
							<Grid item xs>
								<TextField
									select
									margin="normal"
									label="Category"
									variant="outlined"
									error={errors.category ? true : false}
									value={values.category}
									name="category"
									onChange={handleChange}
									fullWidth
								>
									<MenuItem value={0}>
										<em>None</em>
									</MenuItem>
									{categories.map(category => (
										<MenuItem key={category.id} value={category.id}>
											{category.name}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs>
								<TextField
									error={errors.metric ? true : false}
									select
									margin="normal"
									label="Metric"
									name="metric"
									value={values.metric}
									variant="outlined"
									onChange={handleChange}
									fullWidth
								>
									<MenuItem value={0}>
										<em>None</em>
									</MenuItem>
									{metrics.map(metric => (
										<MenuItem key={metric.id} value={metric.id}>
											{metric.name + ' - ' + metric.unit}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs>
								<TextField
									fullWidth
									error={errors.price ? true : false}
									id="price"
									value={values.price}
									onChange={handleChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												{values.metric - 1 > 0 &&
													metrics[values.metric - 1].unit}
											</InputAdornment>
										),
									}}
									type="number"
									margin="normal"
									label="Price"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs>
								<TextField
									fullWidth
									error={errors.discount ? true : false}
									id="discount"
									value={values.discount}
									onChange={handleChange}
									type="number"
									margin="normal"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">%</InputAdornment>
										),
									}}
									label="Discount"
									placeholder={'discound in %'}
									variant="outlined"
								/>
							</Grid>
						</Grid>
						<DynamicPricing
							values={values}
							pricing={pricing}
							setPricing={setPricing}
							markets={markets}
						/>
						<TextField
							error={errors.description ? true : false}
							label="Product Description"
							value={values.description}
							input={<FilledInput id="description" />}
							onChange={handleChange}
							name="description"
							multiline
							rows="4"
							className={classes.textField}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							error={errors.facts ? true : false}
							label="Nutritional Facts"
							value={values.facts}
							input={<FilledInput id="facts" />}
							onChange={handleChange}
							name="facts"
							multiline
							rows="4"
							className={classes.textField}
							margin="normal"
							variant="outlined"
						/>
					</FormGroup>
				</Grid>
				<ProductImage
					values={values}
					setFieldValue={setFieldValue}
					errors={errors}
				/>
			</Grid>
			<ConfirmButton loading={isSubmitting} valid={isValid} />
		</Form>
	)
}

export default ProductForm
