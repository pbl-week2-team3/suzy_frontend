import React from "react";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";

import { loginState } from "../modules/users";
import { usePostActions } from "../modules/posts";
import { useLikeActions } from "../modules/likes";

// import CommentList from "./CommentList";
import { Grid, Image, Text, Heart, LoadingSpinner } from "../elements";
import { HighlightOff, Adjust } from "@material-ui/icons";

const Post = (props, ref) => {
	const navigate = useNavigate();
	const editUrl = "/edit/" + props.post.id;

	const postActions = usePostActions();
	const likeActions = useLikeActions();

	const userId = localStorage.getItem("userId");
	const isLogin = useRecoilValue(loginState);

	const [heartActive, setHeartActive] = React.useState(props.post.like_check);
	const [likeCount, setLikeCount] = React.useState(props.post.like_count);

	// const comments = useRecoilValue(getComments).filter((c, idx) => {
	// 	return c.id === props.post.id;
	// });

	const postRef = React.useRef(null);
	const observer = React.useRef();
	const [isLoading, setIsLoading] = React.useState(false);

	const intersectionObserver = (entries, io) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				io.unobserve(entry.target);
				setIsLoading(true);
			}
		});
	};

	const getTime = (regDate) => {
		const now = parseInt(Date.now()) / 1000;
		const regDt = parseInt(Date.parse(regDate)) / 1000;
		const result = (now - regDt) / 3600;

		if (result > 24) {
			return parseInt(result / 24) + "일 전";
		} else if (0 < result < 1) {
			return parseInt(result * 60) + "분 전";
		} else {
			return parseInt(result) + "시간 전";
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

	React.useEffect(() => {
		observer.current = new IntersectionObserver(intersectionObserver, {
			threshold: 0.7,
		});
		postRef.current && observer.current.observe(postRef.current);
	}, []);

	if (isLoading === false) {
		return (
			<div ref={postRef}>
				<LoadingSpinner width='100%' height='300px' />
			</div>
		);
	} else {
		if (isLogin) {
			return (
				<div ref={postRef}>
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
								<Text>{getTime(props.post.createdAt)}</Text>
								{props.post.userId === userId && (
									<Grid isFlex>
										<Link to={"/edit/" + props.id}>
											<Adjust
												onClick={() => {
													navigate(editUrl);
												}}
											/>
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
				</div>
			);
		} else {
			return (
				<div ref={postRef}>
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
				</div>
			);
		}
	}
};

export default Post;
