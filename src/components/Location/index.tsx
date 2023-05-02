import React, { useEffect } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import California from "../../assets/images/California.jpg";
import { Link, useParams } from "react-router-dom";
import Subscribe from "../Home/Introduce/Subscribe";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { destinationAction } from "../../features/destinations/destinationSlice";
import Skeleton from "react-loading-skeleton";
import Place from "./Place";

const Location = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(destinationAction.getOne(params.id as string));
  }, [params, dispatch]);

  const destination = useAppSelector((state) => state.destination);

  if (destination.loadingOne) {
    return <Skeleton height={"500px"} width={"100%"} />;
  }
  return (
    <div className="location">
      <div className="images">
        <Swiper
          navigation={true}
          loopFillGroupWithBlank={true}
          modules={[Navigation]}
          className="mySwiper"
          centeredSlides={true}
          centeredSlidesBounds={true}
          spaceBetween={20}
        >
          <SwiperSlide>
            <img src={destination.destination?.images[1]} alt="place" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={destination.destination?.images[2]} alt="place" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={destination.destination?.images[3]} alt="place" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={destination.destination?.images[4]} alt="place" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="location__description">
        <div className="text-location">
          <h3 className="title">{destination.destination?.locationName}</h3>
          <p className="description">{destination.destination?.description}</p>
        </div>
        <div className="map-location"></div>
      </div>
      <div className="location__place">
        <h2>{destination.destination?.locationName}</h2>
        <div className="places">
          {destination.hotels?.map((hotel) => (
            <Place hotel={hotel} />
          ))}
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default Location;
