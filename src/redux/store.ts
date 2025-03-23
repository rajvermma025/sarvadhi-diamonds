import { configureStore } from "@reduxjs/toolkit";
import diamondSlice from "./slice/diamondSlice";
import brokerSlice from "./slice/brokerSlice";

export const store = configureStore({
	reducer: {
		broker: brokerSlice,
		diamond: diamondSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
