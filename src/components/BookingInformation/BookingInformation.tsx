import React, { useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import './bookingform.scss';
import TouristForm from './TouristForm';
import PaymentInformation from './PaymentInformation';

function BookingInformation() {
    const [bookingInfo, setBookingInfo] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });
    const [touristList, setTouristList] = useState<any>([]);
    const [paymentOption, setPaymentOption] = useState("fullPayment")
    const noOfPax = sessionStorage.getItem('noOfPax');
    const noOfChild = sessionStorage.getItem('noOfChild');
    const noOfTourist = Number(noOfPax) + Number(noOfChild);

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

    function handleOnChangeForBookingForm(event: any) {
        const name = event.target.name;
        const newBookingForm = {
            ...bookingInfo,
            [name] : event.target.value
        }

        setBookingInfo(newBookingForm);     
    }

    function handleOnChangeForPaymentOptions(event: any){
        setPaymentOption(event.target.value);
    }

    return (
        <main
            className="main-page"
            style={{
                width: '90%',
                margin: '20px auto',
                display: 'grid',
                gridTemplateColumns: '65% 35%',
                gap: '30px',
                alignItems: 'flex-start'
            }}
        >
            <div>
                <BookingForm handleOnChange={handleOnChangeForBookingForm}/>
                <TouristForm
                    touristList={touristList}
                    handleOnChange={handleOnChangeForTouristForm}
                />
            </div>
            <PaymentInformation paymentOption={paymentOption} handleOnChange={handleOnChangeForPaymentOptions}/>
        </main>
    );
}

export default BookingInformation;
