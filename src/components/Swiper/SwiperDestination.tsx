import Skeleton from "react-loading-skeleton";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../app/hooks";
import California from "../../assets/images/California.jpg";
import { NavLink } from "react-router-dom";

const SwiperDestination = () => {
  const destination = useAppSelector((state) => state.destination);
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
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      // modules={[Navigation]}
      className="swiper"
      style={{ width: "100%" }}
    >
      {destination.loading ? (
        <>
          <SwiperSlide className="swiper__slide">
            <div className="swiper__image">
              <Skeleton height="100%" />
            </div>
            <div className="swiper__description">
              <Skeleton height="20px" style={{ marginBottom: "5px" }} />
              <span>Loading...</span>
            </div>
          </SwiperSlide>
        </>
      ) : (
        destination.destinations?.map((destination) => (
          <SwiperSlide className="swiper__slide">
            <div className="swiper__image">
              <NavLink to={`/location/${destination._id}`}>
                <img src={destination.images[0]} alt="place" />
              </NavLink>
            </div>
            <div className="swiper__description">
              <NavLink to={`/location/${destination._id}`}>
                <h3>{destination.locationName}</h3>
              </NavLink>
              <span>{destination.hotelQuantity} Hotels</span>
            </div>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default SwiperDestination;
