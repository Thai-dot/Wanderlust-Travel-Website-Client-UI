import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import favouriteApi from "../../api/favouriteApi";
import { Favourite } from "../../models";
import { favouriteAction } from "./favouriteSlice";

function* getAllFavourite() {
  try {
    const response: Favourite[] = yield call(favouriteApi.getAll, {});
    yield put(favouriteAction.getAllSuccess(response));
  } catch (error: any) {
    yield put(favouriteAction.getAllFailed(error.message));
  }
}

function* createFavourite({
  type,
  payload,
}: {
  type: string;
  payload: string;
}) {
  try {
    const response: Favourite = yield call(favouriteApi.create, payload);
    if (typeof response === "string") {
      yield put(favouriteAction.createFailed(response));
    } else yield put(favouriteAction.createSuccess(response));
  } catch (error: any) {
    yield put(favouriteAction.createFailed(error.message));
  }
}

function* handleCreateFavourite() {
  yield takeLatest(favouriteAction.create.type, createFavourite);
}

export default function* favouriteSaga() {
  yield all([getAllFavourite(), handleCreateFavourite()]);
}
