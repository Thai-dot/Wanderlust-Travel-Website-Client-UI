import React from 'react';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SellIcon from '@mui/icons-material/Sell';
import { Link } from 'react-router-dom';
import exampleImg from '../../assets/images/California.jpg';

interface PlaceProp {
    tour: any;
    tourDateCode: number;
    date: any;
    id: number;
    sellingPrice: number;
}

const Place: React.FC<PlaceProp> = ({
    tour,
    tourDateCode,
    date,
    id,
    sellingPrice
}) => {

    console.log(tour)   ;
    return (
        <div className="place">
            <div className="place__image">
                <AiOutlineHeart style={{ cursor: 'pointer' }} />
                <img
                    src={
                         tour.tourImage.length === 0
                            ? exampleImg
                            : tour.tourImage
                    }
                    alt="place img"
                />
            </div>
            <div className="place__description">
                <div className="rating">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                </div>
                <Link to={`/tour/${id}`}>
                    <h5 className="text-header">
                        [{tourDateCode}] {tour.tourName}
                    </h5>
                </Link>
            </div>
            <div className="place__prices">
                <div
                    className="price"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '10px',
                        color: '#FF2D54'
                    }}
                >
                    <SellIcon /> {Intl.NumberFormat().format(sellingPrice)}{' '}
                    vnđ/1ng
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center'
                    }}
                >
                    <div
                        className="price"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        <AccessTimeIcon /> {tour.days}n/{tour.nights}đ
                    </div>
                    <div
                        className="price"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        <CalendarMonthIcon /> {date.slice(0, 10)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Place;
