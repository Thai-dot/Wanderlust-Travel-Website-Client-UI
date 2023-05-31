import React, { useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useLocation } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClientInstance from '../service/axios/axiosClient/axiosClient';
import Error from '../components/Error/Error';
import { getCookie } from '../utils/cookies';
import { decodeToken } from '../utils/jwtFunction';

const SuccessPaymentPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = getCookie('accessToken');

    const decodedToken = decodeToken(token ?? '');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const vnp_Amount = searchParams.get('vnp_Amount')?.toString();
    const vnp_BankCode = searchParams.get('vnp_BankCode')?.toString();

    const vnp_BankTranNo = searchParams.get('vnp_BankTranNo')?.toString();

    const vnp_CardType = searchParams.get('vnp_CardType')?.toString();

    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo')?.toString();

    const vnp_PayDate = searchParams.get('vnp_PayDate')?.toString();

    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')?.toString();
    const vnp_TmnCode = searchParams.get('vnp_TmnCode')?.toString();

    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo')?.toString();

    const vnp_TransactionStatus = searchParams
        .get('vnp_TransactionStatus')
        ?.toString();

    const vnp_TxnRef = searchParams.get('vnp_TxnRef')?.toString();
    const vnp_SecureHash = searchParams.get('vnp_SecureHash')?.toString();

    useEffect(() => {
        if (loading) {
            const confirmPayment = () => {
                axiosClientInstance
                    .post(
                        `api/Payment/vnpay-payment-confirm/?receivedEmail=${decodedToken.email}`,
                        {
                            vnp_Amount,
                            vnp_BankCode,
                            vnp_BankTranNo,
                            vnp_CardType,
                            vnp_OrderInfo,
                            vnp_PayDate,
                            vnp_ResponseCode,
                            vnp_TmnCode,
                            vnp_TransactionNo,
                            vnp_TransactionStatus,
                            vnp_TxnRef,
                            vnp_SecureHash
                        }
                    )
                    .then((paymentRes) => {
                        setLoading(false);
                        console.log(paymentRes);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                        setError('Thanh toán thất bại!');
                    });
            };

            confirmPayment();
        }
    });

    if (loading) return <CircularProgress />;
    if (error) return <Error error={error} />;

    return (
        <div className="success-payment-page">
            <div className="flex-center ">
                <CheckCircleOutlineIcon
                    sx={{ color: 'greenyellow', fontSize: '200px' }}
                />
            </div>
            <h1 className='mt-40'>Payment Successful</h1>
            <p>Thank you for your payment!</p>

            <Link to="/" className="mt-20">
                <Button variant="contained">Return Home</Button>
            </Link>
        </div>
    );
};

export default SuccessPaymentPage;
