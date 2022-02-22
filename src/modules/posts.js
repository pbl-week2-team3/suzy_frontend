import { atom, selector } from "recoil";
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


// action hooks
// createPost, editPost, deletsPost
export function usePostActions() {
	const navigate = useNavigate();

	async function createPost(text, loginUser) {
		const { userId, nickname, profileImgUrl } = loginUser;

		// 이미지 url 추출 부분 수정 필요 (firestorage에 이미지 업로드하는 방향으로 임시 구현)
		// let imgUrl = "";
		// const imgRef = storage.ref().child(`images/${v4()}`);
		// imgRef.put(file);
		// const response = await imgRef.putString(previewImage,"data_url");
		// imgUrl = await response.ref.getDownloadURL();

		let fakeImgUrl =
			"https://c.tenor.com/DtO_BhH5NUAAAAAC/chunsik-%EC%B6%98%EC%8B%9D.gif";
		await apis.add(userId, text, fakeImgUrl);
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
