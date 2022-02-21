import React from "react";
import Comment from "./Comment";

import { Grid, Image, Text, Button } from "../elements";

const CommentList = (props) => {

	const comments = props.comments;

	return (
		<React.Fragment>
			{comments.map((c, idx) => {
				return (
					<Comment comment={c} key={idx} />
				);
			})}
		</React.Fragment>
	);
};

export default CommentList;
