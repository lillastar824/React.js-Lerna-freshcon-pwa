import React, { useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import firebase from 'firebase/app'
import { Image } from './Image'
import { FixedSizeList } from 'react-window'

function ListContainer({ children, ...outerProps }, ref) {
	return (
		<div ref={ref}>
			<FixedSizeList
				itemData={children}
				height={300}
				width={'15em'}
				outerElementType={React.forwardRef((props, ref) => (
					<div ref={ref} {...props} {...outerProps} />
				))}
				itemCount={children.length}
				itemSize={50}
			>
				{({ data, index, style }) => {
					return React.cloneElement(data[index], {
						style,
					})
				}}
			</FixedSizeList>
		</div>
	)
}
async function searchStock(setImages) {
	let snap = await firebase
		.firestore()
		.collection('admin')
		.doc('images')
		.collection('stock')
		.get()

	setImages(snap.docs.map(d => d.data()))
}
function StockSearch({ name, change }) {
	const [open, setOpen] = React.useState(false)
	const [images, setImages] = useState([])
	useEffect(() => {
		searchStock(setImages)
	}, [])
	return (
		<Autocomplete
			style={{ width: '16em' }}
			open={open}
			onOpen={() => {
				setOpen(true)
			}}
			onClose={() => {
				setOpen(false)
			}}
			options={images}
			renderInput={params => (
				<TextField {...params} label="Search" fullWidth variant="outlined" />
			)}
			renderOption={option => (
				<>
					<Image type="stock" size="200x200" image={option.name} />
					{option.name}
				</>
			)}
			getOptionLabel={option => option.name}
			ListboxComponent={React.forwardRef(ListContainer)}
			onChange={(e, option) => {
				if (option)
					firebase
						.storage()
						.ref()
						.child(`stock/${option.name}`)
						.getDownloadURL()
						.then(url => fetch(url))
						.then(res => res.blob())
						.then(blob => change({ name: option.name, blob: blob }))
				else change({ name: '' })
			}}
		/>
	)
}
// getOptionLabel={option => option.name}
export default StockSearch
