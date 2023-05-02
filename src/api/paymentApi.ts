import { Payment } from "../models/payment";
import axiosClient from "./axiosClient";

const paymentApi = {
  create: ({
    id,
    payment,
  }: {
    id: string;
    payment: Payment;
  }): Promise<Payment> => {
    console.log(id, payment);
    const url = `/payment/room/${id}`;
    return axiosClient.post(url, payment);
  },
};

export default paymentApi;
