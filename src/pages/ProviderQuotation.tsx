import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import '../styles/components/providerQuotation.scss';
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box/Box';
import axiosClientInstance from '../service/axios/axiosClient/axiosClient';
import wardVN from '../constant/VietnamDivision/VietnamWard';
import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';
import Error from '../components/Error/Error';
import provinceVN from '../constant/VietnamDivision/VietnamProvince';
import districtVN from '../constant/VietnamDivision/VietnamDistrict';
import providerConstant from '../constant/dataMapping/provider';
import { getCookie } from '../utils/cookies';
import axios from 'axios';
import { splitISOToUsualDate } from '../utils/dateFunction';
import moment from 'moment';
import handleUploadFireBase from '../service/firebase/uploadFirebase/handleUpload';
import storage from '../service/firebase/uploadFirebase/uploadFirebase';

function ProviderQuotation() {
    const [filename, setFilename] = useState('');
    const [fileExcel, setFileExcel] = useState<File | null>(null);
    const [fileError, setFileError] = useState('');
    const { id } = useParams();

    const [quotationStatus, setQuotationStatus] = useState(1);

    const [provider, setProvider] = useState<any>(null);

    const fetchProvider = () => {
        return axiosClientInstance
            .get(`/api/providers/quotations/${id}`)
            .then((resQuotation) => {
                setQuotationStatus(Number(resQuotation.data.status));
                axiosClientInstance
                    .get(`/api/providers/${resQuotation.data.providerId}`)
                    .then((providerRes) => {
                        setProvider(providerRes.data);
                    });

                return resQuotation.data;
            });
    };

    const { isLoading, error, data, refetch } = useQuery(
        'myDataFetch',
        fetchProvider
    );

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setFileError('');
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        setFileExcel(file);
        const { name } = file;
        setFilename(name);
    };

    async function handleSendFile() {
        //const file = event.target.files[0];
        setFileError('');
        if (fileExcel) {
            const downloadURL = await handleUploadFireBase(
                fileExcel,
                storage
            ).then((res: string) => res);

            const formData = new FormData();
            formData.append('file', fileExcel);

            axiosClientInstance
                .post(
                    `/api/providers/quotations/${id}/save-excel-file-url`,
                    downloadURL
                )
                .then((res) => {
                    window.location.reload();
                    setQuotationStatus(2);
                })
                .catch((error) => {
                    // Handle error
                    console.log('Error uploading file:', error);
                });
        } else {
            setFileError('Phải có file excel');
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href =
            'https://firebasestorage.googleapis.com/v0/b/fileupload-travel-managementui.appspot.com/o/providerQuotationFile%2FSample_File.xlsx?alt=media&token=b847828e-cc2f-4204-8d8a-2272db06e0d0'; // Assign the file URL to the anchor's href property
        link.download = 'example.xlsx'; // Specify the filename for the downloaded file

        // Simulate a click on the anchor element
        link.click();
    };

    if (isLoading) return <CircularProgress />;

    if (error) return <Error error={error} />;

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
                        Yêu cầu xin báo giá
                    </h1>
                    <p
                        style={{
                            textAlign: 'center',
                            padding: '20px',
                            color: '#fff',
                            lineHeight: '2'
                        }}
                    >
                        Chúng tôi mong muốn xin báo giá cho các dịch vụ của bên
                        quý công ty trong khoảng thời gian từ &nbsp;
                        {moment(data.fromDate).format('DD/MM/YYYY')} đến ngày{' '}
                        {moment(data.toDate).format('DD/MM/YYYY')}. Xin quý công
                        ty cung cấp báo giá trên file excel và gửi lên dưới form
                        sau. Rất vui được hợp tác với quý công ty
                    </p>
                </div>
            </div>
            <div className="quotation-form">
                <h3 style={{ color: 'gray', marginBottom: '30px' }}>
                    Thông tin nhà cung cấp
                </h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '30px 20px'
                    }}
                >
                    <TextField
                        id="outlined-read-only-input"
                        label="Tên nhà cung cấp"
                        value={provider?.providerName ?? ''}
                        InputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Địa chỉ nhà cung cấp"
                        value={`${provider?.providerAddress ?? ''}, ${
                            wardVN.filter(
                                (ward) => ward.code === provider?.providerWard
                            )[0]?.name
                        }, ${
                            districtVN.filter(
                                (district) =>
                                    district.code === provider?.providerDistrict
                            )[0]?.name
                        },${
                            provinceVN.filter(
                                (province) =>
                                    province.code === provider?.providerCity
                            )[0]?.name
                        } `}
                        InputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Loại hình"
                        value={
                            providerConstant.filter(
                                (getProvider) =>
                                    getProvider.value === provider?.categoryId
                            )[0]?.label
                        }
                        InputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                </div>

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
                    <>
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}
                            >
                                <h3 style={{ color: 'gray', margin: '20px 0' }}>
                                    Cung cấp thông tin báo giá
                                </h3>
                                <div>
                                    <button
                                        style={{
                                            padding: '5px 15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: '#232539',
                                            border: 'none',
                                            color: '#fff',
                                            outline: 'none',
                                            borderRadius: '10px',
                                            fontSize: '14px'
                                        }}
                                        onClick={handleDownload}
                                    >
                                        <FileDownloadIcon />
                                        Tải file excel mẫu
                                    </button>
                                </div>
                            </div>
                            <label htmlFor="">
                                Vui lòng upload file có định dạng excel dưới đây
                            </label>
                            <div style={{ marginTop: '10px' }}>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startIcon={<UploadFileIcon />}
                                    sx={{ marginRight: '1rem' }}
                                >
                                    Upload Excel
                                    <input
                                        type="file"
                                        accept=".xlsx"
                                        hidden
                                        onChange={handleFileUpload}
                                    />
                                </Button>
                                <Box sx={{ display: 'inline-block' }}>
                                    {filename}
                                </Box>
                                {fileError && (
                                    <Box
                                        sx={{
                                            display: 'inline-block',
                                            color: 'red'
                                        }}
                                    >
                                        {fileError}
                                    </Box>
                                )}
                            </div>
                        </div>
                        <Button
                            sx={{ display: 'flex', marginLeft: 'auto' }}
                            variant="contained"
                            onClick={() => {
                                handleSendFile();
                            }}
                        >
                            Gửi
                        </Button>
                    </>
                )}
            </div>
        </main>
    );
}

export default ProviderQuotation;
