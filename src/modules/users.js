import {
	atom,
	selector,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import { setCookie, deleteCookie } from "../shared/Cookie";
import { useNavigate } from "react-router-dom";

export const loginState = atom({
	key: "loginState",
	default: false,
});

export const loginUserState = atom({
	key: "loginUserState",
	default: {
		userId: "master@aaa.com",
		nickname: "마스터춘식",
		profileImgUrl:
			"http://file3.instiz.net/data/file3/2021/05/31/0/a/e/0ae5e800bede3f537a0426f62f2af8af.png",
	},
});

// export const userState = selector({
//     key: "posts/get",
//     get: () => async() => {
//         const {user} = await axios.get();
//         console.log(user);
//         return user;
//     },
// });

export const userState = atom({
	key: "userState",
	default: [
		{
			id: "master@aaa.com",
			userName: "춘식이마스터",
			nickname: "춘식이마스터",
			profileImgUrl:
				"http://file3.instiz.net/data/file3/2021/05/31/0/a/e/0ae5e800bede3f537a0426f62f2af8af.png",
		},
	],
});

// 구현 필요
export const getLoginUserInfo = selectorFamily({
	key: "get/getLoginUserInfo",
	get: (userId) => async () => {},
});

export const signup = selectorFamily({
	key: "post/signup",
	get: (user) => async () => {
		const navigate = useNavigate();
		navigate("/");
	},
});

export function useUserActions() {
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);

	function login(id, password) {
		if ((id, password)) {
			fetch("http://localhost:3000/auth/login.json", {
				method: "GET",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data[0]);
					if (data[0].success) {
						localStorage.setItem("token", data.token);
						setCookie("userId", id, 3);
						setCookie("userPwd", password, 3);
						setLoginState(true);
						navigate("/");
					} else {
						window.alert("잘못된 로그인 정보입니다");
					}
				});
		}
	}

	function logout() {
		localStorage.setItem("token", null);
		deleteCookie("userId");
		deleteCookie("userPwd");
		setLoginState(false);
		navigate("/login");
	}

	return { login, logout };
}
