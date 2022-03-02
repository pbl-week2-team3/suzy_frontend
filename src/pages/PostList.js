// PostList.js
import React from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";

import { postSelector } from "../modules/posts";

import Post from "../components/Post";
import { Container, LoadingSpinner } from "../elements";

const PostList = ({ history }) => {
	const posts = useRecoilValue(postSelector);
	// const setPostState = useSetRecoilState(postState);
	// const postLoadable = useRecoilValueLoadable(postSelector);

	

	return (
		<Container>
			{posts.map((p, idx) => {
				return <Post post={p} key={idx} />;
			})}
		</Container>
	);
};

export default PostList;
