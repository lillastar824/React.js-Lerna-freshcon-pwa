import { Avatar } from '@material-ui/core'
import firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'
export function Image({ type, size, image }) {
	const [actual, load] = useState(null)
	useEffect(() => {
		async function getImage() {
			let cancel = false
			let ref = firebase
				.storage()
				.ref()
				.child(
					`${type === 'stock' ? type : type + 's'}/thumbnails/${image
						.split('.')
						.slice(0, -1)
						.join('.')}_${size}.${image
						.split('.')
						.pop()
						.toLowerCase()}`
				)
			let cond = true
			let url = null
			do {
				if (cond) {
					try {
						url = await ref.getDownloadURL()
						cond = false
					} catch (e) {
						// console.log(e)
					}
				} else break
			} while (cond === true)
			if (!cond) {
				let response = await fetch(url)
				let blob = await response.blob()

				if (!cancel) {
					load(window.URL.createObjectURL(blob))
				}
			}
			return () => {
				cancel = true
			}
		}
		let unsub = () => {}
		if (image) {
			getImage()
		}
		return () => {
			unsub()
		}
	}, [image, size, type])
	if (actual) return <Avatar src={actual} sizes={'80px, 80px'} />
	else
		return (
			<ContentLoader
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
