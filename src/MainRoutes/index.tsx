import { APP_ROUTE } from "../Constants/AppRoutes";
import { Route, Routes } from "react-router";
import Brokers from "../Pages/Brokers";
import Layout from "../Layout";
import Diamonds from "../Pages/Diamonds";

const MainRoutes = () => {
	return (
		<Routes>
			<Route path={APP_ROUTE.BROKERS} element={<Layout />}>
				<Route index element={<Brokers />} />
				<Route path={APP_ROUTE.DIAMONDS} element={<Diamonds />} />
			</Route>
		</Routes>
	);
};

export default MainRoutes;
