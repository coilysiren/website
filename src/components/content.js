import React from 'react';
import PropTypes from 'prop-types';

export const HTMLcontent = ({content, className}) => (
	<div className={className} dangerouslySetInnerHTML={{__html: content}} />
);

const content = ({content, className}) => (
	<div className={className}>{content}</div>
);

content.propTypes = {
	content: PropTypes.node,
	className: PropTypes.string
};

HTMLcontent.propTypes = content.propTypes;

export default content;
