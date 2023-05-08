import React from 'react';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { favouriteAction } from '../../features/favourite/favouriteSlice';
import { Hotel } from '../../models/hotel';
import exampleImg from '../../assets/images/California.jpg';

interface PlaceProp {
    tour: any;
}

const Place: React.FC<PlaceProp> = ({ tour }) => {
    return (
        <div className="place">
            <div className="place__image">
                <AiOutlineHeart style={{ cursor: 'pointer' }} />
                <img
                    src={tour.tourImage !== '' ? tour.tourImage : exampleImg}
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
                <Link to={`/tour/${tour.id}`} >
                    <h4 style={{textTransform: "capitalize"}}>{tour.tourName}</h4>
                </Link>
                <h6>{tour.tourCode}</h6>
            </div>
            <div className="place__prices" style={{ display: "flex", gap:"1rem" }}>
                <div className="price"> Day: {tour.days}</div>
                <div>
                    <span className="price"> Nights: {tour.nights}</span>
                </div>
            </div>
        </div>
    );
};

export default Place;
