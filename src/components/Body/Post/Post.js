import { Avatar } from '@material-ui/core';
import React, { forwardRef, useState } from 'react';
import { db } from '../../../firebase';
import InputOption from '../Feed/InputOption';
import './Post.css';
import '../Feed/InputOption.css';
import ReactPlayer from "react-player";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const Post = forwardRef(({ ID, name, description, message, photoUrl, imageUrl, video, likes }, ref) => {

	const [deleteDropdown, setDeleteDropdown] = useState(false)

	const user = useSelector(selectUser);

	function likeHandler(event, ID) {
		event.preventDefault();
		console.log(ID)
		let currentLikes = likes.count;
		let whoLiked = likes.whoLiked;
		let User = user.email;
		let userIndex = whoLiked.indexOf(User);

		if (userIndex >= 0) {
			currentLikes--;
			whoLiked.splice(userIndex, 1);
		} else if (userIndex === -1) {
			currentLikes++;
			whoLiked.push(User);
		}

		db.collection("posts").doc(ID).update({
			likes: {
				count: currentLikes,
				whoLiked: whoLiked,
			},
		});
	}

	const handleDelete = (e) => {
		e.preventDefault();
		db.collection("posts").doc(ID)
			.delete()

	}

	return (
		<div ref={ref} className="post">
			<div className="post_header">
				<Avatar src={photoUrl}>{name[0]}</Avatar>
				<div className="postInfo">
					<div className="user-desc">
						<h2>{name}</h2>
						<p>{description}</p>
					</div>
					{description === user.email && (
						<MoreVertIcon className="delete-dropdown" onClick={() => {
							setDeleteDropdown(!deleteDropdown)
							setTimeout(() => {
								setDeleteDropdown(false)
							}, 3000);
						}} />
					)}
				</div>
				{deleteDropdown && (
					<div className="dropdown-content">
						<div className="dropdown-delete-post">
							<a href><span onClick={(e) => {
								const confirmBox = window.confirm(
									"Do you really want to delete this post?"
								)
								if (confirmBox === true) {
									handleDelete(e);
									alert("Post Deleted! ");
								}
							}}>Delete</span></a>
						</div>
					</div>
				)}
			</div>
			<div className="post_body">
				<p>{message}</p>
				<br />
				<a href>{!imageUrl && video ? <ReactPlayer width={"100%"} url={video} /> : imageUrl && <img style={{ width: "100%" }} src={imageUrl} alt="" />}</a>
			</div>
			{likes.count > 0 && (
				<div className="social_count">
					<>
						<li>
							<button>
								<img style={{ width: "22px" }} src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
								<span style={{ paddingLeft: "5px", fontSize: "20px" }}>{likes.count}</span>
							</button>
						</li>
						<li>
							<a href>{0} comments (currently not working)</a>
						</li>
					</>
				</div>
			)}

			<div className="post_buttons">
				<div className="inputOption" onClick={(event) => likeHandler(event, ID)}>
					<ThumbUpAltOutlinedIcon className={likes.whoLiked.indexOf(user.email) >= 0 ? "active-icon" : null} style={{ fontSize: "27px" }} />
					<h4 className={likes.whoLiked.indexOf(user.email) >= 0 ? "active-h4" : null} >Like</h4>
				</div>
				<InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" size="27px" />
				<InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" size="27px" />
				<InputOption Icon={SendOutlinedIcon} title="Send" color="gray" size="27px" />
			</div>
		</div>
	);
});

export default Post;