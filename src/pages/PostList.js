// PostList.js
import React from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";

import { postSelector } from "../modules/posts";

import Post from "../components/Post";
import { LoadingSpinner } from "../elements";
import { loginUserSelector } from "../modules/users";


const PostList = ({ history }) => {
	const posts = useRecoilValue(postSelector);
	console.log(posts);
	const postLoadable = useRecoilValueLoadable(postSelector);

	React.useEffect(() => {
		
	}, [postLoadable.state]);

	// eslint-disable-next-line default-case
	switch (postLoadable.state) {
		case "hasValue":
			return (
				<React.Fragment>
					{posts.map((p, idx) => {
						return <Post post={p} key={idx} />;
					})}
				</React.Fragment>
			);
		case "loading":
			return (
				<React.Fragment>
					<LoadingSpinner />
				</React.Fragment>
			);
		case "hasError":
			throw postLoadable.contents;
	}
};

export default PostList;
