import React from 'react';
import './Main.css';

export default class Post extends React.Component {
	render() {
		return (
			<div className="card">
				<h1 id="postTitle">{this.props.title}</h1>
				<p id="postContent">{this.props.content}</p>
				<p id="postTime">{this.props.time}</p>
			</div>
		);
	}
}
