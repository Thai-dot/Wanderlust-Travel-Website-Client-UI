import React from 'react';
import { Button, TextField, Grid, Stack } from '@mui/material';
import moment from 'moment';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        borderColor: 'red' // Specify the desired border color
    }
}));


export default function TourDateProvider() {
    const quotationStatus = 2;
    return (
        <main className="main-page">
            <div className="quotation-banner">
                <div style={{ width: '70%', margin: '0 auto' }}>
                    <h1
                        style={{
                            textAlign: 'center',
                            marginTop: '50px',
                            color: '#fff'
                        }}
                    >
                        Yêu cầu xác nhận đặt dịch vụ
                    </h1>
                    <p
                        style={{
                            textAlign: 'center',
                            padding: '20px',
                            color: '#fff',
                            lineHeight: '2'
                        }}
                    >
                        Chúng tôi mong muốn xác nhận các dịch vụ của bên quý
                        công ty trong khoảng thời gian từ &nbsp;đến ngày . Xin
                        quý công ty xác nhận hoặc hủy bằng cách chọn các nút
                        phía dưới. Rất vui được hợp tác với quý công ty
                    </p>
                </div>
            </div>
            <div className="quotation-form" style={{ height: '100%' }}>
                <h3 style={{ color: 'gray', marginBottom: '30px' }}>
                    Thông tin các dịch vụ chúng tôi cần đặt
                </h3>

                <Grid container spacing={2} width="100%">
                    <Grid item md={6} xs={12} marginTop={2}>
                        <div
                            className="d-flex align-center justify-between w-100 "
                            style={{
                                height: '50px',
                                backgroundColor: 'rgba(255, 255, 255, 0.821)',
                                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                borderRadius: '5px'
                            }}
                        >
                            <div className="ml-10 d-flex">
                                <div style={{ fontWeight: 'bold' }}>
                                    1&nbsp;&nbsp;&nbsp;
                                </div>
                                <div>asldlas,d</div>
                                <div>&nbsp;(sl: 12)</div>
                            </div>

                            <div className="mr-10">
                                {Intl.NumberFormat().format(100000)} vnd
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12} marginTop={2}>
                        <div
                            className="d-flex align-center justify-between w-100 "
                            style={{
                                height: '50px',
                                backgroundColor: 'rgba(255, 255, 255, 0.821)',
                                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                borderRadius: '5px'
                            }}
                        >
                            <div className="ml-10 d-flex">
                                <div style={{ fontWeight: 'bold' }}>
                                    1&nbsp;&nbsp;&nbsp;
                                </div>
                                <div>asldlas,d</div>
                                <div>&nbsp;(sl: 12)</div>
                            </div>

                            <div className="mr-10">
                                {Intl.NumberFormat().format(100000)} vnd
                            </div>
                        </div>
                    </Grid>
                </Grid>

                {quotationStatus === 2 ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                        className="mt-50 green "
                    >
                        Đã gửi file excel. Cảm ơn quý công ty đã bỏ thời gian để
                        submit form.
                    </div>
                ) : (
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="end"
                        gap="10px"
                        marginTop="25px"
                        width="100%"
                    >
                        <Button variant="contained">Xác nhận</Button>
                        <CustomButton
                            variant="outlined"
                            sx={{ color: 'red', borderColor: 'red' }}
                            
                        >
                            Hủy bỏ
                        </CustomButton>
                    </Stack>
                )}
            </div>
        </main>
    );
}
