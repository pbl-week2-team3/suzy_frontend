import React from "react";
import { useRecoilValue } from "recoil";

import { Grid, Text, Input, Button } from "../elements";
import { loginState, useUserActions } from "../modules/users";

const Login = ({ history }) => {
	const isLogin = useRecoilValue(loginState);
	// const [loginUser, setLoginUser] = useRecoilState(loginUserSelector);
	const userActions = useUserActions();

	const [id, setId] = React.useState("");
	const [password, setPassword] = React.useState("");

	React.useEffect(() => {
		if (isLogin) {
			history.push("/");
		}
	}, []);

	const changeId = (e) => {
		setId(e.target.value);
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<React.Fragment>
			<Grid padding='16px'>
				<Text size='32px' bold>
					로그인
				</Text>

				<Grid padding='16px 0px'>
					<Input
						label='아이디'
						placeholder='아이디를 입력해주세요.(아이디는 master@aaa.com)'
						value={id}
						_onChange={changeId}></Input>
					<Input
						label='비밀번호'
						placeholder='비밀번호를 입력해주세요.(비밀번호는 1111)'
						value={password}
						_onChange={changePassword}
						_type='password'></Input>
				</Grid>

				<Button
					_onClick={() => {
						userActions.login(id, password);
					}}
					width='100%'
					backgroundColor='#000'
					color='#fff'>
					로그인
				</Button>
			</Grid>
		</React.Fragment>
	);
};

Login.defaultProps = {};

export default Login;
