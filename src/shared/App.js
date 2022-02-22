import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { history } from "../utils/history";
import { useRecoilValue } from "recoil";
import { loginState } from "../modules/users";

import Header from "./Header";
import { PostList, Signup, Login, NewPost, LikesList } from "../pages/index";
import { FloatingButton, Grid } from "../elements";

function App() {
	const isLogin = useRecoilValue(loginState);

	return (
		<Grid>
			<BrowserRouter history={history}>
				<Header />
				<Routes>
					<Route path='/' element={<PostList />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/new' element={<NewPost />} />
					<Route path='/likes' element={<LikesList />} />
				</Routes>
				<Link to='/new'>
					<FloatingButton active={isLogin}>+</FloatingButton>
				</Link>
			</BrowserRouter>
		</Grid>
	);
}

export default App;
