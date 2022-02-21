import { atom, selector, selectorFamily } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase";
import {v4} from "uuid";

export const postState = atom({
	key: "postState",
	default: [],
});

export const fileState = atom({
	key: "postState",
	default: [],
});

export const getPosts = selector({
	key: "get/getPosts",
	get: async () => {
		const { data } = await axios.get(
			"http://localhost:3000/api/posts.json"
		);
		return data;
	},
});

export const createPost = selectorFamily({
	key: "post/createPost",
	get: (text, loginUser) => async () => {
		const navigate = useNavigate();

		// let imgUrl = "";
		// const imgRef = storage.ref().child(`images/${v4()}`);
		// imgRef.put(file);
		// const response = await imgRef.putString(previewImage,"data_url");
		// imgUrl = await response.ref.getDownloadURL();

		const {userId, nickname, profileImgUrl} = loginUser;

		const data = {
			id: 4,
			imgUrl: "https://c.tenor.com/DtO_BhH5NUAAAAAC/chunsik-%EC%B6%98%EC%8B%9D.gif",
			userId: userId,
			nickname: nickname,
			profileImgUrl: profileImgUrl,
			likeCount: 0,
			likeCheck: false,
			regDate: Date.now(),
		};
		await axios.post("http://localhost:3000/api/posts.json", data);
		navigate("/");
	},
});

export const updatePost = selector({
	key: "post/updatePost",
	get: async () => {},
});

export const deletePost = selector({
	key: "post/deletePost",
	get: async () => {},
});
