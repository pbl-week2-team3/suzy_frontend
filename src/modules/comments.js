import { atom, selector } from "recoil";

// atoms
export const commentState = atom({
	key: "commentState",
	default: [],
});

// selectors
export const getComments = selector({
	key: "get/getComments",
	get: async () => {},
});
