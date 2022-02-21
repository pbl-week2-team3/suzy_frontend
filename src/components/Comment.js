import React from "react";
import { Grid, Image, Text, Button } from "../elements";

const Comment = (props) => {
	return (
		<Grid isFlex>
			<Grid isFlex>
				<Image shape='circle' src={props.comment.imgUrl} />
				<Text bold>{props.comment.nickname}</Text>
                <Text>{props.comment.text}</Text>
			</Grid>

			<Grid>
				<Button>삭제</Button>
			</Grid>
		</Grid>
	);
};

export default Comment;
