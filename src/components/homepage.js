import React from 'react';
import BlogList from './blog-list';
import '../sass/homepage.scss';

function Homepage() {
	return (
		<div>
			<div className="header">
				<h2>Lynn Cyrin</h2>
				<h4>software engineer</h4>
			</div>
			<div className="homepage-container">
				<div className="homepage-list">
					<BlogList />
				</div>
			</div>
		</div>
	);
}

export default Homepage;
