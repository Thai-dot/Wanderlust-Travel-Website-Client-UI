import React, { Fragment } from 'react';
import About from '../DescriptionHotel/DescriptionItems/About';
import { useNavigate, useParams } from 'react-router-dom';
import QuotationInfo from './QuotationInfo';
import EditQuotation from './EditQuotation';
import axiosClientInstance from '../../service/axios/axiosClient/axiosClient';
import AlertDialogSuccess from '../AlertDialog/AlertDialog';
import useAlertDialog from '../../customHooks/useAlertDialog/useAlertDialog';

interface DescriptionQuotationType {
    tourData: any;
    departureDate: string;
    noOfPax: number;
    noOfChild: number;
    pricePerPerson: number;
    currentStatus: number;
}

function DescriptionQuotation(props: DescriptionQuotationType) {
    const {
        tourData,
        departureDate,
        noOfPax,
        noOfChild,
        pricePerPerson,
        currentStatus
    } = props;

    const [
        openCancel,
        handleClickOpenCancel,
        handleCloseCancel,
        setOpenCancel
    ] = useAlertDialog();

    const [openNeed, handleClickOpenNeed, handleCloseNeed, setOpenNeed] =
        useAlertDialog();

    const [
        openConfirmed,
        handleClickOpenConfrmed,
        handleCloseConfirmed,
        setOpenConfirmed
    ] = useAlertDialog();

    const { id } = useParams();

    const navigate = useNavigate();

    const [editValue, setEditValue] = React.useState('');
    const [editError, setEditError] = React.useState('');

    const handleQuotation = (type: number) => {
        if (type === 1 && editValue.length !== 0) {
            setOpenNeed(true);
        }

        if (type === 2) {
            setOpenConfirmed(true);
        }
        if (type === 3) {
            setOpenCancel(true);
        }
    };

    const handleNeedEdit = () => {
        axiosClientInstance
            .post(`/api/quotations/${id}/add-new-quotation-requirement`, editValue)
            .then(() => {
                window.location.reload();
                setOpenNeed(false);
            });
    };

    const handleConfirmed = () => {
        axiosClientInstance
            .post(
                `/api/quotations/${id}/update-quotation-status/?quotationStatus=4`
            )
            .then(() => {
                window.location.reload();
                setOpenConfirmed(false);
            });
    };

    const handleRemoveQuotation = () => {
        axiosClientInstance
            .post(
                `/api/quotations/${id}/update-quotation-status/?quotationStatus=7`
            )
            .then(() => {
                navigate('/');
                setOpenCancel(false);
            });
    };

    const handleOnChange = (e: any, editor: any, id: string | number) => {
        setEditError('');
        setEditValue(editor.getData());
        if (editor.getData().length > 1500) {
            setEditError('Độ dài qua lớn');
        }
    };

    return (
        <Fragment>
            <div className="tour">
                <div className="tour__describe">
                    <About
                        name="Giới thiệu tour"
                        type={1}
                        descriptionData={tourData}
                    />
                    <About
                        name="Hành trình tour"
                        type={2}
                        descriptionData={tourData}
                    />
                    <About
                        name="Các chính sách có trong tour"
                        type={7}
                        descriptionData={tourData}
                    />
                    <EditQuotation
                        editValue={editValue}
                        onChange={handleOnChange}
                        editError={editError}
                    />
                </div>
                <div>
                    <QuotationInfo
                        quotationName={tourData.tourName}
                        departureDate={departureDate}
                        noOfPax={noOfPax}
                        noOfChild={noOfChild}
                        pricePerPerson={pricePerPerson}
                        handleQuotation={handleQuotation}
                        currentStatus={currentStatus}
                        editValue={editValue}
                    />
                </div>
            </div>

            <AlertDialogSuccess
                open={openCancel}
                title="Thông báo Báo giá"
                handleClickClose={handleCloseCancel}
                customText="Bạn có muốn hủy báo giá này?"
                handleClickOkay={handleRemoveQuotation}
            />

            <AlertDialogSuccess
                open={openNeed}
                title="Thông báo Báo giá"
                handleClickClose={handleCloseNeed}
                customText="Bạn có muốn yêu cầu sửa đổi báo giá?"
                handleClickOkay={handleNeedEdit}
            />

            <AlertDialogSuccess
                open={openConfirmed}
                title="Thông báo Báo giá"
                handleClickClose={handleCloseConfirmed}
                customText="Bạn có chắc xác nhận báo giá?"
                handleClickOkay={handleConfirmed}
            />
        </Fragment>
    );
}

export default DescriptionQuotation;
