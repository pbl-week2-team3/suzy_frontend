import React from "react";
import { useRecoilValue } from "recoil";


import { uploadFile } from "react-s3";
import AWSconfig from "../utils/awsConfig";

import {
	singlePostSelector,
	usePostActions,
} from "../modules/posts";

import { Grid, Text, Input, Button, Image } from "../elements";
import { useParams } from "react-router-dom";

const EditPost = ({ history }) => {

	window.Buffer = window.Buffer || require("buffer").Buffer;

	const params = useParams();
	const postActions = usePostActions();

	const postId = params.postId;
	const detail = useRecoilValue(singlePostSelector(postId));

	const [previewImage, setPreviewImage] = React.useState(detail.imgUrl);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [imgUrl, setImgUrl] = React.useState(null);
	const [text, setText] = React.useState("");


	const changeText = (e) => {
		if (e.target.value) {
			setText(e.target.value);
		} else {
			setText(detail.contents);
		}
	};

	const onImageChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
		console.log(selectedFile);
		const reader = new FileReader();

		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setPreviewImage(result);
		};
		reader.readAsDataURL(file);
	};

	const handleUpload = async (file) => {
		uploadFile(file, AWSconfig)
			.then((data) => setImgUrl(data.location))
			.catch((err) => console.error(err));
	};

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
					<button onClick={() => handleUpload(selectedFile)}>업로드</button>
				</Grid>

				<Grid padding='16px 0px'>
					<Input
						_onChange={changeText}
						label='문구'
						placeholder={detail.contents}></Input>
				</Grid>

				<Button
					_onClick={() => {
						postActions.editPost(postId, text, imgUrl);
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
