import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IBroker, IBrokerState } from "../../Interfaces/App/brokers";
import axios from "axios";

const API_URL = "http://localhost:5000/brokers";

export const fetchBrokers = createAsyncThunk<IBroker[]>("brokers/fetchBrokers", async () => {
	const response = await axios.get(API_URL);
	return response.data;
});

export const addBroker = createAsyncThunk<IBroker, IBroker>("brokers/addBroker", async (broker) => {
	const response = await axios.post(API_URL, broker);
	return response.data;
});

export const updateBroker = createAsyncThunk<IBroker, { id: string; broker: Omit<IBroker, "id"> }>("brokers/updateBroker", async ({ id, broker }) => {
	const response = await axios.put(`${API_URL}/${id}`, broker);
	return response.data;
});

export const deleteBroker = createAsyncThunk<string, string>("brokers/deleteBroker", async (id) => {
	await axios.delete(`${API_URL}/${id}`);
	return id;
});

const initialState: IBrokerState = {
	brokers: [],
	selectedBroker: null,
	status: "idle",
	error: null,
};

const brokerSlice = createSlice({
	name: "brokers",
	initialState,
	reducers: {
		setSelectedBroker: (state, action: PayloadAction<IBroker | null>) => {
			state.selectedBroker = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBrokers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBrokers.fulfilled, (state, action: PayloadAction<IBroker[]>) => {
				state.status = "succeeded";
				state.brokers = action.payload;
			})
			.addCase(fetchBrokers.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to fetch brokers";
			})
			.addCase(addBroker.fulfilled, (state, action: PayloadAction<IBroker>) => {
				state.brokers.push(action.payload);
			})
			.addCase(updateBroker.fulfilled, (state, action: PayloadAction<IBroker>) => {
				const index = state.brokers.findIndex((broker) => broker.id === action.payload.id);
				if (index !== -1) state.brokers[index] = action.payload;
			})
			.addCase(deleteBroker.fulfilled, (state, action: PayloadAction<string>) => {
				state.brokers = state.brokers.filter((broker) => broker.id !== action.payload);
			});
	},
});

export const { setSelectedBroker } = brokerSlice.actions;
export default brokerSlice.reducer;
