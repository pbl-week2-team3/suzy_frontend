import React from "react";
import { useRecoilValue } from "recoil";

import CommentList from "./CommentList";
import { getComments } from "../modules/comments";
import { Grid, Image, Text, Heart, Input, Button } from "../elements";
import { loginState, loginUserState } from "../modules/users";

const Post = (props) => {
	const loginUser = useRecoilValue(loginUserState);
	const isLogin = useRecoilValue(loginState);
	const [heartActive, setHeartActive] = React.useState(props.post.likeCheck);

	const comments = useRecoilValue(getComments).filter((c, idx) => {
		return c.id === props.post.id;
	});

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
		if (isLike) {
			setHeartActive(!isLike);
		} else {
			setHeartActive(!isLike);
		}
	};

	if (isLogin) {
		return (
			<React.Fragment>
				<Grid>
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
								{props.post.userId === loginUser.userId && (
									<>
										<Button>수정</Button>
										<Button>삭제</Button>
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
							<Grid>
								<Text bold>댓글 {comments.length}개</Text>
							</Grid>

							<Grid isFlex>
								<Text bold>{props.post.likeCount}</Text>
								<Heart
									active={heartActive}
									_onClick={() => onHeartClick(heartActive)}
								/>
							</Grid>
						</Grid>
					</Grid>

					<Grid padding='0px 16px'>
						<Grid isFlex>
							<Input width='100%' />
							<Button>작성</Button>
						</Grid>
					</Grid>

					<Grid padding='16px'>
						<CommentList comments={comments} />
					</Grid>
				</Grid>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<Grid>
					<Grid padding='16px'>
						<Grid isFlex>
							<Grid isFlex>
								<Image
									shape='circle'
									src={props.post.profileImgUrl}
								/>
								<Text bold>{props.post.nickname}</Text>
								<Text bold>{props.post.userId}</Text>
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
							<Grid>
								<Text bold>댓글 {comments.length}개</Text>
							</Grid>

							<Grid isFlex>
								<Text bold>{props.post.likeCount}</Text>
								<Heart active={false} />
							</Grid>
						</Grid>
					</Grid>

					<Grid padding='0px 16px'>
						<Grid isFlex>
							<Input width='100%' />
							<Button>작성</Button>
						</Grid>
					</Grid>

					<Grid padding='16px'>
						<CommentList comments={comments} />
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
};

export default Post;
