import React from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import axiosClientInstance from '../service/axios/axiosClient/axiosClient';
import { useQuery } from 'react-query';
import useAlertDialog from '../customHooks/useAlertDialog/useAlertDialog';
import AlertDialogSuccess from '../components/AlertDialog/AlertDialog';

const CustomButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        borderColor: 'red' // Specify the desired border color
    }
}));

export default function TourDateProvider() {
    const { costID, providerID } = useParams();

    const [openAccept, handleClickOpenAccept, handleCloseAccept] =
        useAlertDialog();
    const [openReject, handleClickOpenReject, handleCloseReject] =
        useAlertDialog();

    const fetchDataCostStatement = () => {
        return axiosClientInstance
            .get(`/api/tourDateTourUtilityDetails/${costID}`)
            .then((res) => res.data)
            .catch((err) => {
                window.location.href = '/';
            });
    };

    const {
        isLoading,
        error,
        data: getCostStatementData,
        refetch
    } = useQuery('myFetchCostStatement', fetchDataCostStatement);

    const costStatementData = getCostStatementData?.find(
        (item) => item.id === Number(providerID)
    );

    const checkButtons = costStatementData?.utilities
        ?.map((item) => item?.tourDateTourUtilityDetails)
        ?.flat()
        ?.map((sub) => sub.status)
        ?.every((eve) => eve === 1);

    const handleAccept = () => {
        axiosClientInstance
            .put(
                `/api/tourDateTourUtilityDetails/updateTourDateTourUtilityDetailStatus/${providerID}/${costID}`,
                2
            )
            .then(() => {
                console.log('success');
                handleCloseAccept();
                refetch();
            })
            .catch((err) => console.error(err));
    };

    const handleReject = () => {
        axiosClientInstance
            .put(
                `/api/tourDateTourUtilityDetails/updateTourDateTourUtilityDetailStatus/${providerID}/${costID}`,
                3
            )
            .then(() => {
                console.log('success');
                handleCloseReject();
                refetch();
            })
            .catch((err) => console.error(err));
    };

    if (isLoading) return <div className="mb-40 mt-40">loading...</div>;

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
                        công ty. Xin quý công ty xác nhận hoặc hủy bằng cách
                        chọn các nút phía dưới. Rất vui được hợp tác với quý
                        công ty. Mọi thắc mắc xin liên hệ: 0919520565
                    </p>
                </div>
            </div>
            <div className="quotation-form" style={{ height: '100%' }}>
                <h3 style={{ color: 'gray', marginBottom: '30px' }}>
                    Thông tin các dịch vụ chúng tôi cần đặt:
                </h3>

                <div className="d-flex gap-3 align-center mb-10">
                    <h5 style={{ color: 'gray' }}>
                        Tên nhà cung cấp: {costStatementData?.providerName}
                    </h5>
                    <h5 style={{ color: 'gray' }}>
                        Địa chỉ: {costStatementData?.providerAddress}
                    </h5>
                </div>
                <h5 style={{ color: 'gray' }} className="mb-4">
                    Các dịch vụ cần đặt:
                </h5>

                <Grid container spacing={2} width="100%">
                    {costStatementData?.utilities?.map(
                        (item: any, index: number) => {
                            return (
                                <Grid item md={12} xs={12} marginTop={2}>
                                    <div
                                        className="d-flex align-center justify-between w-100 "
                                        style={{
                                            height: '50px',
                                            backgroundColor:
                                                'rgba(255, 255, 255, 0.821)',
                                            boxShadow:
                                                'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <div className="ml-10 d-flex">
                                            <div
                                                style={{
                                                    wordBreak: 'break-word'
                                                }}
                                            >
                                                {item.utilityName}&nbsp;
                                            </div>
                                            <div>
                                                | số lượng:{' '}
                                                {item
                                                    ?.tourDateTourUtilityDetails[0]
                                                    ?.unitQuantity ?? 0}
                                                &nbsp;
                                            </div>
                                            <div>
                                                | số ngày:{' '}
                                                {item
                                                    ?.tourDateTourUtilityDetails
                                                    .length ?? 0}
                                                &nbsp;
                                            </div>
                                        </div>

                                        <div className="mr-10">
                                            {Intl.NumberFormat().format(
                                                Math.round(
                                                    item
                                                        ?.tourDateTourUtilityDetails[0]
                                                        ?.pricePerPerson *
                                                        item
                                                            ?.tourDateTourUtilityDetails[0]
                                                            ?.unitQuantity
                                                )
                                            )}{' '}
                                            vnd
                                        </div>
                                    </div>
                                </Grid>
                            );
                        }
                    )}
                </Grid>

                {!checkButtons ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                        className="mt-50 green "
                    >
                        Đã xác nhận. Cảm ơn quý công ty đã bỏ thời gian để
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
                        <Button
                            variant="contained"
                            onClick={handleClickOpenAccept}
                        >
                            Xác nhận
                        </Button>
                        <CustomButton
                            variant="outlined"
                            sx={{ color: 'red', borderColor: 'red' }}
                            onClick={handleClickOpenReject}
                        >
                            Hủy bỏ
                        </CustomButton>
                    </Stack>
                )}
            </div>

            <AlertDialogSuccess
                open={openAccept}
                title="Xác nhận cho đặt các dịch vụ?"
                handleClickClose={handleCloseAccept}
                customText="Bạn có muốn xác nhận?"
                handleClickOkay={handleAccept}
            />

            <AlertDialogSuccess
                open={openReject}
                title="Xác nhận không cho đặt các dịch vụ?"
                handleClickClose={handleCloseReject}
                customText="Bạn có muốn hủy?"
                handleClickOkay={handleReject}
            />
        </main>
    );
}
