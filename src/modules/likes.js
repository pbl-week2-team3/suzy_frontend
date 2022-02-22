import { atom, selector} from "recoil";
import { apis } from "../apis/apis";

// atoms
export const likeState = atom({
	key: "likeState",
	default: [],
});

// selectors
export const whoLikeListSelector = selector({
	key: "get/getLikeCount",
	get: async () => {},
});

// action hooks
export function useLikeActions() {

	async function increaseLikeCount(postId) {
		await apis.addLike(postId);
	}

	async function decreaseLikeCount(postId) {
		await apis.cancelLike(postId);
	}

	return {increaseLikeCount, decreaseLikeCount};
}
