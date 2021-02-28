import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

let client = null

function createClient(user) {
	client = new ApolloClient({
		cache: new InMemoryCache(),
		connectToDevTools: process.env.NODE_ENV === 'production' ? false : true,
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
			setContext((request) => {
				return user.getIdToken(true).then((token) => {
					return {
						headers: {
							type: 'users',
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
	return client
}

export { createClient }
export default client
