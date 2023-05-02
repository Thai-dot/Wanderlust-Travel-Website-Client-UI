import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

const BookingRoom = () => {
  const params = useParams();
  const room = useAppSelector((state) => state.room);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [customerQuantity, setCustomerQuantity] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "adults") {
      if (+value < 1) {
        setCustomerQuantity({
          ...customerQuantity,
          [name]: 1,
        });
        return;
      }
      setCustomerQuantity({
        ...customerQuantity,
        [e.target.name]:
          +value >
          (room.room?.maxAdults === undefined ? 1 : room.room.maxAdults)
            ? room.room?.maxAdults
            : value,
      });
    } else if (name === "rooms") {
      if (+value < 1) {
        setCustomerQuantity({
          ...customerQuantity,
          [name]: 1,
        });
        return;
      }
      setCustomerQuantity({
        ...customerQuantity,
        [e.target.name]:
          +value > (room.room?.beds === undefined ? 1 : room.room.beds)
            ? room.room?.beds
            : value,
      });
    } else {
      if (+value < 0) {
        setCustomerQuantity({
          ...customerQuantity,
          [name]: 0,
        });
        return;
      }
      setCustomerQuantity({
        ...customerQuantity,
        [e.target.name]:
          +e.target.value >
          (room.room?.maxChildren === undefined ? 0 : room.room.maxChildren)
            ? room.room?.maxChildren
            : e.target.value,
      });
    }
  };

  return (
    <div className="booking__board">
      <div className="price-rating">
        <div className="price">
          From <span className="emphasize">{room.room?.price}$</span> / night
        </div>
        <div className="rating">
          <AiFillStar /> <span className="emphasize">5</span>{" "}
          <span className="review">(3 reviews)</span>
        </div>
      </div>
      <table className="booking__info">
        <tbody>
          <tr>
            <td>
              <p className="emphasize">Check-in</p>{" "}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  value={dateRange.startDate}
                  minDate={new Date("2017-01-01")}
                  onChange={(newValue) => {
                    setDateRange({
                      ...dateRange,
                      startDate: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </td>
            <td>
              <p className="emphasize">Check-out</p>{" "}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  value={dateRange.endDate}
                  minDate={dateRange.startDate}
                  onChange={(newValue) => {
                    setDateRange({
                      ...dateRange,
                      endDate: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <p className="emphasize">Guests</p>
              <div className="info">
                {/* <span>5</span> rooms, <span>8</span> guests */}
                <TextField
                  id="outlined-name"
                  label="Adults"
                  name="adults"
                  value={customerQuantity.adults}
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-name"
                  label="Children"
                  name="children"
                  type="number"
                  value={customerQuantity.children}
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-name"
                  label="Room"
                  name="rooms"
                  type="number"
                  value={customerQuantity.rooms}
                  onChange={handleChange}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <NavLink
        to={{ pathname: `/checkout/${params.id}` }}
        state={{ dateRange: dateRange, customerQuantity: customerQuantity }}
      >
        <button className="submit__btn">Reserve</button>
      </NavLink>
    </div>
  );
};

export default BookingRoom;
