import { CircularProgress } from '@material-ui/core'
import firebase from 'firebase/app'
import React, { useState, useEffect } from 'react'
import { useDropArea } from 'react-use'
import './droparea.css'

async function getImage(name, set) {
	let storage = firebase.storage().ref()
	let ref = storage.child(`products/${name}`)
	let url = await ref.getDownloadURL()
	let response = await fetch(url)
	let blob = await response.blob()
	set({ name, blob })
}
const DragDrop = props => {
	const [bond] = useDropArea({
		onFiles: files => {
			props.change(files[0])
		},
	})

	return (
		<div className="drop-area" {...bond}>
			<div className="text">Drag & Drop </div>
		</div>
	)
}

function Thumbnail({ image, changeImage, type }) {
	const [preview, setPreview] = useState(null)
	useEffect(() => {
		if (image.blob) {
			const url = window.URL.createObjectURL(image.blob)
			setPreview({ url, blob: image.blob })
		} else {
			getImage(image.name, changeImage)
		}
	}, [image, changeImage])
	if (image.blob) {
		// }
		if (preview)
			return (
				<img height="250px" width="250px" alt={image.name} src={preview.url} />
			)
		else return <CircularProgress />
	} else {
		if (type === 'edit') {
			return <CircularProgress />
		} else if (!image.length) {
			return <DragDrop change={changeImage} />
		}
	}
}

export default Thumbnail
