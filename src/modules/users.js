import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";

import axios from "axios";

import { setCookie, deleteCookie } from "../shared/Cookie";
import { useNavigate } from "react-router-dom";
import { apis } from "../apis/apis";

// atoms
// loginState : 인증된 사용자가 로그인되어 있는지 상태
export const loginState = atom({
	key: "loginState",
	default: false,
});

// loginUserState : 로그인되어 있는 사용자의 정보
// 로그인하면서 setLoginUserState
export const loginUserState = atom({
	key: "loginUserState",
	default: {
		userId: "",
		nickname: "",
		profileImgUrl: "",
	},
});

// selector
export const loginUserSelector = selectorFamily({
	key: "loginUserSelector",
	get: (userId) => async () => {
		const { userInfo } = await apis.getLoginUserInfo(userId);

		if (userInfo) {
			return userInfo;
		} else {
			return {
				userId: "",
				nickname: "",
				profileImgUrl: "",
			};
		}
	},
	set: ({ set }, loginUser) => {
		set(loginUserState, loginUser);
	},
});

// action hooks
// login, logout, signup
export function useUserActions() {
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);

	// Axios.post('/auth/login', variables)
	// .then(res => {
	//   setCookie('token', res.payload.accessToken)
	//   setCookie('exp', res.payload.accessTokenExpiresIn)
	//   // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
	//   Axios.defaults.headers.common['Authorization'] = `Bearer ${res.payload.accessToken}`
	//   Axios.get('/user/me')
	//     .then(res => {
	//       console.log(res);
	//     })
	// })

	async function login(id, password) {
		axios.post("http://52.78.200.34/api/login", {id, password}).then(res => {
			console.log(res.payload);
			setCookie("token", res.payload.accessToken)
			setCookie("exp", res.payload.accessTokenExpiresIn)
			axios.defaults.headers.common["Authorization"] = `${res.payload.accessToken}`;
			console.log(res);
		})
	}

	function logout() {
		localStorage.setItem("userId", null);
		deleteCookie("token");
		deleteCookie("userPwd");
		setLoginState(false);
		navigate("/login");
	}

	async function signup(
		id,
		nickname,
		password,
		confirmPassword,
		profileImgUrl
	) {
		const regExp =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

		if (
			id === "" ||
			nickname === "" ||
			password === "" ||
			confirmPassword === ""
		) {
			window.alert("모든 항목들을 기입해주세요");
		} else {
			if (id.match(regExp) === null) {
				window.alert("아이디는 이메일 형식으로 기입해주세요");
			} else {
				if (password !== confirmPassword) {
					window.alert(
						"비밀번호와 확인 비밀번호가 일치하지 않습니다"
					);
				} else {
					await apis
						.signup(id, nickname, password, profileImgUrl)
						.then(navigate("/"));
				}
			}
		}
	}
	return { login, logout, signup };
}
