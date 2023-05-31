import React, { useEffect, useState } from 'react';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames';
import { Button } from '@mui/material';
import axiosClientInstance from '../../service/axios/axiosClient/axiosClient';
import moment from 'moment';

interface ListItemType {
    id: number;
    bookingName?: string;
    price?: number;
    statusType?: number;
    handleRemove?: any;
    handlePayment?: any;
}

export default function ListItem(props: ListItemType) {
    const { bookingName, statusType, id, price, handleRemove, handlePayment } =
        props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [dateOfTour, setDateOfTour] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            axiosClientInstance.get(`/api/booking/${id}`).then((bookingRes) => {
                axiosClientInstance
                    .get(
                        `/api/customers/tourDates/${bookingRes.data.tourDateId}`
                    )
                    .then((tourRes) => {
                        setDateOfTour(tourRes.data.date);
                    });
            });
        };

        if (dateOfTour === null) {
            fetchData();
        }
    });

    const startDate = moment(dateOfTour);
    const currentDate = moment();

    const isGreaterThan3Days = startDate.isAfter(
        currentDate.add(3, 'days'),
        'day'
    );

    return (
        <div
            className={classNames(
                'booking-list-item gap-2 d-flex justify-between',
                `status-${statusType}`
            )}
        >
            <div className="bookingName">{bookingName}</div>
            <div className="d-flex gap-2 align-center">
                <div className="bookingPrice">
                    {Intl.NumberFormat().format(price ?? 0)}
                    &nbsp;vnđ
                </div>
                {statusType === 0 && (
                    <Button
                        aria-controls={
                            open ? 'demo-positioned-menu' : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <PaymentOutlinedIcon
                            sx={{
                                color: '#59b2d6',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        />
                    </Button>
                )}

                {statusType === 1 && (
                    <PaymentOutlinedIcon
                        sx={{
                            color: '#59b2d6',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                        onClick={() => {
                            handlePayment(id, price, statusType);
                        }}
                    />
                )}

                {statusType === 0 && (
                    <RemoveOutlinedIcon
                        sx={{
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                        onClick={() => handleRemove(id)}
                    />
                )}
            </div>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <MenuItem
                    onClick={() => {
                        handlePayment(id, price, statusType);
                    }}
                >
                    Thanh toán 100%
                </MenuItem>
                {isGreaterThan3Days && (
                    <MenuItem
                        onClick={() => {
                            handlePayment(id, price, statusType, '70');
                        }}
                    >
                        Thanh toán 70%
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}
