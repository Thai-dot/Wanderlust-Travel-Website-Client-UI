import { all, call, put, takeEvery } from "redux-saga/effects";
import hotelApi from "../../api/hotelApi";
import { Hotel } from "../../models/hotel";
import { hotelAction } from "./hotelSlice";

function* handleGetAllHotel() {
  try {
    const response: Hotel[] = yield call(hotelApi.getAll, {});

    yield put(hotelAction.getAllSuccess(response));
  } catch (error: any) {
    console.log(error.message);
    yield put(hotelAction.getAllFailed(error.message));
  }
}

function* getHotelById({
  type,
  payload,
}: {
  type: string;
  payload: { hotelId: string };
}) {
  try {
    const response: Hotel = yield call(hotelApi.get, payload.hotelId);

    yield put(hotelAction.getOneSuccess(response));
  } catch (error: any) {
    yield put(hotelAction.getOneFailed(error.message));
  }
}

export default function* hotelSaga() {
  yield all([
    handleGetAllHotel(),
    takeEvery(hotelAction.getOne.type, getHotelById),
  ]);
}
