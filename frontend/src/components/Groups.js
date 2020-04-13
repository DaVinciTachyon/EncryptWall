import React from 'react';
import Group from './Group';
import NewGroup from './newGroup';

export default class Groups extends React.Component {
	constructor() {
		super();
		this.state = {
			groups: []
		};
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		const response = await fetch('http://localhost:8080/myGroups', requestOptions);
		const data = await response.json();
		data.groups = data.groups.map((elem) => [
			elem._id,
			elem.name
		]);
		this.setState({ groups: data.groups });
	}

	addGroups = () => {
		let groupDisplay = [];

		this.state.groups.forEach((elem) => {
			groupDisplay.push(<Group key={elem[0]} id={elem[0]} name={elem[1]} />);
		});

		return groupDisplay;
	};

	render() {
		return (
			<div>
				<NewGroup />
				{this.addGroups()}
			</div>
		);
	}
}
