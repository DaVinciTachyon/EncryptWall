import React from 'react';
import Post from './Post';
import NewPost from './NewPost';

export default class Wall extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: []
		};
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		const response = await fetch('http://localhost:8080/posts', requestOptions);
		const data = await response.json();
		this.setState({ posts: data.posts });
	}

	addPosts = () => {
		let postDisplay = [];

		this.state.posts.sort((a, b) => {
			const a_date = new Date(a.date_added);
			const b_date = new Date(b.date_added);
			return b_date.getTime() - a_date.getTime();
		});
		this.state.posts.forEach((elem) => {
			postDisplay.push(<Post key={elem._id} title={elem.title} content={elem.content} time={elem.date_added} />);
		});

		return postDisplay;
	};

	render() {
		return (
			<div>
				<NewPost />
				{this.addPosts()}
			</div>
		);
	}
}
