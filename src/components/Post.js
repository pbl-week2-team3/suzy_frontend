import React from "react";
import {Grid, Image, Text} from "../elements";

const Post = (props) => {
	return (
		<React.Fragment>
			<Grid>
				<Grid isFlex>
					<Image shape="circle" src={props.src} />
					<Text bold>{props.userInfo.userName}</Text>
					<Text>{props.regDate}</Text>
				</Grid>

				<Grid padding="16px">
					<Text>{props.contents}</Text>
				</Grid>

				<Grid>
					<Image shape="retangle" src={props.src} />
				</Grid>

				<Grid padding="16px">
					<Text bold>댓글 {props.commentCount}개</Text>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default Post;
