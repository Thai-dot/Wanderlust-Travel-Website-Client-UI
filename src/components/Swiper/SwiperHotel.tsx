import React from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../app/hooks";
import { favouriteAction } from "../../features/favourite/favouriteSlice";

const SwiperHotel = () => {
  const hotel = useAppSelector((state) => state.hotel);
  const dispatch = useDispatch();
  const params = useParams();
  const handleAddToFavourite = (_id: string) => {
    console.log(_id);
    dispatch(favouriteAction.create(_id));
  };
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      // modules={[Pagination]}
      className="swiper"
    >
      {hotel.hotels.map(
        (hotel) =>
          hotel._id !== params.id && (
            <SwiperSlide className="place">
              <div className="place__image">
                <AiOutlineHeart
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAddToFavourite(hotel._id as string)}
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
                <NavLink to={`/hotel/${hotel._id}`}>
                  <h3>{hotel.nameHotel}</h3>
                </NavLink>
                <h6>{hotel.destination.locationName}</h6>
              </div>
              <div className="place__prices">
                From: <span className="price">${hotel.price}</span> / night
              </div>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

export default SwiperHotel;
