import React, { Fragment } from "react";
import About from "../DescriptionItems/About";
import BookingRoom from "../Booking/BookingRoom";
import SwiperRoom from "../../Swiper/SwiperRoom";
import { BiArea } from "react-icons/bi";
import { Room } from "../../../models/room";
import { IoBedOutline } from "react-icons/io5";
import { MdChildCare, MdOutlinePersonOutline } from "react-icons/md";

interface DescriptionRoomProp {
  room: Room;
}

const DescriptionRoom = (props: DescriptionRoomProp) => {
  return (
    <Fragment>
      <div className="hotel">
        <div className="hotel__describe">
          <div className="hotel__description">
            <div className="hotel-list">
              <div className="items">
                <div className="item">
                  <div className="icon">
                    <BiArea />
                  </div>
                  <span className="text">SQ: {props.room.area}m</span>
                </div>
                <div className="item">
                  <div className="icon">
                    <IoBedOutline />
                  </div>
                  <span className="text">Beds: {props.room.beds}</span>
                </div>
                <div className="item">
                  <div className="icon">
                    <MdOutlinePersonOutline />
                  </div>
                  <span className="text">Adults: {props.room.maxAdults}</span>
                </div>
                <div className="item">
                  <div className="icon">
                    <MdChildCare />
                  </div>
                  <span className="text">
                    Children: {props.room.maxChildren}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <About
            name="About this room"
            type={1}
            description={props.room.description}
          />
          <About name="Room Facilities" type={2} />
          {/* <About name="Rules" type={3} />
          <About name="Availability" type={4} />
          <About name="Reviews" type={5} /> */}
        </div>
        <div className="hotel__status">
          <BookingRoom />
        </div>
      </div>
      <div className="recommend">
        <h1>Explore other options</h1>
        <SwiperRoom />
      </div>
    </Fragment>
  );
};

export default DescriptionRoom;
