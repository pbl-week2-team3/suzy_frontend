// PostList.js
import React from "react";

import Post from "../components/Post";

const PostList = (props) => {
	return (
		<React.Fragment>
			<Post />
		</React.Fragment>
	);
};

Post.defaultProps = {
	userInfo: {
		userName: "고양이춘식",
		userProfileImgUrl:
			"http://file3.instiz.net/data/file3/2021/05/31/8/a/e/8ae8b885252bcb45a83f141a8aad00e5.png",
	},
	imgUrl: "https://c.tenor.com/Q5ETLkSFYfcAAAAC/chunsik-%EC%B6%98%EC%8B%9D.gif",
	contents: "춘식이는 언제나봐도 귀여워!",
	commentCount: 10,
	regDate: "2022-02-16 10:00:00",
};

export default PostList;
