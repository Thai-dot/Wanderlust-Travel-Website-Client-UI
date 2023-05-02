import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
import destinationReducer from "../features/destinations/destinationSlice";
import hotelReducer from "../features/hotel/hotelSlice";
import favouriteReducer from "../features/favourite/favouriteSlice";
import roomReducer from "../features/room/roomSlice";
import paymentReducer from "../features/payment/paymentSlice";

const rootReducer = combineReducers({
  // router: connectRouter(history),
  auth: authReducer,
  destination: destinationReducer,
  hotel: hotelReducer,
  favourite: favouriteReducer,
  room: roomReducer,
  payment: paymentReducer,
});

const sagaMiddleWare = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
