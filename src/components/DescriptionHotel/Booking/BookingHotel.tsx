import { TextField } from "@mui/material";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useAppSelector } from "../../../app/hooks";

const BookingHotel = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [value, setValue] = React.useState<Date | null>(null);

  const hotel = useAppSelector((state) => state.hotel);
  return (
    <div className="booking__board">
      <div className="actions">
        <button className="btn">Book</button>
        <button className="btn inquiry">Inquiry</button>
      </div>
      <div className="price-rating">
        <div className="price">
          From <span className="emphasize">{hotel.hotel?.price}$</span> / night
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
                  minDate={new Date("2017-01-01")}
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
                <span>5</span> rooms, <span>8</span> guests
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="submit__btn">Check availability</button>
    </div>
  );
};

export default BookingHotel;
