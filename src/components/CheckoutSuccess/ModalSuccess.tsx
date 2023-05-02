import moment from "moment";
import React from "react";
import { Payment } from "../../models/payment";
import SuccessOrder from "./../../assets/images/success-order.svg";

const ModalSuccess: React.FC<{ payment: Payment | null }> = ({ payment }) => {
  return (
    <div className="modal__success">
      <div className="success__notify">
        <div className="success__notify__icon">
          <img src={SuccessOrder} alt="success" />
        </div>
        <div className="success__notify__text">
          <h3>Your order was submitted successfully!</h3>
          <p>
            <span className="gray">Booking details has been sent to</span>:{""}
            {payment?.detailUser.email}
          </p>
        </div>
      </div>
      <div className="informations">
        <div className="information">
          <span>Booking id: </span>
          <p>{payment?._id}</p>
        </div>
        <div className="information">
          <span>Transaction Date: </span>
          <p>{moment(payment?.createdAt).subtract(10, "days").calendar()}</p>
        </div>
        <div className="information">
          <span>Payment Method: </span>
          <p>{payment?.paymentMethod}</p>
        </div>
        <div className="information">
          <span>Status: </span>
          <p>Incomplete</p>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
