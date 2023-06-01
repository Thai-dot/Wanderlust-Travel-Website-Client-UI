import Button from '@mui/material/Button/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React, { ChangeEvent, useState } from 'react';
import '../styles/components/providerQuotation.scss';
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box/Box';

function ProviderQuotation() {
    const [filename, setFilename] = useState('');

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const { name } = file;
        setFilename(name);
    };

    const handleDownload = () => {
        fetch('quotation_sample_file.xlsx').then((response) => {
            response.blob().then((blob) => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'Sample_File.xlsx';
                alink.click();
            });
        });
    };
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
                        quý công ty trong khoảng thời gian từ
                        {} đến ngày {}. Xin quý công ty cung cấp báo giá trên
                        file excel và gửi lên dưới form sau. Rất vui được hợp
                        tác với quý công ty
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
                        defaultValue={'Ánh Sao Xanh'}
                        InputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Địa chỉ nhà cung cấp"
                        defaultValue={
                            '202 Tô Hiệu, phường Hiệp Tân, quận Tân Phú, thành phố Hồ Chí Minh'
                        }
                        InputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Loại hình"
                        defaultValue={'Khách sạn'}
                        InputProps={{
                            readOnly: true
                        }}
                        fullWidth
                    />
                </div>
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
                        <Box sx={{ display: 'inline-block' }}>{filename}</Box>
                    </div>
                </div>
                <Button
                    sx={{ display: 'flex', marginLeft: 'auto' }}
                    variant="contained"
                >
                    Gửi
                </Button>
            </div>
        </main>
    );
}

export default ProviderQuotation;
