import React from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

import { loginState, useUserActions } from "../modules/users";

import { Container, Grid, Text, Button } from "../elements";

const Header = (props) => {
	const userActions = useUserActions();
	const isLogin = useRecoilValue(loginState);

	if (isLogin) {
		return (
			<React.Fragment>
				<Container padding='4px 16px'>
					<Grid isFlex>
						<Grid>
							<Link to='/'>
								<Text font='Pacifico' margin='0px' size='24px' bold>
									community.io
								</Text>
							</Link>
						</Grid>

						<Grid isFlex>
							<Link to='/signup'>
								<Button backgroundColor='#000' color="#fff">내정보</Button>
							</Link>
							<Link to='/likes'>
								<Button backgroundColor='#000' color="#fff">알림</Button>
							</Link>
							<Button
								backgroundColor='#000'
								color='#fff'
								_onClick={() => {
									userActions.logout();
								}}>
								로그아웃
							</Button>
						</Grid>
					</Grid>
				</Container>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<Container minWidth='375px' padding='4px 16px'>
					<Grid isFlex>
						<Grid>
							<Link to='/'>
								<Text font="'Pacifico', cursive" margin='0px' size='32px'>
									community.io
								</Text>
							</Link>
						</Grid>

						<Grid isFlex>
							<Link to='/signup'>
								<Button backgroundColor='#000' color="#fff">회원가입</Button>
							</Link>
							<Link to='/login'>
								<Button backgroundColor='#000' color="#fff">로그인</Button>
							</Link>
						</Grid>
					</Grid>
				</Container>
			</React.Fragment>
		);
	}
};

Header.defaultProps = {};

export default Header;
