import { CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { paymentAction } from "../../features/payment/paymentSlice";
import { Payment } from "../../models/payment";
import CheckoutInput from "./CheckoutInput";

const UserInfo = () => {
  const user = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.room);
  const payment = useAppSelector((state) => state.payment);
  const location: any = useLocation();
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    setUserInput({
      ...userInput,
      firstName: user.currentUser?.fullName.split(" ")[0] as string,
      lastName: user.currentUser?.fullName.split(" ")[1] as string,
      email: user.currentUser?.email as string,
      phoneNumber: user.currentUser?.phoneNumber as string,
    });
  }, [user.loading]);

  if (user.loading) {
    return <div>Loading...</div>;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentInput: Payment = {
      detailUser: {
        fullName: `${userInput.firstName} ${userInput.lastName}`,
        email: userInput.email,
        phone: userInput.phoneNumber,
        address: userInput.address,
      },
      detailRoom: {
        roomType: "4 nguoi",
        checkIn: location.state.dateRange.startDate,
        checkOut: location.state.dateRange.endDate,
        adults: location.state.customerQuantity.adults,
        children: location.state.customerQuantity.children,
        rooms: location.state.customerQuantity.rooms,
        numberOfNight: nights,
      },
      paymentMethod: "credit card",
      totalPrice: (room.room?.price || 1) * (nights + 1),
    };
    const id = params.id;
    dispatch(
      paymentAction.createPayment({ id: id as string, payment: paymentInput })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  if (payment.payment) {
    navigate("/checkout-success", {
      state: {
        information: {
          ...location.state,
          price: (room.room?.price || 1) * (nights + 1),
        },
      },
    });
  }

  return (
    <div className="user__info">
      <h2>Booking Submission</h2>
      <form className="form">
        <div className="group__input">
          <CheckoutInput
            name="firstName"
            title="First Name"
            type="text"
            required={true}
            value={
              (userInput.firstName !== undefined
                ? userInput.firstName
                : user.currentUser?.fullName
              )?.split(" ")[0]
            }
            handleChange={handleChange}
          />
          <CheckoutInput
            name="lastName"
            title="Last Name"
            type="text"
            required={true}
            value={
              (userInput.lastName !== undefined
                ? userInput.lastName
                : user.currentUser?.fullName
              )?.split(" ")[1]
            }
            handleChange={handleChange}
          />
        </div>
        <div className="group__input">
          <CheckoutInput
            name="email"
            title="Email"
            type="text"
            required={true}
            value={userInput.email}
            handleChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <CheckoutInput
            name="phone"
            title="Phone"
            type="number"
            required={true}
            value={userInput.phoneNumber}
            handleChange={handleChange}
          />
        </div>
        <div className="group__input">
          <CheckoutInput
            name="address"
            title="Address"
            type="text"
            required={true}
            value={userInput.address}
            handleChange={handleChange}
          />
          <CheckoutInput
            name="city"
            title="City"
            type="text"
            required={true}
            handleChange={handleChange}
            value={userInput.city}
          />
        </div>
        <div className="group__input">
          <button
            type="submit"
            className="group__input__btn"
            onClick={handleSubmit}
          >
            {payment.loadingPayment ? (
              <CircularProgress color="inherit" size={"16px"} />
            ) : (
              "Submit"
            )}
            {!payment.loadingPayment && <BsArrowRight />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
