import React from "react";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";

import { getComments } from "../modules/comments";
import { loginState, loginUserState } from "../modules/users";
import { useLikeActions } from "../modules/likes";

// import CommentList from "./CommentList";
import { Grid, Image, Text, Heart, Input, Button } from "../elements";
import { HighlightOff, Adjust } from "@material-ui/icons";
import { usePostActions } from "../modules/posts";

const Post = (props) => {
	const navigate = useNavigate();

	const postActions = usePostActions();
	const likeActions = useLikeActions();

	const userId = localStorage.getItem("userId");
	const isLogin = useRecoilValue(loginState);

	const [heartActive, setHeartActive] = React.useState(props.post.likeCheck);
	const [likeCount, setLikeCount] = React.useState(props.post.likeCount);

	// const comments = useRecoilValue(getComments).filter((c, idx) => {
	// 	return c.id === props.post.id;
	// });

	const getTime = (regDate) => {
		const now = parseInt(Date.now()) / 1000;
		const regDt = parseInt(Date.parse(regDate)) / 1000;
		const result = (now - regDt) / 3600;
		// console.log(result);
		if (result < 24) {
			return result + "시간 전";
		} else {
			return parseInt(result / 24) + "일 전";
		}
	};

	const onHeartClick = (isLike) => {
		const prevLikeCount = likeCount;
		if (!isLike) {
			setHeartActive(!isLike);
			setLikeCount(prevLikeCount + 1);
			likeActions.increaseLikeCount();
		} else {
			setHeartActive(!isLike);
			setLikeCount(prevLikeCount - 1);
			likeActions.decreaseLikeCount();
		}
	};

	if (isLogin) {
		return (
			<React.Fragment>
				<Grid padding='16px'>
					<Grid isFlex>
						<Grid isFlex>
							<Image
								shape='circle'
								src={props.post.profileImgUrl}
							/>
							<Text bold>{props.post.nickname}</Text>
						</Grid>
						<Grid isFlex>
							<Text>{getTime(props.post.regDate)}</Text>
							{props.post.userId === userId && (
								<>
									<Link to={"/edit/" + props.post.id}>
										<Adjust />
									</Link>
									<HighlightOff
										onClick={() => {
											postActions.deletePost(
												props.post.id
											);
										}}
										style={{ cursor: "pointer" }}
									/>
								</>
							)}
						</Grid>
					</Grid>
				</Grid>

				<Grid padding='16px'>
					<Text>{props.post.contents}</Text>
				</Grid>

				<Grid>
					<Image shape='retangle' src={props.post.imgUrl} />
				</Grid>

				<Grid padding='5px 16px'>
					<Grid isFlex>
						{/* <Grid>
								<Text bold>댓글 {comments.length}개</Text>
							</Grid> */}

						<Grid isFlex>
							<Heart
								active={heartActive}
								_onClick={() => onHeartClick(heartActive)}
							/>
							<Grid padding='0px 5px'>
								<Text bold>좋아요 {likeCount}개</Text>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{/* <Grid padding='0px 16px'>
						<Grid isFlex>
							<Input width='100%' />
							<Button>작성</Button>
						</Grid>
					</Grid>

					<Grid padding='16px'>
						<CommentList comments={comments} />
					</Grid> */}
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<Grid padding='16px'>
					<Grid isFlex>
						<Grid isFlex>
							<Image
								shape='circle'
								src={props.post.profileImgUrl}
							/>
							<Text bold>{props.post.nickname}</Text>
						</Grid>
						<Grid isFlex>
							<Text>{getTime(props.post.regDate)}</Text>
						</Grid>
					</Grid>
				</Grid>

				<Grid padding='16px'>
					<Text>{props.post.contents}</Text>
				</Grid>

				<Grid>
					<Image shape='retangle' src={props.post.imgUrl} />
				</Grid>

				<Grid padding='5px 16px'>
					<Grid isFlex>
						{/* <Grid>
								<Text bold>댓글 {comments.length}개</Text>
							</Grid> */}

						<Grid isFlex>
							<Heart active={false} />
							<Grid padding='0px 5px'>
								<Text bold>좋아요 {likeCount}개</Text>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{/* <Grid padding='0px 16px'>
						<Grid isFlex>
							<Input width='100%' />
							<Button>작성</Button>
						</Grid>
					</Grid>

					<Grid padding='16px'>
						<CommentList comments={comments} />
					</Grid> */}
			</React.Fragment>
		);
	}
};

export default Post;
