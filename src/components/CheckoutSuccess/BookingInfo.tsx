import moment from "moment";
import React from "react";
import { useLocation } from "react-router-dom";
import { Payment } from "../../models/payment";

const BookingInfo: React.FC<{ payment: Payment | null }> = ({ payment }) => {
  const location: any = useLocation();

  function getNumberOfDays(start: any, end: any) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  const nights = getNumberOfDays(
    location.state.information.dateRange.startDate,
    location.state.information.dateRange.endDate
  );

  return (
    <div className="booking__info">
      <h2>Your booking</h2>
      <div className="booking__description">
        <div className="booking__type">
          <span>Room type: </span>
          <p>{payment?.detailRoom.roomType}</p>
        </div>
        <div className="booking__details">
          <h4 className="booking__details__text">Your trip</h4>
          <div className="booking__detail">
            <span>Date</span>
            <p>
              {moment(location.state.information.dateRange.startDate)
                .subtract(10, "days")
                .calendar()}{" "}
              -{" "}
              {moment(location.state.information.dateRange.endDate)
                .subtract(10, "days")
                .calendar()}
            </p>
          </div>
          <div className="booking__detail">
            <span>Number of night</span>
            <p>{nights}</p>
          </div>
          <div className="booking__detail">
            <span>Adults</span>
            <p>{location.state.information.customerQuantity.adults}</p>
          </div>
          <div className="booking__detail">
            <span>Childs</span>
            <p>{location.state.information.customerQuantity.children}</p>
          </div>
          <div className="booking__detail">
            <span>Rooms</span>
            <p>{location.state.information.customerQuantity.rooms}</p>
          </div>
        </div>

        <div className="booking__details">
          <h4>Price details</h4>
          <div className="booking__detail">
            <span>{nights} night(s)</span>
            <p>${location.state.information.price || 1}</p>
          </div>
        </div>
        <div className="booking__details">
          <div className="booking__detail">
            <h5>Subtotal</h5>
            <p>${location.state.information.price || 1}</p>
          </div>
          <div className="booking__detail">
            <h5>Tax</h5>
            <p>$0,00</p>
          </div>
        </div>
        <div className="booking__total__price">
          <h4>Pay Amount</h4>
          <h4>${location.state.information.price || 1}</h4>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
