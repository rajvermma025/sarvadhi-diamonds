import { createRoot } from "react-dom/client";
import ThemeWrapper from "./ThemeWrapper.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<ThemeWrapper>
		<App />
	</ThemeWrapper>
	// </StrictMode>
);
