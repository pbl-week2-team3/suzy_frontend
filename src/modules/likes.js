import { atom, selector, useSetRecoilState } from "recoil";
import axios from "axios";

export const likeState = atom({
	key: "likeState",
	default: [
		{
			
		}
	],
});

// refactoring : 전체 likes DB 안 불러오고 count만 fetchin
export const getLikeList = selector({
	key: "get/getLikeCount",
	get: async () => {
	},
});

export const addLikes = selector({
	key: "get/addLikes",
	get: async () => {
		const {data} = await axios.get('http://localhost:3000/api/posts.json');
		return data;
	},
});

export const cancelLikes = selector({
	key: "get/cancelLikes",
	get: async (id) => {
	},
});
