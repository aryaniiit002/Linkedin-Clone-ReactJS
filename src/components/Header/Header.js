import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HeaderOption from './HeaderOption';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { logout } from '../../features/userSlice';

function Header(props) {

	const dispatch = useDispatch();
	const [darkMode, setDarkMode] = useState(false);

	const logoutOfApp = () => {
		dispatch(logout());
		auth.signOut();
		setTimeout(() => {
			window.location.reload(true);
		}, 1);
	}

	return (
		<div className="header">
			<div className="header__left">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png" alt="logos" />
				<div className="header__search">
					<SearchIcon />
					<input placeholder="Search" type="text" />
				</div>
			</div>
			<div className="header__right">
				<HeaderOption Icon={HomeIcon} title="Home" />
				<HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
				<HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
				<HeaderOption Icon={ChatIcon} title="Messaging" />
				<HeaderOption Icon={NotificationsIcon} title="Notification" />
				<HeaderOption
					avatar={true}
					title="Sign Out"
					onClick={logoutOfApp}
				/>
			</div>
			<button style={{ cursor: "pointer", backgroundColor: !darkMode ? "#3F3F3F" : "", color: !darkMode ? "#fff" : "", fontSize: "16px" }} type="button"
				onClick={() => {
					setDarkMode(!darkMode);
					props.ToggleMode(!darkMode);
				}}>
				{darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
			</button>
		</div >
	)
}

export default Header;