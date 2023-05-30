import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClientInstance from '../service/axios/axiosClient/axiosClient';
import Error from '../components/Error/Error';

const SuccessPaymentPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');

    const vnp_BankTranNo = searchParams.get('vnp_BankTranNo');

    const vnp_CardType = searchParams.get('vnp_CardType');

    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');

    const vnp_PayDate = searchParams.get('vnp_PayDate');

    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_TmnCode = searchParams.get('vnp_TmnCode');

    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');

    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');

    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
    const vnp_SecureHash = searchParams.get('vnp_SecureHash');

    useEffect(() => {
        const confirmPayment = () => {
            axiosClientInstance
                .post(`api/Payment/vnpay-payment-confirm`, {
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
                })
                .then((paymentRes) => {
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    setError('Thanh toán thất bại!');
                });
        };

        confirmPayment();
    });

    if (loading) return <CircularProgress />;
    if (error) return <Error error={error} />;

    return (
        <div className="success-payment-page">
            <h1>Payment Successful</h1>
            <p>Thank you for your payment!</p>

            <Link to="/" className="mt-20">
                <Button variant="contained">Return Home</Button>
            </Link>
        </div>
    );
};

export default SuccessPaymentPage;
