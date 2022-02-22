import React from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

import { loginState, useUserActions } from "../modules/users";

import { Grid, Text, Button } from "../elements";

const Header = (props) => {
	const userActions = useUserActions();
	const isLogin = useRecoilValue(loginState);

	if (isLogin) {
		return (
			<React.Fragment>
				<Grid padding='4px 16px'>
					<Grid isFlex>
						<Grid>
							<Link to='/'>
								<Text margin='0px' size='24px' bold>
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
				</Grid>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<Grid padding='4px 16px'>
					<Grid isFlex>
						<Grid>
							<Link to='/'>
								<Text margin='0px' size='24px' bold>
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
				</Grid>
			</React.Fragment>
		);
	}
};

Header.defaultProps = {};

export default Header;
