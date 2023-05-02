import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import BookingInfo from "./BookingInfo";
import ModalSuccess from "./ModalSuccess";
import UserInfo from "./UserInfo";

const CheckoutSuccess = () => {
  const payment = useAppSelector((state) => state.payment);
  const navigate = useNavigate();

  if (!payment.payment?.detailUser || !payment.payment.detailRoom) {
    navigate("/404");
  }

  console.log(payment);
  return (
    <div className="modal__description">
      <ModalSuccess payment={payment.payment} />
      <div className="booking booking-success">
        <UserInfo user={payment.payment?.detailUser} />
        <BookingInfo payment={payment.payment} />
      </div>
    </div>
  );
};

export default CheckoutSuccess;
