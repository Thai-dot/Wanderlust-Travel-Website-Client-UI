import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Destination } from "../../models";
import { Hotel } from "../../models/hotel";

export interface DestinationState {
  loading: boolean;
  destinations: Destination[] | null;
  loadingOne: boolean;
  destination: Destination | null;
  hotels: Hotel[] | null;
}

const initialState: DestinationState = {
  loading: false,
  destinations: null,
  hotels: [],
  loadingOne: false,
  destination: null,
};

const DestinationSlice = createSlice({
  name: "destination",
  initialState: initialState,
  reducers: {
    getAll(state) {
      state.loading = true;
    },
    getAllSuccess(state, action: PayloadAction<Destination[]>) {
      state.loading = false;
      state.destinations = action.payload;
    },
    getAllFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action.payload);
    },
    getOne(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    getOneSuccess(
      state,
      action: PayloadAction<{ hotels: Hotel[]; destination: Destination }>
    ) {
      state.loading = false;
      state.destination = action.payload.destination;
      state.hotels = action.payload.hotels;
    },
    getOneFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      toast.error(action.payload);
    },
  },
});

export const destinationAction = DestinationSlice.actions;
const destinationReducer = DestinationSlice.reducer;

export default destinationReducer;
