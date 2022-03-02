// PostList.js
import React from "react";
import { useRecoilValue } from "recoil";

import { postSelector } from "../modules/posts";

import Post from "../components/Post";
import { Container } from "../elements";

const PostList = ({ history }) => {
	const posts = useRecoilValue(postSelector);

	return (
		<Container>
			{posts.map((p, idx) => {
				return <Post post={p} key={idx} />;
			})}
		</Container>
	);
};

export default PostList;
