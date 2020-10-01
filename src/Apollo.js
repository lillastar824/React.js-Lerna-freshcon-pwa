import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import firebase from '@firebase/app'

let client = new ApolloClient({
	cache: new InMemoryCache(),
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.forEach(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				)
			if (networkError) console.log(`[Network error]: ${networkError}`)
		}),
		setContext(request => {
			let user = firebase.auth().currentUser
			return user.getIdToken(true).then(token => {
				return {
					headers: {
						type: 'farmer',
						token,
					},
				}
			})
		}),
		new HttpLink({
			uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
			credentials: 'same-origin',
		}),
	]),
})

export default client
