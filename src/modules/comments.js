import { atom, selector } from "recoil";
import axios from "axios";

export const commentState = atom({
	key: "commentState",
	default: [],
});

export const getComments = selector({
	key: "get/getComments",
	get: async () => {
		const {data} = await axios.get('http://localhost:3000/api/comments.json');
		console.log(data);
		return data;
	},
});
