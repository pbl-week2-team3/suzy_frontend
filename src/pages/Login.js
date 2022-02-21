import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue} from "recoil";

import { Grid, Text, Input, Button } from "../elements";
import {loginState, useUserActions} from "../modules/users";

const Login = () => {
	const navigate = useNavigate();

	const isLogin = useRecoilValue(loginState);
	const userActions = useUserActions();

	const [id, setId] = React.useState("");
	const [password, setPassword] = React.useState("");

	const changeId = (e) => {
		setId(e.target.value);
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
	};

	React.useEffect(() => {
		if (isLogin) {
			navigate("/");
		}
	}, []);

	return (
		<React.Fragment>
			<Grid padding='16px'>
				<Text size='32px' bold>
					로그인
				</Text>

				<Grid padding='16px 0px'>
					<Input
						label='아이디'
						placeholder='아이디를 입력해주세요.'
						value={id}
						_onChange={changeId}></Input>
					<Input
						label='비밀번호'
						placeholder='비밀번호를 입력해주세요.'
						value={password}
						_onChange={changePassword}
						type='password'></Input>
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
