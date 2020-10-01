import { Avatar } from '@material-ui/core'
import firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'
function HeaderAvatar(props) {
	const [image, load] = useState(false)
	useEffect(() => {
		async function get() {
			const { uid } = firebase.auth().currentUser
			let fsnap = await firebase
				.firestore()
				.collection('farmers')
				.doc(uid)
				.get()
			let { image } = fsnap.data()
			firebase
				.storage()
				.ref()
				.child(
					`farmers/thumbnails/${image
						.split('.')
						.slice(0, -1)
						.join('.')}_200x200.jpg`
				)
				.getDownloadURL()
				.then(url => fetch(url))
				.then(res => res.blob())
				.then(blob => {
					const url = window.URL.createObjectURL(blob)
					load(url)
				})
		}

		get()
	}, [])
	if (image)
		return (
			<Avatar
				aria-owns={props.anchor ? 'simple-menu' : undefined}
				aria-haspopup="true"
				alt="Profile"
				src={image}
			/>
		)
	else
		return (
			<ContentLoader
				animate={false}
				speed={2}
				width={40}
				height={40}
				viewBox="0 0 40 40"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<circle cx="20" cy="20" r="20" />
			</ContentLoader>
		)
}

export default HeaderAvatar
