import "./App.css";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "../pages/PostList";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Header from "./Header";

import { Grid } from "../elements";

function App() {
	return (
		<React.Fragment>
			<Grid>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path='/' element={<PostList />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</BrowserRouter>
			</Grid>
		</React.Fragment>
	);
}

export default App;
