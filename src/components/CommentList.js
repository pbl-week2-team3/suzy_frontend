import React from "react";
import Comment from "./Comment";

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
