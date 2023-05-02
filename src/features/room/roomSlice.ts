import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Hotel } from "../../models/hotel";
import { Room } from "../../models/room";

export interface RoomState {
  loading: boolean;
  rooms: Room[];
  loadingRoom: boolean;
  room: Room | null;
}

const initialState: RoomState = {
  loading: false,
  rooms: [],
  loadingRoom: false,
  room: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState: initialState,
  reducers: {
    getAllByHotelId(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    getAllByHotelIdSuccess(state, action: PayloadAction<Room[]>) {
      state.loading = false;
      state.rooms = action.payload;
    },
    getAllByHotelIdFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      toast.error(action.payload);
    },
    getRoomById(state, action: PayloadAction<string>) {
      state.loadingRoom = true;
    },
    getRoomByIdSuccess(state, action: PayloadAction<Room>) {
      state.loadingRoom = false;
      state.room = action.payload;
    },
    getRoomByIdFailed(state, action: PayloadAction<string>) {
      state.loadingRoom = false;
      toast.error(action.payload);
    },
  },
});

export const roomAction = roomSlice.actions;

const roomReducer = roomSlice.reducer;
export default roomReducer;
