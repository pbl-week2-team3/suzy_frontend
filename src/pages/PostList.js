// PostList.js
import React from "react";
import { useRecoilValue } from "recoil";

import Post from "../components/Post";

// import { postState } from "../modules/state";
import { postState, getPosts } from "../modules/posts";

const PostList = (props) => {
	const posts = useRecoilValue(getPosts);
	console.log(posts);

	// fetch("http://localhost:3000/api/posts.json", {
	// 	method: "GET",
	// })
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		let list = [];
	// 			data.forEach(d => {
	// 				list.push(d);
	// 			});
	// 		console.log(list);
	// 	});

	return (
		<React.Fragment>
			{posts.map((p, idx) => {
				return <Post post={p} key={idx} />;
			})}
		</React.Fragment>
	);
};

export default PostList;
