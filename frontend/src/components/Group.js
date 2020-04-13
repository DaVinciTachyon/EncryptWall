import React from 'react';
import './Main.css';

export default class Group extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			error: ''
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.addGroup = this.addGroup.bind(this);
		this.dismissError = this.dismissError.bind(this);
	}

	async addGroup(evt) {
		evt.preventDefault();
		if (!this.state.email) return this.setState({ error: 'Email is required' });
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				id: this.props.id,
				email: this.state.email
			})
		};
		await fetch('http://localhost:8080/myGroups/add', requestOptions);
		this.setState({ email: '' });
		return this.setState({ error: '' });
	}

	removeGroup = async () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				id: this.props.id
			})
		};
		await fetch('http://localhost:8080/myGroups/remove', requestOptions);
	};

	handleEmailChange(evt) {
		this.setState({
			email: evt.target.value
		});
	}

	dismissError() {
		this.setState({ error: '' });
	}

	render() {
		return (
			<div className="card">
				<div id="groupName" className="center">
					{this.props.name}
				</div>
				<form className="center" onSubmit={this.addGroup}>
					{this.state.error && (
						<h3 data-test="error" onClick={this.dismissError}>
							<button onClick={this.dismissError}>✖</button>
							{this.state.error}
						</h3>
					)}
					<input
						id="email"
						className="formElement"
						type="text"
						value={this.state.email}
						onChange={this.handleEmailChange}
						placeholder="Email"
					/>
					<input className="primaryButton formElement" type="submit" value="Add User" />
				</form>
				<div className="center">
					<button className="formElement" onClick={this.removeGroup}>
						Leave Group
					</button>
				</div>
			</div>
		);
	}
}
