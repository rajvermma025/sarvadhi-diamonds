import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
	return (
		<main className="flex min-h-dvh items-stretch">
			<section className="flex flex-col w-full h-full">
				<Navbar />
				<div className="inner_wrap w-full h-full">
					<Outlet />
				</div>
			</section>
		</main>
	);
};

export default Layout;
