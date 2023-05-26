import Button from '@mui/material/Button/Button';
import Stack from '@mui/material/Stack/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuotationInfoType {
    quotationName: string;
    departureDate: string;
    noOfPax: number;
    noOfChild: number;
    pricePerPerson: number;
}

const THEME = createTheme({
    typography: {
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 16
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontWeight: 'bold'
                }
            }
        }
    }
});

function QuotationInfo(props: QuotationInfoType) {
    const { quotationName, departureDate, noOfPax, noOfChild, pricePerPerson } =
        props;
    const navigate = useNavigate();
    const totalPrice =
        noOfPax * pricePerPerson + noOfChild * pricePerPerson * 0.7;

    const tourDateId = 1;

    const handleOnSubmit = (event: any) => {
        sessionStorage.setItem('tourName', quotationName);
        sessionStorage.setItem('departureDate', departureDate);
        sessionStorage.setItem('noOfPax', noOfPax.toString());
        sessionStorage.setItem('noOfChild', noOfChild.toString());
        sessionStorage.setItem('totalPrice', totalPrice.toString());

        navigate(`/tour/${tourDateId}/booking-information`);
    };

    return (
        <div className="payment-info">
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Thông tin báo giá
            </h3>
            <p>
                <span>Tên tour: </span>{' '}
                <span style={{ fontWeight: '700' }}>{quotationName}</span>
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
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Tổng đơn giá</p>{' '}
            <p style={{ textAlign: 'right', margin: '5px 0' }}>
                {noOfPax} x {Intl.NumberFormat().format(pricePerPerson)}
            </p>
            <p style={{ textAlign: 'right', margin: '5px 0' }}>
                {noOfChild} x {Intl.NumberFormat().format(pricePerPerson * 0.7)}
            </p>
            <hr />
            <h3
                style={{
                    textAlign: 'right',
                    margin: '5px 0',
                    color: 'rgb(255, 45, 84)'
                }}
            >
                {Intl.NumberFormat().format(totalPrice)} vnđ
            </h3>
            <ThemeProvider theme={THEME}>
                <Stack
                    spacing={2}
                    direction="column"
                    sx={{ marginTop: '20px' }}
                >
                    <a href="#editQuotation" style={{ display: 'block' }}>
                        <Button variant="text" sx={{ width: '100%' }}>
                            Yêu cầu chỉnh sửa
                        </Button>
                    </a>
                    <Button variant="contained" onClick={handleOnSubmit}>Đặt tour</Button>
                    <Button variant="outlined">Hủy tour</Button>
                </Stack>
            </ThemeProvider>
        </div>
    );
}

export default QuotationInfo;
