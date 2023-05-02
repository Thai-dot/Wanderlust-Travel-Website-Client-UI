import React from "react";
import { BiArea } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import Room from "../../../assets/images/Site1-Room1.png";

const RoomAvailable = () => {
  const room = useAppSelector((state) => state.room);
  const params = useParams();

  if (room.loading) {
    return <Skeleton height={"200px"} />;
  }

  return (
    <div className="about__room">
      {room.rooms.map((item) => (
        <div className="item">
          <div className="room__image">
            <img src={item.images[0]} alt="room" />
          </div>
          <div className="room__describe">
            <NavLink to={(`/room/${params.id}/` + item._id) as string}>
              <h6>{item.name}</h6>
            </NavLink>
            <div className="room__list">
              <div className="room__list__item">
                <div className="room__icon">
                  <BiArea />
                </div>
                <span>
                  {item.area}m<sup>2</sup>
                </span>
              </div>
            </div>
          </div>
          <div className="room__action">
            <NavLink to={`/room/${params.id}/${item._id}`}>
              <button className="submit-btn">Show price</button>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomAvailable;
