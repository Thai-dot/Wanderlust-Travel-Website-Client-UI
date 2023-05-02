import { call, put, takeEvery } from "redux-saga/effects";
import roomApi from "../../api/roomApi";
import { Room } from "../../models/room";
import { roomAction } from "./roomSlice";

function* handleGetAllRoomsByHotelId({
  type,
  payload,
}: {
  type: string;
  payload: string;
}) {
  try {
    const response: Room[] = yield call(roomApi.getAllByHotelId, {
      query: {},
      hotelId: payload,
    });

    if (typeof response === "string") {
      yield put(roomAction.getAllByHotelIdFailed(response));
      return;
    }

    yield put(roomAction.getAllByHotelIdSuccess(response));
  } catch (error: any) {
    yield put(roomAction.getAllByHotelIdFailed(error.message));
  }
}

function* getRoomById({ type, payload }: { type: string; payload: string }) {
  try {
    const response: Room = yield call(roomApi.get, payload);

    if (typeof response === "string") {
      yield put(roomAction.getRoomByIdFailed(response));
    }

    yield put(roomAction.getRoomByIdSuccess(response));
  } catch (error: any) {
    yield put(roomAction.getRoomByIdFailed(error.message));
  }
}

function* roomSaga() {
  yield takeEvery(roomAction.getAllByHotelId.type, handleGetAllRoomsByHotelId);
  yield takeEvery(roomAction.getRoomById.type, getRoomById);
}

export default roomSaga;
