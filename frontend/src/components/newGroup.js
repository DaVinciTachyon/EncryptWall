import React from 'react';
import './Main.css';

export default class NewGroup extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			error: ''
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dismissError = this.dismissError.bind(this);
	}

	async handleSubmit(evt) {
		evt.preventDefault();
		if (!this.state.name) return this.setState({ error: 'Name is required' });
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				name: this.state.name
			})
		};
		await fetch('http://localhost:8080/group', requestOptions);
		window.location.reload(false);
		return this.setState({ error: '' });
	}

	handleNameChange(evt) {
		this.setState({
			name: evt.target.value
		});
	}

	dismissError() {
		this.setState({ error: '' });
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="newCard card">
				{this.state.error && (
					<h3 data-test="error" onClick={this.dismissError}>
						<button onClick={this.dismissError}>✖</button>
						{this.state.error}
					</h3>
				)}
				<div className="center">
					<input
						id="name"
						className="formElement"
						type="text"
						value={this.state.name}
						onChange={this.handleNameChange}
						placeholder="Name"
					/>
				</div>
				<div className="center">
					<input className="primaryButton formElement" type="submit" value="Add Group" />
				</div>
			</form>
		);
	}
}
