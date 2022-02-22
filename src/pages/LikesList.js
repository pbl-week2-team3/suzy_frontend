import React from "react";
import { Grid, Text} from "../elements";

const LikesList = ({history}) => {

	return (
		<React.Fragment>
			<Grid padding='16px'>
				<Text size='32px' bold>
					알림
				</Text>
				<div>

				</div>
			</Grid>
		</React.Fragment>
	);
};

LikesList.defaultProps = {};

export default LikesList;
