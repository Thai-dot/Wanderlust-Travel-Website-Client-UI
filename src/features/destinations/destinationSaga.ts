import { all, call, put, takeEvery } from "redux-saga/effects";
import destinationApi from "../../api/destinationApi";
import hotelApi from "../../api/hotelApi";
import { Destination } from "../../models";
import { Hotel } from "../../models/hotel";
import { destinationAction } from "./destinationSlice";

function* handleGetAll() {
  try {
    const response: Destination[] = yield call(destinationApi.getAll, {});

    yield put(destinationAction.getAllSuccess(response));
  } catch (error: any) {
    yield put(destinationAction.getAllFailed(error.message));
  }
}

function* handleGetOne({ type, payload }: { payload: string; type: string }) {
  try {
    const response: Destination = yield call(destinationApi.getById, payload);
    const hotels: Hotel[] = yield call(hotelApi.getAllByDesId, payload);
    console.log(hotels);

    if (typeof response === "string") {
      yield put(destinationAction.getOneFailed("Destination not found"));
      return;
    }

    yield put(
      destinationAction.getOneSuccess({
        destination: response,
        hotels,
      })
    );
  } catch (error: any) {
    yield put(destinationAction.getOneFailed(error.message));
  }
}

function* watchGetOne() {
  yield takeEvery(destinationAction.getOne.type, handleGetOne);
}

export default function* destinationSaga() {
  yield all([handleGetAll(), watchGetOne()]);
}
