import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import './bookingform.scss';
import TouristForm from './TouristForm';
import PaymentInformation from './PaymentInformation';
import fetchCustomer from '../../service/API/customer';
import { getCookie } from '../../utils/cookies';
import { CircularProgress } from '@mui/material';
import Error from '../Error/Error';
import axiosClientInstance from '../../service/axios/axiosClient/axiosClient';
import { decodeToken } from '../../utils/jwtFunction';

function BookingInformation() {
    const [touristList, setTouristList] = useState<any>([]);
    const [paymentOption, setPaymentOption] = useState('fullPayment');
    const noOfPax = sessionStorage.getItem('noOfPax');
    const noOfChild = sessionStorage.getItem('noOfChild');

    const token = getCookie('accessToken');

    const decodedToken = decodeToken(token ?? '');

    const tourName = sessionStorage.getItem('tourName');
    const departureDate = sessionStorage.getItem('departureDate');

    const totalPrice = Number(sessionStorage.getItem('totalPrice'));
    const tourDateId = Number(sessionStorage.getItem('id'));

    const noOfTourist = Number(noOfPax) + Number(noOfChild);

    const idCustomer = getCookie('id');

    const [mainError, setMainError] = useState('');

    useEffect(() => {
        const tourists = Array.from(
            { length: Number(noOfTourist) },
            (_, index) => ({
                fullName: '',
                email: '',
                phoneNumber: ''
            })
        );
        setTouristList(tourists);
    }, []);

    const {
        isLoading,
        error,
        data: customerData,
        refetch
    } = useQuery('mygetCustomerDataForBooking', () =>
        fetchCustomer(Number(idCustomer))
    );

    function handleOnChangeForTouristForm(event: any, index: number) {
        if (event.target.name === 'fullName') {
            touristList[index] = {
                ...touristList[index],
                fullName: event.target.value
            };
        } else if (event.target.name === 'email') {
            touristList[index] = {
                ...touristList[index],
                email: event.target.value
            };
        } else {
            touristList[index] = {
                ...touristList[index],
                phoneNumber: event.target.value
            };
        }

        const newTouristList = [...touristList];

        setTouristList(newTouristList);
    }

    // function handleOnChangeForBookingForm(event: any) {
    //     const name = event.target.name;
    //     const newBookingForm = {
    //         ...bookingInfo,
    //         [name]: event.target.value
    //     };

    //     setBookingInfo(newBookingForm);
    // }

    function handleOnChangeForPaymentOptions(event: any) {
        setPaymentOption(event.target.value);
    }

    const handlePayment = () => {
        setMainError('');

        if (!touristList.every((obj: any) => Boolean(obj.fullName))) {
            setMainError('Cột Full name không được trống');
        } else {
            try {
                axiosClientInstance
                    .post(`/api/booking/add`, {
                        bookingName: `${tourName} ${departureDate} ${customerData?.fullName}`,
                        noOfPax,
                        noOfChild,
                        totalPrice: Math.round(totalPrice),
                        discount: 0,
                        customerId: customerData?.id,
                        tourDateId
                    })
                    .then((bookingRes) => {
                        const postTourists = touristList.map((tourist: any) => {
                            return {
                                fullName: tourist.fullName,
                                email: tourist.email,
                                phoneNumber: tourist.phoneNumber,
                                country: 0,
                                city: 0,
                                district: 0,
                                ward: 0,
                                address: '',
                                note: '',
                                bookingId: bookingRes.data.id
                            };
                        });

                        const promises = postTourists.map((obj: any) =>
                            axiosClientInstance.post('/api/tourists/add', obj)
                        );

                        Promise.allSettled(promises);

                        axiosClientInstance
                            .post(`/api/receipts/add`, {
                                collectedDate: new Date(),
                                amountOfMoney:
                                    paymentOption === 'fullPayment'
                                        ? Math.round(totalPrice)
                                        : Math.round(totalPrice * 0.7),
                                paymentMethod: 1,
                                content: '',
                                bookingId: bookingRes.data.id
                            })
                            .then((receiptRes) => {
                                axiosClientInstance
                                    .post(
                                        `/api/Payment/get-vnpay-payment-url`,
                                        {
                                            receipId: receiptRes.data.id,
                                            totalAmount:
                                                paymentOption === 'fullPayment'
                                                    ? Math.round(totalPrice)
                                                    : Math.round(
                                                          totalPrice * 0.7
                                                      ),
                                            returnUrl: `/tour/${tourDateId}/success-payment`
                                        }
                                    )
                                    .then((paymentRes: any) => {
                                        window.location.href = paymentRes.data;
                                    });
                            });
                    });
            } catch (error) {
                setMainError('Không thể thanh toán');
            }
        }
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Error error={error} />;

    return (
        <main
            className="main-page"
            style={{
                width: '90%',
                margin: '20px auto',
                display: 'grid',
                gridTemplateColumns: '65% 35%',
                gap: '30px',
                alignItems: 'start'
            }}
        >
            <div>
                {/* <BookingForm handleOnChange={handleOnChangeForBookingForm}/> */}
                <TouristForm
                    touristList={touristList}
                    handleOnChange={handleOnChangeForTouristForm}
                />
            </div>
            <PaymentInformation
                paymentOption={paymentOption}
                handleOnChange={handleOnChangeForPaymentOptions}
                handlePayment={handlePayment}
                error={mainError}
            />
        </main>
    );
}

export default BookingInformation;
