import { CircularProgress } from '@material-ui/core'
import firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
export function ImageView({ image, type, change }) {
	const [img, set] = useState(null)
	useEffect(() => {
		let cancel = false
		if (image) {
			if (typeof image === 'object') {
				const { name, blob } = image
				const url = window.URL.createObjectURL(blob)
				if (!cancel) set({ url, name })
			} else
				firebase
					.storage()
					.ref()
					.child(`${type}s/${image}`)
					.getDownloadURL()
					.then(url => fetch(url))
					.then(res => res.blob())
					.then(blob => {
						const url = window.URL.createObjectURL(blob)
						if (!cancel) {
							set({ name: image, url })
							change({ name: image, blob })
						}
					})
					.catch(e => {
						console.log(e)
					})
		}
		return () => {
			cancel = true
		}
	}, [image, type, change])
	if (img)
		return (
			<img
				src={img.url}
				alt="logo"
				width="340"
				height="400"
				style={{
					objectFit: 'contain',
				}}
			/>
		)
	return <CircularProgress />
}
