import React, { useState } from 'react';
import './Widgets.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function Widgets() {

	const [more, setmore] = useState(false)

	const newsArticle = (heading, subtitle) => (
		<div className="widget_article">
			<div className="widgets_articleleft">
				<FiberManualRecordIcon style={{ color: "black", marginRight: "5px" }} />
			</div>

			<div className="widgets_articleright">
				<h5>{heading}</h5>
				<p>{subtitle}</p>
			</div>
		</div>
	);

	return (
		<div className="container_class">
			<div className="widgets">
				<div className="widget_header">
					<h2>LinkedIn News</h2>
					<img src="../images/feed-icon.svg" alt="" width="25px" />
				</div>

				{newsArticle("Microsoft's LinkedIn Faces Italian Probe Following User Data Scraping", "Tops news - 3240 readers")}
				{newsArticle("LinkedIn Working On Clubhouse-Like Audio Networking Feature", "Tops news - 2,3214 readers")}
				{newsArticle("Most Social Media Firms Comply With Govt's IT Rules; Twitter Yet To Follow", "Tops news - 1,324 readers")}
				{newsArticle("Online Privacy Firm Alleges Data Breach Of 700 Mn LinkedIn Users, Co Denies", "Tops news - 2,32 readers")}


				<div onClick={() => {
					setmore(!more)
				}}>

					{more && (
						<>
							{newsArticle("After Facebook, LinkedIn Faces Massive 500 Mn Users' Data Leak", "Tops news - 2,24 readers")}
							{newsArticle("Remote jobs to thrive even post-pandemic as companies, employees look for flexibility", "Tops news - 2,24 readers")}
							{newsArticle("How Work From Home culture is changing the face of work", "Tops news - 2,24 readers")}
							{newsArticle("85% of women in India have missed out on a raise, promotion because of their gender: LinkedIn Opportunity Index 2021", "Tops news - 2,24 readers")}
						</>
					)}
					<div className="dropdown-btn">
						<span className="dropdown_span">Show more</span>
						<p className="dropdown_p">
							{!more ?
								(<ExpandMoreOutlinedIcon style={{ fontSize: "30" }} />)
								:
								(<ExpandLessIcon style={{ fontSize: "30" }} />)}
						</p>
					</div>
				</div>

			</div>

			<div className="widgets">
				<div className="widget_header">
					<h2>Today’s top courses</h2>
					<img src="../images/feed-icon.svg" alt="" width="25px" />
				</div>
				{newsArticle("Communicating with Emotional Intelligence", "Brenda Bailey-Hughes")}
				{newsArticle("Interaction Design: Deliverables", "Diane Cronenwett")}
				{newsArticle("Ecommerce Success Stories", "Chris Guillebeau")}
				{newsArticle("Google Cloud for Azure Administrators", "Sharon Bennett")}

				<div className="widget-bottom">
					<a style={{ display: "contents" }} href>Show more on LinkedIn Learning</a>
					<img src="../images/right-icon.svg" alt="" style={{ paddingLeft: "70px" }} width="18px" />
				</div>
			</div>
			<img src="../images/widgets-last.png" alt="" style={{ marginTop: "3px", cursor: "pointer" }} />
			<p style={{ margin: "20px" }}>LinkedIn-Clone by <span style={{ cursor: "pointer", color: "blue" }} onClick={() => window.open("https://github.com/aryaniiit002")}>Aryan Bindal</span></p>
		</div >
	)
}

export default Widgets;
