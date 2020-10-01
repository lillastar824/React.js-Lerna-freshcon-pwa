import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import SubscribedOrders from '../src/Components/SubscribedOrdersView'
import faker from 'faker'

import ProductDialog from '../src/Containers/Manage/Components/ProductDialog'
import Inventory from '../src/Containers/Manage/Components/Inventory'
import ProductRow from '../src/Containers/Manage/Components/ProductRow'
import DeleteConfirmation from '../src/Containers/Manage/Components/DeleteConfirmation'
import OrderByCustomer from '../src/Containers/Market/Components/OrderByCustomer'
import { MockedProvider } from '@apollo/react-testing'
import { orders } from './data'
import {
	UPDATE_ORDER,
	UPDATE_ORDER_ITEM,
} from '../src/Containers/Market/Components/query'
/*@apollo/react-testing
	product={{category: 7,
description: "Fresh Apple",
facts: "Highly Nutricious",
image: "fin.jpg",
metric: 8,
name: "Apple",
price: 2.21}}
*/
const stories = storiesOf('Subscribed Orders', module)
stories.add('HeadView', () => (
	<SubscribedOrders
		marketName={faker.company.companyName()}
		incompleteOrders={Math.random() * 10}
		revenue={faker.commerce.price()}
	/>
))
stories.add('Order By Customer', () => (
	<MockedProvider
		mocks={[
			{
				request: {
					query: UPDATE_ORDER,
					variables: {
						id: 'mXC3123a',
					},
				},
				result: {
					data: {
						result: 'success',
						stamp: Date.now(),
					},
				},
			},
			{
				request: {
					query: UPDATE_ORDER_ITEM,
					variables: {
						input: {
							id: 'mXC32123a',
							product: 'OP5n123',
							qty: 2,
						},
					},
				},
				result: {
					data: {
						result: 'success',
					},
				},
			},
		]}
		addTypename={false}
	>
		<OrderByCustomer orders={orders} />
	</MockedProvider>
))

storiesOf('Manage Products', module)
	.add('Product Dialog (Add)', () => (
		<ProductDialog
			open={true}
			type={'ADD'}
			handeClose={() => {}}
			subMarkets={[
				{
					id: 'BIY7wH4iIcbAXQkPXWdl',
					name: 'Hillandale Food Hub',
				},
				{
					id: 'CqJvWYCWFDmOyDZuU6wz',
					name: 'Cooks Valley',
				},
				{
					id: '12kj3kjandk2j3knklj1',
					name: 'Falk Valley',
				},
				{
					id: 'Znsdnk2n12kl3nnsdnj2',
					name: 'Super Farms',
				},
			]}
			handleProduct={action('product')}
		/>
	))
	.add('Product Dialog (Edit)', () => (
		<ProductDialog
			product={{
				category: {
					id: 7,
				},
				description: 'Fresh Apple',
				facts: 'Highly Nutricious',
				metric: {
					id: 8,
				},
				name: 'Apple',
				price: faker.commerce.price(),
				dynamic: true,
				average: faker.commerce.price(),
				pricing: [
					{
						marketId: 'BIY7wH4iIcbAXQkPXWdl',
						price: 2.24,
					},
				],
				image:
					'https://cdn-images-1.medium.com/max/1600/1*mvnbIIhL0Ji6cgoZuVQriA.png',
			}}
			open={true}
			type={'EDIT'}
			handeClose={() => {}}
			subMarkets={[
				{
					id: 'BIY7wH4iIcbAXQkPXWdl',
					name: 'Hillandale Food Hub',
				},
				{
					id: 'CqJvWYCWFDmOyDZuU6wz',
					name: 'Cooks Valley',
				},
				{
					id: '12kj3kjandk2j3knklj1',
					name: 'Falk Valley',
				},
				{
					id: 'Znsdnk2n12kl3nnsdnj2',
					name: 'Super Farms',
				},
			]}
			handleProduct={action('product')}
		/>
	))
	.add('Inventory Levels', () => (
		<Inventory
			open={true}
			enabled={true}
			handeClose={e => {
				console.log(e)
			}}
			handleChange={e => {
				console.log(e)
			}}
			inventory={{
				stock: 123,
				warning: 200,
				auto: true,
			}}
		/>
	))
	.add('Product Row', () => (
		<ProductRow
			product={{
				name: 'Name',
				price: faker.commerce.price(),
				inventory: {
					stock: 10,
				},
				metric: {
					unit: 'bunch',
				},
				average: faker.commerce.price(),
			}}
			handleProduct={action('product')}
		/>
	))
	.add('Delete Confirmation', () => (
		<DeleteConfirmation
			open={true}
			handeClose={e => console.log(e)}
			handleDelete={truth => e => console.log(truth)}
		/>
	))
