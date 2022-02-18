import React from "react";
import { Grid, Text, Input, Button } from "../elements";

const Login = (props) => {
	return (
		<React.Fragment>
			<Grid padding='16px'>
				<Text size='32px' bold>
					로그인
				</Text>

				<Grid padding='16px 0px'>
					<Input
						label='아이디'
						placeholder='아이디를 입력해주세요.'></Input>
				</Grid>

				<Grid padding='16px 0px'>
					<Input
						label='비밀번호'
						placeholder='비밀번호를 입력해주세요.'></Input>
				</Grid>

				<Button width='100%' backgroundColor='#000' color="#fff">
					로그인
				</Button>
			</Grid>
		</React.Fragment>
	);
};

Login.defaultProps = {};

export default Login;
