import { APP_ROUTE } from "../Constants/AppRoutes";
import Transaction from "../Pages/Transaction";
import { Route, Routes } from "react-router";
import Diamonds from "../Pages/Diamonds";
import Brokers from "../Pages/Brokers";
import Layout from "../Layout";

const MainRoutes = () => {
	return (
		<Routes>
			<Route path={APP_ROUTE.BROKERS} element={<Layout />}>
				<Route index element={<Brokers />} />
				<Route path={APP_ROUTE.DIAMONDS} element={<Diamonds />} />
				<Route path={APP_ROUTE.TRANSECTIONS} element={<Transaction />} />
			</Route>
		</Routes>
	);
};

export default MainRoutes;
