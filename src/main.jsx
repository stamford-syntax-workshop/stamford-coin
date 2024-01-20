import React from "react";
import ReactDOM from "react-dom/client";

import "@radix-ui/themes/styles.css";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AppLayout from "./Layout";
import CoinsPage from "./pages/Coins";
import FourOhFour from "./pages/FourOhFour";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppLayout>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/coins/:uuid" element={<CoinsPage />} />
					<Route path="*" element={<FourOhFour />} />
				</Routes>
			</AppLayout>
		</BrowserRouter>
	</React.StrictMode>,
);
