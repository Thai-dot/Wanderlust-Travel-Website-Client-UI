import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

interface BookingRoomType {
    tourData: any;
    tourPrice: number;
    tourDateCode: string;
    departureDate: string;
    noOfPax: number;
    tourDateID: number;
}

const BookingRoom = (props: BookingRoomType) => {
    const {
        tourData,
        tourPrice,
        tourDateCode,
        departureDate,
        noOfPax,
        tourDateID
    } = props;

    const params = useParams();

    const [dateRange, setDateRange] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: new Date(),
        endDate: new Date()
    });

    const [customerQuantity, setCustomerQuantity] = useState({
        adults: 1,
        children: 0,
        rooms: 1
    });

    const [totalPrice, setTotalPrice] = useState(tourPrice);
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        const nameOfInput = event.target.name;

        const newCustomerQuantity = {
            ...customerQuantity,
            [nameOfInput]: event.target.value
        };
        const price =
            newCustomerQuantity.adults * tourPrice +
            newCustomerQuantity.children * tourPrice * 0.7;
        setCustomerQuantity(newCustomerQuantity);
        setTotalPrice(price);
    };

    const handleOnSubmit = (event: any) => {
        sessionStorage.setItem(
            'tourName',
            `[${tourDateCode}] ${tourData.tourName}`
        );
        sessionStorage.setItem('departureDate', departureDate);
        sessionStorage.setItem('noOfPax', customerQuantity.adults.toString());
        sessionStorage.setItem(
            'noOfChild',
            customerQuantity.children.toString()
        );
        sessionStorage.setItem('totalPrice', totalPrice.toString());

        sessionStorage.setItem('id', tourDateID.toString());

        navigate(`/tour/${params.id}/booking-information`);
    };

    const passengersNum =
        Number(customerQuantity.adults) + Number(customerQuantity.children);

    console.log(passengersNum);

    return (
        <div className="booking__board">
            <h3>Lịch khởi hành & Giá</h3>
            <table className="booking__info">
                <tbody>
                    <tr>
                        <td>
                            <p className="emphasize">Ngày khởi hành</p>{' '}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    value={departureDate}
                                    minDate={new Date('2017-01-01')}
                                    onChange={(newValue) => {
                                        setDateRange({
                                            ...dateRange,
                                            startDate: newValue
                                        });
                                    }}
                                    disableOpenPicker
                                    disabled
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            sx={{
                                                width: '100%'
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="emphasize">
                                Khoảng khách{' '}
                                <span className="emphasize">{noOfPax}</span>
                            </p>{' '}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <p
                                className="emphasize"
                                style={{ marginBottom: '15px' }}
                            >
                                Số lượng
                            </p>
                            <div className="info">
                                {/* <span>5</span> rooms, <span>8</span> guests */}
                                <TextField
                                    id="outlined-name"
                                    label="Người lớn"
                                    name="adults"
                                    value={customerQuantity.adults}
                                    type="number"
                                    onChange={handleChange}
                                    focused
                                />
                                <TextField
                                    id="outlined-name"
                                    label="Trẻ em"
                                    name="children"
                                    type="number"
                                    value={customerQuantity.children}
                                    onChange={handleChange}
                                    focused
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="emphasize">Tổng đơn giá</p>{' '}
                            <p style={{ textAlign: 'right', margin: '5px 0' }}>
                                {customerQuantity.adults} x{' '}
                                {Intl.NumberFormat().format(tourPrice)}
                            </p>
                            <p style={{ textAlign: 'right', margin: '5px 0' }}>
                                {customerQuantity.children} x{' '}
                                {Intl.NumberFormat().format(tourPrice * 0.7)}
                            </p>
                            <hr />
                            <h3 style={{ textAlign: 'right', margin: '5px 0' }}>
                                {Intl.NumberFormat().format(totalPrice)} vnđ
                            </h3>
                        </td>
                    </tr>
                </tbody>
            </table>

            {passengersNum > Number(noOfPax) ? (
                <div className="red">
                    Không thể đặt tour vì số lượng khách lớn hơn khoảng khách
                </div>
            ) : (
                <div>
                    <button className="submit__btn" onClick={handleOnSubmit}>
                        Đặt Tour
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingRoom;
