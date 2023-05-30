import TextField from '@mui/material/TextField/TextField';
import React from 'react';

interface TouristFormType {
    touristList: any;
    handleOnChange: any;
}

function TouristForm(props: TouristFormType) {
    const { touristList, handleOnChange } = props;
    return (
        <div className="tourist-form">
            <h3 style={{ textAlign: 'center' }}>
                Thông tin hành khách trong tour
            </h3>
            {touristList.map((tourist: any, index : number) => {
                return (
                    <div className="tourist-item">
                        <h5>Thông tin hành khách {index + 1}</h5>
                        <div style={{display: 'grid', gridTemplateColumns : '1fr 1fr 1fr', gap: '1rem',margin: '20px 0'}}>
                            <TextField
                                id="outlined-basic"
                                label="Họ và tên"
                                name='fullName'
                                variant="outlined"
                                value={tourist.fullName}
                                fullWidth
                                required
                                onChange={(e : any) => {
                                    handleOnChange(e, index)
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                name='email'
                                type='email'
                                variant="outlined"
                                value={tourist.email}
                                fullWidth
                                onChange={(e : any) => {
                                    handleOnChange(e, index)
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Số điện thoại"
                                name='phoneNumber'
                                variant="outlined"
                                value={tourist.phoneNumber}
                                fullWidth
                                onChange={(e : any) => {
                                    handleOnChange(e, index)
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TouristForm;
