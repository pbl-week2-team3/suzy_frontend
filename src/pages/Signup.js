import React from "react";

import { uploadFile } from "react-s3";
import AWSconfig from "../utils/awsConfig";

import { loginState, useUserActions } from "../modules/users";

import { Grid, Text, Input, Button, Image } from "../elements";
import { useRecoilValue } from "recoil";

const Signup = ({ history }) => {
	window.Buffer = window.Buffer || require("buffer").Buffer;

	const userActions = useUserActions();
	const isLogin = useRecoilValue(loginState);

	const [id, setId] = React.useState("");
	const [nickname, setNickname] = React.useState("");
	const [profileImageUrl, setProfileImageUrl] = React.useState(null);
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [previewImage, setPreviewImage] = React.useState(
		"https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
	);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [imgUrl, setImgUrl] = React.useState(null);

	React.useEffect(() => {
		if (isLogin) {
			history.push("/");
		}
	}, []);

	const changeId = (e) => {
		setId(e.target.value);
	};

	const changeNickname = (e) => {
		setNickname(e.target.value);
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
	};

	const changeConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
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

	const handleUpload = async (file) => {
		uploadFile(file, AWSconfig)
			.then(console.log("success"))
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
	};

	return (
		<React.Fragment>
			<Grid padding='16px'>
				<Text size='32px' bold>
					회원가입
				</Text>

				<Grid>
					<Grid>
						<Grid>
							<Image
								shape='circle'
								size='60'
								src={previewImage}
							/>
						</Grid>
					</Grid>
					<button onClick={() => handleUpload(selectedFile)}>
						업로드
					</button>
					<input
						type='file'
						accept='image/*'
						onChange={onImageChange}
					/>
				</Grid>

				<Grid isFlex padding='16px 0px'>
					<Grid>
						<Input
							_onChange={changeId}
							label='아이디'
							placeholder='아이디를 입력해주세요.'></Input>
						<Input
							_onChange={changeNickname}
							label='닉네임'
							placeholder='닉네임을 입력해주세요.'></Input>
						<Input
							_onChange={changePassword}
							_type='password'
							label='비밀번호'
							placeholder='비밀번호를 입력해주세요.'></Input>
						<Input
							_onChange={changeConfirmPassword}
							_type='password'
							label='확인 비밀번호'
							placeholder='비밀번호를 입력해주세요.'></Input>
					</Grid>
				</Grid>

				<Grid padding="20px 0px">
					<Button
						_onClick={() => {
							userActions.signup(
								id,
								nickname,
								password,
								confirmPassword,
								profileImageUrl
							);
						}}
						width='100%'
						backgroundColor='#000'
						color='#fff'>
						회원가입
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

Signup.defaultProps = {};

export default Signup;
