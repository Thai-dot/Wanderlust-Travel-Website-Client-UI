import React from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { favouriteAction } from "../../features/favourite/favouriteSlice";
import { Hotel } from "../../models/hotel";

interface PlaceProp {
  hotel: Hotel;
}

const Place: React.FC<PlaceProp> = ({ hotel }) => {
  const dispatch = useDispatch();
  const handleAddToFavourite = (_id: string) => {
    dispatch(favouriteAction.create(_id));
  };
  return (
    <div className="place">
      <div className="place__image">
        <AiOutlineHeart
          onClick={() => handleAddToFavourite(hotel._id as string)}
          style={{ cursor: "pointer" }}
        />
        <img src={hotel.images[0]} alt="place" />
      </div>
      <div className="place__description">
        <div className="rating">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <Link to={`/hotel/${hotel._id}`}>
          <h3>{hotel.nameHotel}</h3>
        </Link>
        <h6>{hotel.destination.locationName}</h6>
      </div>
      <div className="place__prices">
        From: <span className="price">${hotel.price}</span> / night
      </div>
    </div>
  );
};

export default Place;
