import React from "react";
import { useRecoilValue } from "recoil";

import {loginUserState} from "../modules/users";
import { postSelector, singlePostSelector, usePostActions } from "../modules/posts";

import { Grid, Text, Input, Button, Image } from "../elements";
import { useParams } from "react-router-dom";

const EditPost = ({history}) => {

	const params = useParams();
	const postActions = usePostActions();
	
	const postId = params.postId;
	const detail = useRecoilValue(singlePostSelector(postId));
	console.log(detail);

	const loginUser = useRecoilValue(loginUserState);
	const [previewImage, setPreviewImage] = React.useState(detail.imgUrl);
	const [file, setFile] = React.useState("");
	const [text, setText] = React.useState("");

	const changeText = (e) => {
		if (e.target.value) {
			setText(e.target.value);
		} else {
			setText(detail.contents);
		}
	};

	const onImageChange = async (e) => {
		const {
			target: { files, value },
		} = e;
		const file = e.target.files[0];
		const reader = new FileReader();

		setFile(value);

		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setPreviewImage(result);
		};
		reader.readAsDataURL(file);
	};

	const fakeImgUrl = "https://c.tenor.com/rHwI0HUDcfEAAAAd/chunsik-%EC%B6%98%EC%8B%9D.gif";

	return (
		<React.Fragment>
			<Grid padding='16px'>
				<Text size='32px' bold>
					포스트 수정
				</Text>

				<Grid padding='16px 0px'>
					<Text bold>이미지</Text>
					<Grid>
						<Grid>
							<Image shape='retangle' src={previewImage} />
						</Grid>
					</Grid>
					<input
						type='file'
						accept='image/*'
						onChange={onImageChange}
					/>
				</Grid>

				<Grid padding='16px 0px'>
					<Input
						_onChange={changeText}
						label='문구'
						placeholder={detail.contents}></Input>
				</Grid>

				<Button
					_onClick={() => {
						postActions.editPost(postId, text, fakeImgUrl);
					}}
					width='100%'
					backgroundColor='#000'
					color='#fff'>
					포스트 수정
				</Button>
			</Grid>
		</React.Fragment>
	);
};

EditPost.defaultProps = {};

export default EditPost;
