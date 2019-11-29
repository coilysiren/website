import React from 'react';
import sparkles from '../images/sparkles-twitter.svg';
import '../sass/footer.scss';

function Footer() {
	return (
		<footer>
			<div className="copyright-footer">
				<img src={sparkles} alt="Three sparkles colored in purple" />
				<h3>Copyright 2019</h3>
				<img src={sparkles} alt="Three sparkles colored in purple" />
			</div>
			<h4>
        Website made with love by{' '}
				<a href="https://twitter.com/kefimochi">@kefimochi</a>,{' '}
				<a href="https://twitter.com/slimekat">@slimekat</a> and{' '}
				<a href="https://github.com/komalali">@komal</a>
			</h4>
		</footer>
	);
}

export default Footer;
