import React, { useEffect, useState } from 'react';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import InputOption from './InputOption';
import Post from '../Post/Post';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import FlipMove from 'react-flip-move';
import PostalModal from './PostalModal';
import VisualMediaPM from './VisualMediaPM';


function Feed() {
	const user = useSelector(selectUser);

	const [posts, setPosts] = useState([]);

	// This fire up the code the feed component loads (without dependency) 
	useEffect(() => {
		// Real time connection to database
		// This will create a real time listener to firebase which means anytime when we create a 	  post collection in the sack and post a message in and this will directly map to posts.
		// Means if any posts change it will update it.
		db.collection("posts").orderBy('USER.timestamp', 'desc').onSnapshot(snapshot => (
			// console.log(snapshot.docs),
			setPosts(snapshot.docs.map(doc => (
				{
					id: doc.id,
					data: doc.data(),
				}
			)))
		))
	}, [])

	const [showModal, setShowModal] = useState(false);
	const [isPhoto, setisPhoto] = useState(false);
	const [isVideo, setisVideo] = useState(false);

	const clickHandler = (event) => {

		if (event.target !== event.currentTarget) {
			return;
		}
		switch (showModal) {
			case true:
				setShowModal(false);
				break;
			case false:
				setShowModal(true);
				break;
			default:
				setShowModal(false);
				break;
		}
	};
	console.log(posts)

	return (
		<div className="feed">
			{/* <div className="top_section">
				<h5>
					<a href style={{ fontWeight: "700" }}>Hiring in a hurray..?</a>
				</h5>
				<p>- Find talented pros in record time with LinkedIn and keep business moving.</p>
			</div> */}
			<div className="feed_inputContainer">
				<div className="feed_input">
					<CreateIcon />
					<form>
						<input
							type="text"
							defaultValue="Start a post"
							onClick={clickHandler}
						/>
						{showModal && <PostalModal showModal={showModal}
							clickHandler={clickHandler}
							name={user.displayName}
							photoUrl={user.photoUrl || ''}
						/>}
					</form>
				</div>
				<div className="feed_inputOption">

					<div className="inputOption" onClick={() => { setisPhoto(!isPhoto) }}>
						<ImageIcon style={{ color: "#70b5f9", fontSize: "34px" }} />
						<h4>Photo</h4>
					</div>
					{isPhoto && <VisualMediaPM
						isMedia={isPhoto}
						media="photo"
						isWindow={() => setisPhoto(false)}
					/>}

					<div className="inputOption" onClick={() => { setisVideo(!isVideo) }}>
						<SubscriptionsIcon style={{ fontSize: "34px" }} />
						<h4>Video</h4>
					</div>
					{isVideo && <VisualMediaPM
						isMedia={isVideo}
						media="video"
						isWindow={() => setisVideo(false)}
					/>}
					<InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" size="34px" />
					<InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E" size="34px" />
				</div>
			</div>

			<FlipMove>
				{posts.map(({ id, data: { USER, message, imageUrl, video, likes } }) => (
					//{}
					<Post
						key={id}
						ID={id}
						name={USER.name}
						description={USER.description}
						message={message}
						photoUrl={USER.photoUrl}
						imageUrl={imageUrl}
						video={video}
						likes={likes}
					/>
				))}
			</FlipMove>
		</div>
	);
}

export default Feed;
