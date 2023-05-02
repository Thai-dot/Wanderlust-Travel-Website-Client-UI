import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import destinationSaga from "../features/destinations/destinationSaga";
import favouriteSaga from "../features/favourite/favouriteSaga";
import hotelSaga from "../features/hotel/hotelSaga";
import paymentSaga from "../features/payment/paymentSaga";
import roomSaga from "../features/room/roomSaga";

export default function* rootSaga() {
  console.log("Root saga");
  yield all([
    authSaga(),
    destinationSaga(),
    hotelSaga(),
    favouriteSaga(),
    roomSaga(),
    paymentSaga(),
  ]);
}
