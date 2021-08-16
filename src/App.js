import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Feed from './components/Body/Feed/Feed';
import Sidebar from './components/Body/Sidebar/Sidebar';
import Widgets from './components/Body/Widget/Widgets';
import Header from './components/Header/Header';
import Signup from './components/Login/Signup';
import LoginHome from './components/Login/LoginHome';
import Register from './components/Login/Register';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Signin from './components/Login/Signin';

function App() {

	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged(userAuth => {
			if (userAuth) {
				// user is logged in
				dispatch(login({
					email: userAuth.email,
					uid: userAuth.uid,
					displayName: userAuth.displayName,
					photoUrl: userAuth.photoURL,
				}))
			} else {
				// user is logged out
				dispatch(logout());
			}
		})
	}, [dispatch]);

	return (
		<div className="app" data-theme={darkMode ? "dark" : ""}>
			<Router>

				{!user ? (
					<>
						<Switch>
							<Route path="/" component={LoginHome} exact />
							<Route path="/signup" exact component={Signup} />
							<Route path="/signin" component={Signin} />
							<Route path="/signup/user" component={Register} />
						</Switch>
					</>
				) : (
					<>
						<Header ToggleMode={setDarkMode} />
						<div className="app_body">
							<Sidebar />
							<Feed />
							<Widgets />
						</div>
					</>
				)}
			</Router>

		</div>
	);
}

export default App;
