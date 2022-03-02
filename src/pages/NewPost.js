import React from "react";

import { BUCKET, awsS3Bucket, BASE_S3_URL } from "../utils/awsBucketConfig";

import { usePostActions } from "../modules/posts";

import { Grid, Text, Input, Button, Image } from "../elements";

const NewPost = ({ history }) => {
	window.Buffer = window.Buffer || require("buffer").Buffer;

	const postActions = usePostActions();
	const userId = localStorage.getItem("userId");

	const [previewImage, setPreviewImage] = React.useState(
		"data:image/png;base64,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"
	);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [imgUrl, setImgUrl] = React.useState(null);
	const [text, setText] = React.useState("");

	const changeText = (e) => {
		setText(e.target.value);
	};

	// refactoring
	// 나중에 onImageChange랑 handleUpload 합쳐서 별도 컴포넌트 생성 예정
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

	const handleUpload = async (folderName, file) => {
		const urlIdentifier = `img-${Math.ceil(Math.random() * 10 ** 10)}`;

		const params = {
			ACL: "public-read",
			Body: file,
			Bucket: BUCKET,
			Key: folderName + "/" + urlIdentifier,
		};

		await awsS3Bucket.putObject(params).send(() => {
			const signedUrl = BASE_S3_URL + folderName + "/" + urlIdentifier;
			setImgUrl(signedUrl);
		});
	};

	return (
		<React.Fragment>
			<Grid padding='16px'>
				<Text size='32px' bold>
					새로운 포스트
				</Text>

				<Grid padding='16px 0px'>
					<Text bold>이미지</Text>
					<Grid>
						<Grid>
							<Image shape='retangle' src={previewImage} />
						</Grid>
					</Grid>
					<button onClick={() => handleUpload("posts", selectedFile)}>
						업로드
					</button>
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
						placeholder='문구를 입력해주세요.'></Input>
				</Grid>

				<Button
					_onClick={() => {
						postActions.createPost(userId, text, imgUrl);
					}}
					width='100%'
					backgroundColor='#000'
					color='#fff'>
					포스트 작성
				</Button>
			</Grid>
		</React.Fragment>
	);
};

NewPost.defaultProps = {};

export default NewPost;
