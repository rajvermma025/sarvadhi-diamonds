import NotificationProvider from "./NotificationWrapper";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainRoutes from "./MainRoutes";
import "./App.css";

function App() {
	return (
		<Provider store={store}>
			<NotificationProvider>
				<BrowserRouter>
					<MainRoutes />
				</BrowserRouter>
			</NotificationProvider>
		</Provider>
	);
}

export default App;
