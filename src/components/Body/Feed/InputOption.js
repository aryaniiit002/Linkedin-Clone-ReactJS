import React from 'react';
import './InputOption.css';

function InputOption({ Icon, title, color, size }) {
	return <div className="inputOption">
		<Icon style={{ color: color, fontSize: size }} />
		<h4>{title}</h4>
	</div>;
};

export default InputOption;