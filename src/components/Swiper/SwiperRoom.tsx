import React from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BiArea } from "react-icons/bi";
import { NavLink, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../app/hooks";
import Room1 from "../../assets/images/Site1-1.png";
import { IoBedOutline } from "react-icons/io5";
import { MdChildCare, MdOutlinePersonOutline } from "react-icons/md";

const SwiperRoom = () => {
  const room = useAppSelector((state) => state.room);
  const params = useParams();

  console.log(room.rooms);
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
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      // modules={[Pagination]}
      className="swiper"
    >
      {room.rooms.map(
        (item) =>
          item._id !== params.id && (
            <SwiperSlide className="place">
              <div className="place__image">
                <img src={item.images[0]} alt="place" />
              </div>
              <div className="place__description">
                <div className="rating">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <h3>{item.name}</h3>
                <h6>Los Angeles</h6>
              </div>
              <div className="place__list">
                <div className="place__list__item">
                  <div className="icon">
                    <BiArea />
                  </div>
                  <span className="text">{item.area}m</span>
                </div>
                <div className="place__list__item">
                  <div className="icon">
                    <IoBedOutline />
                  </div>
                  <span className="text">Beds: {item.beds}</span>
                </div>
                <div className="place__list__item">
                  <div className="icon">
                    <MdOutlinePersonOutline />
                  </div>
                  <span className="text">Adults: {item.maxAdults}</span>
                </div>
                <div className="place__list__item">
                  <div className="icon">
                    <MdChildCare />
                  </div>
                  <span className="text">Children: {item.maxChildren}</span>
                </div>
              </div>
              <div className="place__prices">
                From: <span className="price">${item.price}</span> / night
              </div>
              <NavLink to={`/room/${item.hotel._id}/${item._id}`}>
                <button className="place__button">Room Details</button>
              </NavLink>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

export default SwiperRoom;
