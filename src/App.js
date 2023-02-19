import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Header />
			<div className="max-w-6xl mx-auto p-5">
				<Outlet />
			</div>
			<Footer />
		</>
	);
}

export default App;
