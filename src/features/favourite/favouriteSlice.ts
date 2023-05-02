import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Favourite } from "../../models";

export interface FavouriteState {
  favourites: Favourite[];
  loading: boolean;
  favourite: Favourite | null;
  loadingFavourite: boolean;
}

const initialState: FavouriteState = {
  favourites: [],
  loading: true,
  favourite: null,
  loadingFavourite: true,
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: initialState,
  reducers: {
    getAll(state) {
      state.loading = true;
    },
    getAllSuccess(state, action: PayloadAction<Favourite[]>) {
      state.loading = false;
      state.favourites = action.payload;
    },
    getAllFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action.payload);
    },
    create(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    createSuccess(state, action: PayloadAction<Favourite>) {
      state.loading = false;
      state.favourites.push(action.payload);
      toast.success("Favourite added");
    },
    createFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      toast.error(action.payload);
    },
  },
});

export const favouriteAction = favouriteSlice.actions;
const favouriteReducer = favouriteSlice.reducer;
export default favouriteReducer;
