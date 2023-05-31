import React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import Stack from '@mui/material/Stack';
import classNames from 'classnames';
import ListItem from '../components/BookingList/ListItem';
import axiosClientInstance from '../service/axios/axiosClient/axiosClient';
import { getCookie } from '../utils/cookies';
import Error from '../components/Error/Error';

export default function CustomerBookingList() {
    const [status, setStatus] = React.useState(0);

    const customerID = getCookie('id');

    const [page, setPage] = React.useState(1);
    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const fetchBookingForCustomer = () => {
        return axiosClientInstance
            .get(
                `/api/booking/tour-date/0/?Filters=customerId==${customerID},status==${status}&Page=${page}`
            )
            .then((res) => res.data);
    };

    const { isLoading, error, data, refetch } = useQuery(
        'bookingClientQuery',
        fetchBookingForCustomer
    );

    const statusNames = [
        'Chưa thanh toán',
        'Đã thanh toán 70%',
        'Đã thanh toán'
    ];

    React.useEffect(() => {
        refetch();
    }, [status, page]);

    const handleRemove = (id: number) => {
        axiosClientInstance.delete(`/api/booking/${id}/remove`).then(() => {
            refetch();
        });
    };

    const handlePayment = (
        id: number,
        price: number,
        statusType: number,
        paymentType: string
    ) => {
        if (paymentType === '70') {
            axiosClientInstance
                .post(`/api/receipts/add`, {
                    collectedDate: new Date(),
                    amountOfMoney: Math.round(price * 0.7),
                    paymentMethod: 1,
                    content: '',
                    bookingId: id
                })
                .then((receiptRes) => {
                    axiosClientInstance
                        .post(`/api/Payment/get-vnpay-payment-url`, {
                            receipId: receiptRes.data.id,
                            totalAmount: Math.round(price * 0.7),
                            returnUrl: `http://localhost:3000/tour/0/success-payment`
                        })
                        .then((paymentRes: any) => {
                            window.location.href = paymentRes.data;
                        });
                });
        } else {
            axiosClientInstance
                .post(`/api/receipts/add`, {
                    collectedDate: new Date(),
                    amountOfMoney:
                        statusType === 0
                            ? Math.round(price)
                            : Math.round(price) - Math.round(price * 0.7),
                    paymentMethod: 1,
                    content: '',
                    bookingId: id
                })
                .then((receiptRes) => {
                    axiosClientInstance
                        .post(`/api/Payment/get-vnpay-payment-url`, {
                            receipId: receiptRes.data.id,
                            totalAmount:
                                statusType === 0
                                    ? Math.round(price)
                                    : Math.round(price) -
                                      Math.round(price * 0.7),
                            returnUrl: `http://localhost:3000/tour/0/success-payment`
                        })
                        .then((paymentRes: any) => {
                            window.location.href = paymentRes.data;
                        });
                });
        }
    };

    if (isLoading) return <CircularProgress />;

    if (error) return <Error error={error} />;

    return (
        <div className="booking-list">
            <div className="flex-center mt-20 mb-20">
                <h3>Danh sách booking của bạn</h3>
            </div>

            <ul className="flex-center gap-4">
                {statusNames.map((item: string, index: number) => (
                    <li
                        className={classNames('status', {
                            active: status === index
                        })}
                        onClick={() => setStatus(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <div className="flex-center ">
                <Box
                    sx={{
                        width: '50%',
                        marginTop: '3rem',
                        marginBottom: '3rem'
                    }}
                >
                    {data.data.length !== 0 ? (
                        <Stack spacing={3}>
                            {data.data.map((booking: any, index: number) => (
                                <ListItem
                                    key={index}
                                    id={booking.id}
                                    bookingName={booking.bookingName}
                                    statusType={booking.status}
                                    price={booking?.totalPrice ?? 0}
                                    handleRemove={handleRemove}
                                    handlePayment={handlePayment}
                                />
                            ))}
                        </Stack>
                    ) : (
                        <h5 className="flex-center">Không có booking nào</h5>
                    )}
                </Box>
            </div>
            <div className="flex-center mb-40">
                <Pagination
                    count={data.totalPages}
                    page={page}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
}
