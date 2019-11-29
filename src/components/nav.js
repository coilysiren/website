import React from 'react';
import { Link } from 'gatsby';
import iconSVG from '../images/cool-logo.svg';
import '../sass/nav.scss';

function Navigation() {
	return (
		<nav>
			<Link to="/" activeClassName="activeNavButton" className="nav-logoName">
				<img
					src={iconSVG}
					alt="An abstract shape with lines and circles Tech by Wenjie Jiang from the Noun Project"
				/>
				<h2 className="blog-main-title">{'Lynn' + '\'' + 's Blog'}</h2>
			</Link>
			<ul className="nav-links" id="links">
				<li>
					<Link to="/" activeClassName="activeNavButton">
						Home
					</Link>
				</li>
				<li>
					<a
						href="mailto:lynncyrin@gmail.com"
						activeClassName="activeNavButton"
					>
						Contact
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;
