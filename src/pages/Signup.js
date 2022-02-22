import React from "react";

import { loginState, useUserActions } from "../modules/users";

import { Grid, Text, Input, Button } from "../elements";
import { useRecoilValue } from "recoil";

const Signup = ({ history }) => {
	const userActions = useUserActions();
	const isLogin = useRecoilValue(loginState);

	const [id, setId] = React.useState("");
	const [nickname, setNickname] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");

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

	return (
		<React.Fragment>
			<Grid padding='16px'>
				<Text size='32px' bold>
					회원가입
				</Text>

				<Grid padding='16px 0px'>
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
						_type="password"
						label='비밀번호'
						placeholder='비밀번호를 입력해주세요.'></Input>
					<Input
						_onChange={changeConfirmPassword}
						_type="password"
						label='확인 비밀번호'
						placeholder='비밀번호를 입력해주세요.'></Input>
				</Grid>

				<Button
					_onClick={() => {
						userActions.signup(
							id,
							nickname,
							password,
							confirmPassword
						);
					}}
					width='100%'
					backgroundColor='#000'
					color='#fff'>
					회원가입
				</Button>
			</Grid>
		</React.Fragment>
	);
};

Signup.defaultProps = {};

export default Signup;
