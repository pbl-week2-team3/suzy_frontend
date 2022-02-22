import { atom, selectorFamily, useRecoilValue, useSetRecoilState } from "recoil";
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

	async function login(id, password) {
		if ((id, password)) {
			await apis
				.login(id, password)
				.then((res) => {
					if (res.data[0].success) {
						localStorage.setItem("userId", id);
						setCookie("token", res.data[0].token, 1);
						setCookie("userPwd", password, 1);
						setLoginState(true);
						navigate("/");
					}
				})
				.catch((e) => {
					window.alert("잘못된 로그인 요청입니다.");
				});
		}
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
		if (password === confirmPassword) {
			if ((id, nickname, password, profileImgUrl)) {
				await apis
					.signup(id, nickname, password, profileImgUrl)
					.then(navigate("/"));
			} else {
				window.alert("비밀번호와 확인 비밀번호가 일치하지 않습니다");
			}
		}
	}

	return { login, logout, signup };
}