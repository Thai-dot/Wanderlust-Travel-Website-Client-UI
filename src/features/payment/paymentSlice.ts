import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Payment } from "../../models/payment";

interface PaymentState {
  payments: Payment[];
  loading: boolean;
  payment: Payment | null;
  loadingPayment: boolean;
}

const initialState: PaymentState = {
  payments: [],
  loading: false,
  payment: null,
  loadingPayment: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    getAll(state) {
      state.loading = true;
    },
    getAllSuccess(state, action: PayloadAction<Payment[]>) {
      state.loading = false;
      state.payments = action.payload;
    },
    getAllFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      toast.error(action.payload);
    },
    createPayment(
      state,
      action: PayloadAction<{ id: string; payment: Payment }>
    ) {
      state.loadingPayment = true;
    },
    createPaymentSuccess(state, action: PayloadAction<Payment>) {
      state.loadingPayment = false;
      state.payment = action.payload;
      toast.success("Payment created successfully");
    },
    createPaymentFailed(state, action: PayloadAction<string>) {
      state.loadingPayment = false;
      toast.error(action.payload);
    },
  },
});

export const paymentAction = paymentSlice.actions;
const paymentReducer = paymentSlice.reducer;
export default paymentReducer;
