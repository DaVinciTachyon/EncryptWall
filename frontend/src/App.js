import React from 'react';
import './App.css';
import Wall from './components/Wall';
import Toolbar from './components/Toolbar';
import Register from './components/Register';
import Login from './components/Login';
import Groups from './components/Groups';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div>
				<Toolbar />
				<div className="main">
					<Switch>
						<Route path="/" exact component={Wall} />
						<Route path="/register" exact component={Register} />
						<Route path="/login" exact component={Login} />
						<Route path="/groups" exact component={Groups} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
