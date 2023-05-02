import { all, call, put, takeEvery } from "redux-saga/effects";
import paymentApi from "../../api/paymentApi";
import { Payment } from "../../models/payment";
import { paymentAction } from "./paymentSlice";

function* handleCreatePayment({
  type,
  payload,
}: {
  type: string;
  payload: { id: string; payment: Payment };
}) {
  try {
    const response: Payment = yield call(paymentApi.create, {
      id: payload.id,
      payment: payload.payment,
    });
    if (response._id) {
      yield put(paymentAction.createPaymentSuccess(response));
    } else {
      yield put(paymentAction.createPaymentFailed("Invalid token"));
    }
  } catch (error: any) {
    yield put(paymentAction.createPaymentFailed(error.message));
  }
}

function* paymentSaga() {
  yield all([takeEvery(paymentAction.createPayment.type, handleCreatePayment)]);
}

export default paymentSaga;
