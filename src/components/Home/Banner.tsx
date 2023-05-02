import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineEnvironment,
  AiOutlineSearch,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";
import BannerImage from "../../assets/images/banner.png";

interface BannerProps {
  name: string;
}

const Banner = (props: BannerProps) => {
  return (
    <section className="banner">
      <img src={BannerImage} alt="banner" />
      {props.name === "home" && (
        <div className="banner__text">
          <h1>Find your next stay</h1>
          <h5>Get the best prices on 2,000,000+ properties, worldwide</h5>
        </div>
      )}
      <div
        className={`travel-booking + ${props.name === "filter" && " center"}`}
      >
        <div className="action">
          <AiOutlineEnvironment />
          <div className="description">
            <h3>Location</h3>
            <span>Where are you going</span>
          </div>
        </div>
        <div className="action">
          <div className="day">
            <BsCalendar3 />
            <div className="description">
              <h3>Day in</h3>
              <span>Add Date</span>
            </div>
          </div>
          <AiOutlineArrowRight />
          <div className="day">
            <BsCalendar3 />
            <div className="description">
              <h3>Day out</h3>
              <span>Add Date</span>
            </div>
          </div>
        </div>
        <div className="action">
          <AiOutlineUsergroupAdd />
          <div className="description">
            <h3>Guest</h3>
            <span>Add guest and room</span>
          </div>
        </div>
        <button className="btn">
          <AiOutlineSearch /> Search
        </button>
      </div>
    </section>
  );
};

export default Banner;
