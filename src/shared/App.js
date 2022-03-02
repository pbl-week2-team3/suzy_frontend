import React,  {Suspense, lazy} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { history } from "../utils/history";
import { useRecoilValue } from "recoil";
import { loginState } from "../modules/users";

import "./App.css";
import Header from "./Header";
// import {
// 	PostList,
// 	Signup,
// 	Login,
// 	NewPost,
// 	EditPost,
// 	LikesList,
// } from "../pages/index";
import { LoadingSpinner, FloatingButton, Container } from "../elements";


const PostList = lazy(() => import("../pages/PostList"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const NewPost = lazy(() => import("../pages/NewPost"));
const EditPost = lazy(() => import("../pages/EditPost"));

function App() {
	const isLogin = useRecoilValue(loginState);

	return (
		<Suspense fallback={<LoadingSpinner />}>
				<BrowserRouter history={history}>
					<Header />
					<Routes>
						<Route path='/' element={<PostList />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/login' element={<Login />} />
						<Route path='/new' element={<NewPost />} />
						<Route path='/edit/:postId' element={<EditPost />} />
					</Routes>
					<Link to='/new'>
						<FloatingButton active={isLogin}>+</FloatingButton>
					</Link>
				</BrowserRouter>
		</Suspense>
	);
}

export default App;
