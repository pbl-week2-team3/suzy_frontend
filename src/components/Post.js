import React from "react";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";

import { loginState } from "../modules/users";
import { usePostActions } from "../modules/posts";
import { useLikeActions } from "../modules/likes";

// import CommentList from "./CommentList";
import { Grid, Image, Text, Heart } from "../elements";
import { HighlightOff, Adjust } from "@material-ui/icons";

const Post = (props) => {

	const navigate = useNavigate();
	const editUrl = "/edit/" + props.post.id;

// 	contents: "sssswerw"
// id: 1
// img_url: "asdfasedfdsf"
// like_check: false
// like_count: 1
// me: false
// nickname: "as12"
// profile_img: "https://media.discordapp.net/attachments/769096782088503298/945677346525040690/default.png"
// reg_date: "2022-02-23T08:29:42.000Z"

	const postActions = usePostActions();
	const likeActions = useLikeActions();

	const userId = localStorage.getItem("userId");
	const isLogin = useRecoilValue(loginState);

	const [heartActive, setHeartActive] = React.useState(props.post.like_check);
	const [likeCount, setLikeCount] = React.useState(props.post.like_count);

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
		} else if(0 < result < 1) {
			return 
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
								src={props.post.profile_img}
							/>
							<Text bold>{props.post.nickname}</Text>
						</Grid>
						<Grid isFlex>
							<Text>{getTime(props.post.reg_date)}</Text>
							{props.post.userId === userId && (
								<Grid isFlex>
									<Link to={"/edit/" + props.post.id}>
										<Adjust onClick={() => {
											navigate(editUrl);
										}} />
									</Link>
									<HighlightOff
										onClick={() => {
											postActions.deletePost(
												props.post.id
											);
										}}
										style={{ cursor: "pointer" }}
									/>
								</Grid>
							)}
						</Grid>
					</Grid>
				</Grid>

				<Grid padding='16px'>
					<Text>{props.post.contents}</Text>
				</Grid>

				<Grid>
					<Image shape='retangle' src={props.post.img_url} />
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
								src={props.post.profile_img}
							/>
							<Text bold>{props.post.nickname}</Text>
						</Grid>
						<Grid isFlex>
							<Text>{getTime(props.post.reg_date)}</Text>
						</Grid>
					</Grid>
				</Grid>

				<Grid padding='16px'>
					<Text>{props.post.contents}</Text>
				</Grid>

				<Grid>
					<Image shape='retangle' src={props.post.img_url} />
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
