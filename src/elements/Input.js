import React from "react";
import styled from "styled-components";

import {Text} from "../elements";

const Input = (props) => {
	const { _onChange, width, height, label, placeholder, children } = props;

	const styles = {
		width: width,
		height: height,
	};

	return (
		<>
			<Text bold>{label}</Text>
			<I onChange={_onChange} {...styles} placeholder={placeholder}>{children}</I>
		</>
	);
};

Input.defaultProps = {
	width: "100%",
	height: 30,
	children: null,
	label: null,
	placeholder: null,
};

const I = styled.input`
	width: calc(${(props) => props.width} - 8px);
	height: ${(props) => props.height}px;
`;

export default Input;
