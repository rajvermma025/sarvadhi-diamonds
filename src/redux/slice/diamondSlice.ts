import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IDiamond, IDiamondState } from "../../Interfaces/App/Diamonds";
import axios from "axios";

const API_URL = "http://localhost:5000/diamonds";

export const fetchDiamonds = createAsyncThunk<IDiamond[]>("diamonds/fetchDiamonds", async () => {
	const response = await axios.get(API_URL);
	return response.data;
});

export const addDiamonds = createAsyncThunk<IDiamond, IDiamond>("diamonds/addDiamonds", async (diamond) => {
	const response = await axios.post(API_URL, diamond);
	return response.data;
});

export const updateDiamond = createAsyncThunk<IDiamond, { id: string; diamond: Omit<IDiamond, "id"> }>("diamonds/updateDiamond", async ({ id, diamond }) => {
	const response = await axios.put(`${API_URL}/${id}`, diamond);
	return response.data;
});

export const deleteDiamond = createAsyncThunk<string, string>("diamonds/deleteDiamond", async (id) => {
	await axios.delete(`${API_URL}/${id}`);
	return id;
});

const initialState: IDiamondState = {
	diamonds: [],
	selectedDiamond: null,
	status: "idle",
	error: null,
};

const DiamondSlice = createSlice({
	name: "diamonds",
	initialState,
	reducers: {
		setSelectedDiamond: (state, action: PayloadAction<IDiamond | null>) => {
			state.selectedDiamond = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDiamonds.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDiamonds.fulfilled, (state, action: PayloadAction<IDiamond[]>) => {
				state.status = "succeeded";
				state.diamonds = action.payload;
			})
			.addCase(fetchDiamonds.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to fetch diamonds";
			})
			.addCase(addDiamonds.fulfilled, (state, action: PayloadAction<IDiamond>) => {
				state.diamonds.push(action.payload);
			})
			.addCase(updateDiamond.fulfilled, (state, action: PayloadAction<IDiamond>) => {
				const index = state.diamonds.findIndex((diamond) => diamond.id === action.payload.id);
				if (index !== -1) state.diamonds[index] = action.payload;
			})
			.addCase(deleteDiamond.fulfilled, (state, action: PayloadAction<string>) => {
				state.diamonds = state.diamonds.filter((diamond) => diamond.id !== action.payload);
			});
	},
});

export const { setSelectedDiamond } = DiamondSlice.actions;
export default DiamondSlice.reducer;
