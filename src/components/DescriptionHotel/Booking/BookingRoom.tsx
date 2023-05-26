import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

interface BookingRoomType {
    tourData: any;
    tourPrice: number;
    tourDateCode: string;
    departureDate: string;
}

const BookingRoom = (props: BookingRoomType) => {
    const { tourData, tourPrice, tourDateCode, departureDate } = props;
    console.log(tourData, tourDateCode, departureDate);
    const params = useParams();
    // const room = useAppSelector((state) => state.room);
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
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     if (name === 'adults') {
    //         if (+value < 1) {
    //             setCustomerQuantity({
    //                 ...customerQuantity,
    //                 [name]: 1
    //             });
    //             return;
    //         }
    //         setCustomerQuantity({
    //             ...customerQuantity,
    //             [e.target.name]:
    //                 +value >
    //                 (room.room?.maxAdults === undefined
    //                     ? 1
    //                     : room.room.maxAdults)
    //                     ? room.room?.maxAdults
    //                     : value
    //         });
    //     } else if (name === 'rooms') {
    //         if (+value < 1) {
    //             setCustomerQuantity({
    //                 ...customerQuantity,
    //                 [name]: 1
    //             });
    //             return;
    //         }
    //         setCustomerQuantity({
    //             ...customerQuantity,
    //             [e.target.name]:
    //                 +value >
    //                 (room.room?.beds === undefined ? 1 : room.room.beds)
    //                     ? room.room?.beds
    //                     : value
    //         });
    //     } else {
    //         if (+value < 0) {
    //             setCustomerQuantity({
    //                 ...customerQuantity,
    //                 [name]: 0
    //             });
    //             return;
    //         }
    //         setCustomerQuantity({
    //             ...customerQuantity,
    //             [e.target.name]:
    //                 +e.target.value >
    //                 (room.room?.maxChildren === undefined
    //                     ? 0
    //                     : room.room.maxChildren)
    //                     ? room.room?.maxChildren
    //                     : e.target.value
    //         });
    //     }
    // };

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

        navigate(`/tour/${params.id}/booking-information`);
    };

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
                                    value={dateRange.startDate}
                                    minDate={new Date('2017-01-01')}
                                    onChange={(newValue) => {
                                        setDateRange({
                                            ...dateRange,
                                            startDate: newValue
                                        });
                                    }}
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
            <div>
                <button className="submit__btn" onClick={handleOnSubmit}>
                    Đặt Tour
                </button>
            </div>
        </div>
    );
};

export default BookingRoom;
