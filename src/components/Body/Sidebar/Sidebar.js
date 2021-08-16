import { Avatar } from '@material-ui/core'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import './Sidebar.css';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function Sidebar() {
	const user = useSelector(selectUser);

	const recentItems = (topic) => (
		<div className="recentItem">
			<span className="sidebar_hash">#</span>
			<p>{topic}</p>
		</div>
	);

	const [recent, setrecent] = useState(true)
	const [group, setgroup] = useState(false)
	const [events, setevents] = useState(false)
	const [follows, setfollows] = useState(true)

	return (
		<div className="sidebar">
			<div className="sidebar_top">
				<img
					src="https://images.unsplash.com/photo-1560345573-9f453083c335?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NjR8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60"
					alt="cover pics"
				/>
				<Avatar src={user.photoUrl} className="sidebar_avatar">
					Hi
				</Avatar>
				<h2>{user.displayName}</h2>
				<h4>{user.email}</h4>
			</div>
			<div className="sidebar_stats">
				<div className="sidebar_stat">
					<p>Who viewed you</p>
					<p className="stat_number">1,000</p>
				</div>
				<div className="sidebar_stat">
					<p>Views on post</p>
					<p className="stat_number">1,000</p>
				</div>
			</div>

			<div className="sidebar_stats_premium">
				<a className="sidebar-stat-premium" href>
					<h3>Access exclusive tools & insights</h3><br />
					<div className="premium-stat">
						<img src="../images/premium-icon.svg" alt="" />
						<span>Try Premium Free for 1 Month</span>
					</div>
				</a>
			</div>

			<div className="sidebar_bottom">
				<span style={{ fontSize: "18px", paddingBottom: "10px" }}>Recent</span><br />

				{!recent ?
					(<ExpandMoreOutlinedIcon className="icon_hover" style={{ fontSize: "40", fill: '#3081c4' }} onClick={() => {
						setrecent(!recent)
					}} />)
					:
					(<ExpandLessIcon className="icon_hover" style={{ fontSize: "40", fill: '#3081c4' }} onClick={() => {
						setrecent(!recent)
					}} />
					)
				}
				{recent && (
					<div className="dropdown-content">
						<div className="dropdown-item">
							{recentItems("reactjs")}
						</div>
						<div className="dropdown-item">
							{recentItems("JavaScript")}
						</div>
						<div className="dropdown-item">
							{recentItems("Redux & Firebase")}
						</div>
						<div className="dropdown-item">
							{recentItems("Java")}
						</div>
					</div>
				)}
			</div>

			<div className="sidebar_bottom">
				<span style={{ fontSize: "18px", paddingBottom: "10px" }}>Groups</span><br />
				{!group ?
					(<ExpandMoreOutlinedIcon className="icon_hover" style={{ fontSize: "40", fill: '#3081c4' }} onClick={() => {
						setgroup(!group)
					}} />)
					:
					(<ExpandLessIcon className="icon_hover" style={{ fontSize: "40", fill: '#3081c4' }} onClick={() => {
						setgroup(!group)
					}} />
					)
				}
				{group && (
					<div className="dropdown-content">
						<div className="dropdown-item">
							<a href><span><img src="../images/nav-network.svg" alt="group-Icon" /> GeeksforGeeks</span></a>
						</div>
						<div className="dropdown-item">
							<a href><span><img src="../images/nav-network.svg" alt="group-Icon" /> Technical Guruji</span></a>
						</div>
						<div className="dropdown-item">
							<a href><span><img src="../images/nav-network.svg" alt="group-Icon" /> freeCodeCamp.org</span></a>
						</div>
					</div>
				)}
			</div>

			<div className="sidebar_bottom">
				<span style={{ fontSize: "18px", paddingBottom: "10px" }}>Events</span><br />
				<AddOutlinedIcon className="icon_hover" aria-label="Create an event" style={{ fontSize: "40", fill: '#3081c4' }} onClick={() => {
					setevents(!events)
				}} />
			</div>

			<div className="sidebar_bottom">
				<span style={{ fontSize: "18px", paddingBottom: "10px" }}>Follows Hashtags</span><br />
				{!follows ?
					(<ExpandMoreOutlinedIcon className="icon_hover" style={{ fontSize: "40", fill: '#3081c4' }} onClick={() => {
						setfollows(!follows)
					}} />)
					:
					(<ExpandLessIcon className="icon_hover" style={{ fontSize: "40", fill: '#3081c4' }} onClick={() => {
						setfollows(!follows)
					}} />
					)
				}
				{follows && (
					<div className="dropdown-content">
						<div className="dropdown-item">
							{recentItems("JavaScript")}
						</div>
						<div className="dropdown-item">
							{recentItems("kubernetes")}
						</div>
						<div className="dropdown-item">
							{recentItems("Java")}
						</div>
						<div className="dropdown-item">
							{recentItems("artificialintelligence")}
						</div>
						<div className="dropdown-item">
							{recentItems("artificialintelligence")}
						</div>
						<div className="dropdown-item">
							{recentItems("career")}
						</div>
						<div className="dropdown-item">
							{recentItems("technology")}
						</div>
						<div className="dropdown-item">
							{recentItems("reactjs")}
						</div>
					</div>
				)}
			</div>

			<div className="sidebar_bottom_discover">
				<p>Discover more</p>
			</div>
		</div>
	)
}

export default Sidebar;
