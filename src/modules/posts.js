import { atom, selector, selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { apis } from "../apis/apis";

import { storage } from "../firebase/firebase";
import { v4 } from "uuid";

// atoms
export const postState = atom({
	key: "postState",
	default: [],
});

// selectors
export const postSelector = selector({
	key: "postSelector",
	get: async () => {
		const { data } = await apis.posts();
		console.log(data);
		return data;
	},
	set: ({ set }, newPost) => {
		set(postState, (prevState) => ({
			...prevState,
			newPost,
		}));
	},
});

export const singlePostSelector = selectorFamily({
	key: "singlePostSelector",
	get: (postId) => async () => {
		const { data } = await apis.post(postId);
		return data;
	}
});


// action hooks
// createPost, editPost, deletsPost
export function usePostActions() {
	const navigate = useNavigate();
	const setPostState = useSetRecoilState(postState);

	async function createPost(userId, text, imgUrl) {
		const {response} = await apis.add(userId, text, imgUrl);
		if (response.success) {
			window.alert("포스트 등록을 완료하였습니다.");
			navigate("/");
		} else {
			window.alert("포스트 등록에 실패하였습니다. 다시 입력해주세요.");
		}
	}

	async function editPost(postId, contents, ImgUrl) {
		await apis
		.edit(postId, contents, ImgUrl)
		.then(window.alert("포스트 수정을 완료하였습니다."))
		.then(navigate("/"))
		.catch("포스트 수정에 실패했습니다.다시 입력해주세요.");
	}

	async function deletePost(postId) {
		const {response} = await apis.delete(postId);
		if (response.success) {
			setPostState({...postState});
			window.alert("삭제되었습니다");
		} else {
			window.alert("삭제에 실패했습니다");
		}
	}

	return { createPost, editPost, deletePost };
}
