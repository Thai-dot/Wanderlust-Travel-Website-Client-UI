import TextField from '@mui/material/TextField';
import React from 'react';
import './bookingform.scss';

interface BookingFormType{
    handleOnChange : any
}

function BookingForm(props : BookingFormType) {

    const {handleOnChange} = props;

    return (
        <div className="booking-information">
            <h3 style={{ textAlign: 'center' }}>Thông tin đặt tour</h3>
            <div style={{display: 'grid', gridTemplateColumns : '1fr 1fr', gap: '2rem',margin: '20px 0'}}>
                <TextField
                    id="outlined-basic"
                    label="Họ và tên"
                    name='fullName'
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                        handleOnChange(e)
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Số điện thoại"
                    name='phoneNumber'
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                        handleOnChange(e)
                    }}
                />
            </div>
            <TextField
                id="outlined-basic"
                label="Email"
                name='email'
                variant="outlined"
                fullWidth
                onChange={(e) => {
                    handleOnChange(e)
                }}
            />
        </div>
    );
}

export default BookingForm;
