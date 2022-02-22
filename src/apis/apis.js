import axios from "axios";

const api = axios.create({
	baseUrl: "http://localhost:3000",
	headers: {
		"content-type": "application/json;charset=UTF-8",
		accept: "application/json",
	},
});

api.interceptors.request.use(function (config) {
	const accessToken = document.cookie.split("=")[1];
	config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
	return config;
});

export const apis = {
	// post
    posts: () => api.get("/api/posts.json"),
    post: (postId) => api.get(`/api/post/${postId}.json`),
    add: (userId, contents, img_url) => api.post("/api/post.json", {userId, contents, img_url}),
    delete: (postId) => api.delete(`/api/post/${postId}.json`),
    edit: (postId, contents, imgUrl) => api.put(`/api/post/${postId}.json`, {contents, imgUrl}), 

    // comment
    alarm: () => api.get("/api/alarm"),
    addComment: (postId, text) => api.post(`/api/comment/${postId}`, {text}),
    editComment: (postId, commentId, text) => api.put(`/api/comment/${postId}/${commentId}`, {text}),
    deleteComment: (postId, commentId) => api.put(`/api/comment/${postId}/${commentId}`),

    // like
    addLike: (postId) => api.post(`/api/post/${postId}/like`),
    cancelLike: (postId) => api.delete(`/api/post/${postId}/like`),

    // user
    // password confirm은 클라이언트단에서 해도 될 건데?
    signup: (id, nickname, password, confirmPassword, profileImgUrl) => (
        api.post("/api/register", {
            id, nickname, password, confirmPassword, profileImgUrl
        })
    ),
    login: (id, password) => api.get("/api/login.json", {id, password}),
    getLoginUserInfo: (id) => api.get("/api/loginUser.json"),
};
