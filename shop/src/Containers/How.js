import React from 'react'
import styles from './login.module.css'
function How() {
	return (
		<>
			<section className="section" style={{ backgroundColor: '#7CB342' }}>
				<div className={`${styles.pdfsec} columns`}>
					<div className="column is-one-third has-text-centered">
						<img
							src="./EricandSuziwe.svg"
							style={{ height: '20em', objectFit: 'contain' }}
							alt="eric"
						/>
					</div>
					<div className="column auto">
						<h1
							className="has-text-left"
							style={{ marginBottom: '1em', fontSize: '2em', color: '#FFFFFF' }}
						>
							Home with the kids?
						</h1>
						<p
							className="has-text-left"
							style={{
								marginBottom: '1em',
								fontSize: '1.7em',
								color: '#FFFFFF',
							}}
						>
							Solve The Case of the Missing Groceries with Freshconn's
							Adventures of Eric and Suzie children's book & cookbook for a fun
							afternoon of reading, laughing and cooking a nutritious lunch with
							your kids.
						</p>
						<form method="get" action="case.pdf">
							<button
								className={`${styles.loginfield} button`}
								type="submit"
								style={{
									borderRadius: '5px',
									backgroundColor: '#EF6C00',
									color: 'white',
									border: 'none',
									marginBottom: '1em',
								}}
							>
								DOWNLOAD FREE eBOOK NOW
							</button>
						</form>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<h1 className="title" style={{ color: '#7CB342' }}>
						How Freshconn Works
					</h1>
					<h1 className="subtitle">
						FreshConn delivers never warehoused locally-sourced
						<br /> food from farmers markets in your community
					</h1>
					<div className="columns">
						<div className="column has-text-centered">
							<figure className="image media">
								<img
									className="is-rounded"
									style={{ height: '35vh' }}
									src={`${process.env.PUBLIC_URL + '/Hand.svg'}`}
									alt="sample"
								/>
							</figure>
							<p
								className="subtitle"
								style={{ color: '#757575', paddingTop: '5vh' }}
							>
								Order farm fresh food
							</p>
						</div>
						<div className="column has-text-centered">
							<figure className="media image">
								<img
									className="is-rounded"
									style={{ height: '35vh' }}
									src={`${process.env.PUBLIC_URL + '/Car.svg'}`}
									alt="sample"
								/>
							</figure>
							<p
								className="subtitle"
								style={{ color: '#757575', paddingTop: '5vh' }}
							>
								We pick-up your order from farmers markets
							</p>
						</div>
						<div className="column has-text-centered">
							<figure className="media image">
								<img
									className="is-rounded"
									style={{ height: '35vh' }}
									src={`${process.env.PUBLIC_URL + '/Box.svg'}`}
									alt="sample"
								/>
							</figure>
							<p
								className="subtitle"
								style={{ color: '#757575', paddingTop: '5vh' }}
							>
								Get your local groceries delivered to your door
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="section" style={{ backgroundColor: '#1ABDD4' }}>
				<h1
					className="title has-text-centered"
					style={{ margin: '1em', fontSize: '2em', color: '#FFFFFF' }}
				>
					Going beyond delivery
				</h1>
			</section>
			<section className="section">
				<div className="container">
					<div className="columns">
						<div className="column has-text-centered">
							<figure className="image media">
								<img
									className="is-rounded"
									style={{ height: '15vh' }}
									src={`${process.env.PUBLIC_URL + '/Access.svg'}`}
									alt="sample"
								/>
							</figure>
							<p
								className="subtitle has-text-weight-bold"
								style={{ color: '#757575', paddingTop: '5vh' }}
							>
								Access
							</p>
							<p>
								Our marketplace is providing access to local food for people
								within food desserts, inner cities, and those who lack
								transportation to purchase local food
							</p>
						</div>
						<div className="column has-text-centered">
							<figure className="media image">
								<img
									className="is-rounded"
									style={{ height: '15vh' }}
									src={`${process.env.PUBLIC_URL + '/Education.svg'}`}
									alt="sample"
								/>
							</figure>
							<p
								className="subtitle has-text-weight-bold"
								style={{ color: '#757575', paddingTop: '5vh' }}
							>
								Education
							</p>
							<p>
								With every purchase, you are furthering our efforts to connect
								people with their food through nutrition education and our how
								to cooking show for the everyday chef
							</p>
						</div>
						<div className="column has-text-centered">
							<figure className="media image">
								<img
									className="is-rounded"
									style={{ height: '15vh' }}
									src={`${process.env.PUBLIC_URL + '/OutReach.svg'}`}
									alt="sample"
								/>
							</figure>
							<p
								className="subtitle has-text-weight-bold"
								style={{ color: '#757575', paddingTop: '5vh' }}
							>
								Outreach
							</p>
							<p>
								Our Pound for Pound initiative and gleaning program delivers
								healthy, local food to those in need
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="section" style={{ backgroundColor: '#F06D02' }}>
				<div className={`${styles.subscribe} field`}>
					<h1
						className="title has-text-weight-light"
						style={{ color: '#FFFFFF' }}
					>
						Subscribe to newsletter
					</h1>
					<input
						className={`${styles.loginfield} input`}
						style={{ borderRadius: '15px' }}
						id="Email"
						type="email"
						placeholder="Email"
					/>
					<button
						className={`${styles.loginfield} button has-text-weight-semibold`}
						type="submit"
						value="Submit"
						style={{
							borderRadius: '10px',
							backgroundColor: '#7CB342',
							color: 'white',
							border: 'none',
						}}
					>
						SUBSCRIBE
					</button>
				</div>
			</section>
			<section className="section " style={{ backgroundColor: '#7CB342' }}>
				<img src="/Logo.svg" style={{ height: '6vh' }} alt="sample" />
				<p className="has-text-white">(401) 594-9428 </p>
				<p className="has-text-white">hellofreshconn@gmail.com </p>
				<p className="has-text-white">Providence, RI</p>
			</section>
		</>
	)
}

export default How
