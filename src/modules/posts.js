import { atom, selector, selectorFamily } from "recoil";
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

	async function createPost(postId, text, imgUrl) {

		// 이미지 url 추출 부분 수정 필요 (firestorage에 이미지 업로드하는 방향으로 임시 구현)
		// let imgUrl = "";
		// const imgRef = storage.ref().child(`images/${v4()}`);
		// imgRef.put(file);
		// const response = await imgRef.putString(previewImage,"data_url");
		// imgUrl = await response.ref.getDownloadURL();

		await apis.add(postId, text, imgUrl);
		navigate("/");
	}

	async function editPost(postId, contents, ImgUrl) {
		// 이미지 url 추출 부분 수정 필요 (firestorage에 이미지 업로드하는 방향으로 임시 구현)
		// let imgUrl = "";
		// const imgRef = storage.ref().child(`images/${v4()}`);
		// imgRef.put(file);
		// const response = await imgRef.putString(previewImage,"data_url");
		// imgUrl = await response.ref.getDownloadURL();

		await apis.edit(postId, contents, ImgUrl);
		navigate("/");
	}

	async function deletePost(postId) {
		await apis.delete(postId);
		navigate("/");
	}

	return { createPost, editPost, deletePost };
}
