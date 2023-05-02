import moment from "moment";
import React, { Fragment, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import California from "../../assets/images/California.jpg";
import { roomAction } from "../../features/room/roomSlice";

const BookingInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roomAction.getRoomById(params.id as string));
  }, [params, dispatch]);

  const location: any = useLocation();

  const room = useAppSelector((state) => state.room);

  if (room.loadingRoom) {
    return <Skeleton height={"400px"} />;
  }

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
    location.state.dateRange.startDate,
    location.state.dateRange.endDate
  );
  return (
    <div className="booking__info">
      <h2>Your booking</h2>
      <div className="booking__description">
        <div className="booking__place">
          <div className="booking__place__image">
            <img src={room.room?.images[0]} alt="place" />
          </div>
          <div className="booking__place__info">
            <NavLink to={`/hotel/${room.room?.hotel._id}`}>
              <h4>{room.room?.hotel.nameHotel}</h4>
            </NavLink>
            <p>{room.room?.hotel.destination}</p>
          </div>
        </div>
        <div className="booking__type">
          <span>Room type: </span>
          <NavLink to={`/room/${room.room?._id}`}>
            <p>{room.room?.name}</p>
          </NavLink>
        </div>
        <div className="booking__details">
          <h4 className="booking__details__text">Your trip</h4>
          <div className="booking__detail">
            <span>Date</span>
            <p>
              {moment(location.state.dateRange.startDate)
                .subtract(10, "days")
                .calendar()}{" "}
              -{" "}
              {moment(location.state.dateRange.endDate)
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
            <p>{location.state.customerQuantity.adults}</p>
          </div>
          <div className="booking__detail">
            <span>Childs</span>
            <p>{location.state.customerQuantity.children}</p>
          </div>
          <div className="booking__detail">
            <span>Room</span>
            <p>{location.state.customerQuantity.rooms}</p>
          </div>
        </div>
        <div className="booking__details">
          <h4 className="booking__details__text">Coupon Code</h4>
          <div className="booking__detail">
            <input type="text" name="couponCode" />
            <button className="booking__detail__button">Apply</button>
          </div>
        </div>
        <div className="booking__details">
          <h4>Price details</h4>
          <div className="booking__detail">
            <span>{nights} night(s)</span>
            <p>${(room.room?.price || 1) * (nights + 1)}</p>
          </div>
        </div>
        <div className="booking__details">
          <div className="booking__detail">
            <h5>Subtotal</h5>
            <p>${(room.room?.price || 1) * (nights + 1)}</p>
          </div>
          <div className="booking__detail">
            <h5>Tax</h5>
            <p>$0,00</p>
          </div>
        </div>
        <div className="booking__total__price">
          <h4>Pay Amount</h4>
          <h4>${(room.room?.price || 1) * (nights + 1)}</h4>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
