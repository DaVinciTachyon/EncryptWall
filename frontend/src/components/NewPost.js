import React from 'react';
import './Main.css';

export default class NewPost extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			content: '',
			group: '',
			my_groups: [],
			error: ''
		};

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.handleGroupChange = this.handleGroupChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dismissError = this.dismissError.bind(this);
	}

	async componentDidMount() {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		const response = await fetch('http://localhost:8080/myGroups', requestOptions);
		const data = await response.json();
		if (data.groups) {
			data.groups = data.groups.map((elem) => [
				elem._id,
				elem.name
			]);
			this.setState({ my_groups: data.groups });
		}
	}

	async handleSubmit(evt) {
		evt.preventDefault();
		if (!this.state.title) return this.setState({ error: 'Title is required' });
		if (!this.state.content) return this.setState({ error: 'Content is required' });
		if (!this.state.group) return this.setState({ error: 'Group is required' });
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				title: this.state.title,
				content: this.state.content,
				group: this.state.group
			})
		};
		await fetch('http://localhost:8080/post', requestOptions);
		window.location.reload(false);
		return this.setState({ error: '' });
	}

	handleTitleChange(evt) {
		this.setState({
			title: evt.target.value
		});
	}

	handleContentChange(evt) {
		this.setState({
			content: evt.target.value
		});
	}

	handleGroupChange(evt) {
		this.setState({
			group: evt.target.value
		});
	}

	dismissError() {
		this.setState({ error: '' });
	}

	addGroups = () => {
		let groupDisplay = [];

		this.state.my_groups.forEach((elem) => {
			groupDisplay.push(
				<option key={elem[0]} value={elem[0]}>
					{elem[1]}
				</option>
			);
		});

		return groupDisplay;
	};

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
						id="titleInput"
						className="formElement"
						type="text"
						value={this.state.title}
						onChange={this.handleTitleChange}
						placeholder="Title"
					/>
				</div>
				<div className="center">
					<textarea
						id="contentInput"
						className="formElement"
						type="text"
						value={this.state.content}
						onChange={this.handleContentChange}
						placeholder="Content"
					/>
				</div>
				<div className="center">
					<select id="groupInput" className="formElement" onChange={this.handleGroupChange}>
						<option value="">Choose a Group</option>
						{this.addGroups()}
					</select>
				</div>
				<div className="center">
					<input className="primaryButton formElement" type="submit" value="Post" />
				</div>
			</form>
		);
	}
}
