import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Grid, Text, Button } from "../elements";

const Header = (props) => {
	const navigate = useNavigate();

	return (
		<React.Fragment>
			<Grid isFlex padding='4px 16px'>
				<Grid>
					<Link to='/'>
						<Text margin='0px' size='24px' bold>
							community.io
						</Text>
					</Link>
				</Grid>

				<Grid isFlex>
					<Link to='/signup'>
						<Button>회원가입</Button>
					</Link>
					<Link to='/login'>
						<Button>로그인</Button>
					</Link>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

Header.defaultProps = {};

export default Header;
