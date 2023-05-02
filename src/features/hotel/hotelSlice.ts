import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hotel } from "../../models/hotel";

export interface HotelState {
  hotels: Hotel[];
  loading: boolean;
  hotel: Hotel | null;
  loadingHotel: boolean;
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  hotel: null,
  loadingHotel: false,
};

const HotelSlice = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: {
    getAll(state) {
      state.loading = true;
    },
    getAllSuccess(state, action: PayloadAction<Hotel[]>) {
      state.loading = false;
      state.hotels = action.payload;
    },
    getAllFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action.payload);
    },
    getOne(state, action: PayloadAction<{ hotelId: string }>) {
      state.loadingHotel = true;
    },
    getOneSuccess(state, action: PayloadAction<Hotel>) {
      state.loadingHotel = false;
      state.hotel = action.payload;
    },
    getOneFailed(state, action: PayloadAction<Hotel>) {
      state.loadingHotel = false;
      console.log(action.payload);
    },
  },
});

export const hotelAction = HotelSlice.actions;
const hotelReducer = HotelSlice.reducer;
export default hotelReducer;
