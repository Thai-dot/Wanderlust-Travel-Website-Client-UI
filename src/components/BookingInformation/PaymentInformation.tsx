import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Radio from '@mui/material/Radio/Radio';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import moment from 'moment';

interface PaymentInformationType {
    paymentOption: string;
    handleOnChange: any;
    handlePayment: any;
    error: string;
}

const THEME = createTheme({
    typography: {
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 16
    }
});

function PaymentInformation(props: PaymentInformationType) {
    const { paymentOption, handleOnChange, handlePayment, error } = props;
    const tourName = sessionStorage.getItem('tourName');
    const departureDate = sessionStorage.getItem('departureDate');
    const noOfPax = sessionStorage.getItem('noOfPax');
    const noOfChild = sessionStorage.getItem('noOfChild');
    const totalPrice = Number(sessionStorage.getItem('totalPrice'));

    const startDate = moment(departureDate);
    const currentDate = moment();

    const isGreaterThan3Days = startDate.isAfter(
        currentDate.add(3, 'days'),
        'day'
    );

    return (
        <div className="payment-info mt-20">
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Thông tin thanh toán
            </h3>
            <p>
                <span>Tên tour: </span>{' '}
                <span style={{ fontWeight: '700' }}>{tourName}</span>
            </p>
            <p>
                <span>Ngày khởi hành: </span>{' '}
                <span style={{ fontWeight: '700' }}>
                    {departureDate?.slice(0, 10)}
                </span>
            </p>
            <p>
                <span>Tổng số vé người lớn: </span>{' '}
                <span style={{ fontWeight: '700' }}>{noOfPax}</span>
            </p>
            <p>
                <span>Tổng số vé trẻ em: </span>{' '}
                <span style={{ fontWeight: '700' }}>{noOfChild}</span>
            </p>
            <p>
                <span>Tổng số tiền của tour: </span>{' '}
                <span
                    style={{
                        fontWeight: '700',
                        fontSize: '24px',
                        color: 'rgb(255, 45, 84)'
                    }}
                >
                    {Intl.NumberFormat().format(totalPrice)} vnđ
                </span>
            </p>
            <div className="payment-options">
                <ThemeProvider theme={THEME}>
                    <FormControl sx={{ width: '100%' }}>
                        <FormLabel
                            id="demo-controlled-radio-buttons-group"
                            sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#000',
                                textAlign: 'center',
                                margin: '20px 0 10px'
                            }}
                        >
                            Các lựa chọn thanh toán
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={paymentOption}
                            onChange={(e: any) => {
                                handleOnChange(e);
                            }}
                        >
                            {isGreaterThan3Days && (
                                <FormControlLabel
                                    value="partialPayment"
                                    control={<Radio />}
                                    label="Thanh toán 70% tổng tiền"
                                    sx={{
                                        border: '1px solid #d7dce3',
                                        borderRadius: '10px',
                                        padding: '0 50px 0 0',
                                        marginBottom: '10px'
                                    }}
                                />
                            )}

                            <FormControlLabel
                                value="fullPayment"
                                control={<Radio />}
                                label="Thanh toán toàn bộ tiền"
                                sx={{
                                    border: '1px solid #d7dce3',
                                    borderRadius: '10px',
                                    padding: '0 50px 0 0'
                                }}
                            />
                        </RadioGroup>
                    </FormControl>

                    <div
                        className="payment-submit"
                        style={{ textAlign: 'right', padding: '20px 20px 0' }}
                    >
                        <Button variant="contained" onClick={handlePayment}>
                            Thanh toán
                        </Button>
                    </div>
                </ThemeProvider>
                {error ?? <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
}

export default PaymentInformation;
