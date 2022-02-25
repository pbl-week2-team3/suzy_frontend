import axios from "axios";
import { getCookie } from "../shared/Cookie";

// 민수님
// baseURL: "http://onlyonep.shop",

// 승민님
// baseURL: "http://52.78.200.34",

// 정용님
// baseURL: "http://xpecter.shop",

const api = axios.create({
	baseURL: "http://xpecter.shop/",
    // baseURL: "http://onlyonep.shop/api/post",
	// baseUrl: "http://onlyonep.shop",
	headers: {
		"content-type": "application/json;charset=UTF-8",
		accept: "application/json",
	},
});

// .then()으로 넘어가기 전에 token을 header에 추가
api.interceptors.request.use(
    
    function (config) {
	    const accessToken = getCookie("token");
		console.log(accessToken);
	    config.headers.common["Authorization"] = `Bearer ${accessToken}`;
	    return config;
    }

);

export const apis = {
	// post
	posts: () => api.get("/api/post"),
	post: (postId) => api.get(`/api/post/${postId}`),
	add: (userId, contents, img_url) =>
		api.post("/api/post", { userId, contents, img_url }),
	delete: (postId) => api.delete(`/api/post/${postId}`),
	edit: (postId, contents, imgUrl) =>
		api.put(`/api/post/${postId}`, { contents, imgUrl }),

	// comment
	alarm: () => api.get("/api/alarm"),
	addComment: (postId, text) => api.post(`/api/comment/${postId}`, { text }),
	editComment: (postId, commentId, text) =>
		api.put(`/api/comment/${postId}/${commentId}`, { text }),
	deleteComment: (postId, commentId) =>
		api.put(`/api/comment/${postId}/${commentId}`),

	// like
	addLike: (postId) => api.post(`/api/post/${postId}/like`),
	cancelLike: (postId) => api.delete(`/api/post/${postId}/like`),

	// user
	// password confirm은 클라이언트단에서 해도 될 건데?
	signup: (id, nickname, password, confirmPassword, profileImgUrl) =>
		api.post("/api/register", {
			id,
			nickname,
			password,
			confirmPassword,
			profileImgUrl,
		}),
	login: (id, password) => api.get("/api/login", { id, password }),
	getLoginUserInfo: () => api.get("/api/loginUser"),
};
