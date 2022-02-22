import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import reportWebVitals from "./reportWebVitals";

import { RecoilRoot } from "recoil";
import { LoadingSpinner } from "./elements";

ReactDOM.render(
	<RecoilRoot>
		<Suspense fallback={<LoadingSpinner />}>
			<App />
		</Suspense>
	</RecoilRoot>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
