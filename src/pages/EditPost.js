import React from "react";
import { useRecoilValue } from "recoil";

import { BUCKET, awsS3Bucket, BASE_S3_URL } from "../utils/awsBucketConfig";

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
