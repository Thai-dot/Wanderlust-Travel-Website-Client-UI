import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import California from "../../assets/images/California.jpg";
import { GoLocation } from "react-icons/go";
import { FaTimes } from "react-icons/fa";

const WishList = () => {
  return (
    <div className="wish-list">
      <div className="items">
        <div className="item">
          <span className="remove">
            <FaTimes />
          </span>
          <div className="item__image">
            <img src={California} alt="place" />
          </div>
          <div className="item__description">
            <div className="about-hotel">
              <div className="rating">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <h4>Redac Gateway Hotel</h4>
              <div className="tags">
                <span>Budget</span>
                <span>Romantic</span>
                <span>Beautiful</span>
                <span>Best price</span>
              </div>
            </div>
            <div className="location">
              <GoLocation /> New York City
            </div>
          </div>
          <div className="item__reviews">
            <div className="review">
              <p>Excellent (5 / 5)</p>
              <span>3 reviews</span>
            </div>
            <div className="price">
              From <span className="black">133$</span> / night
            </div>
          </div>
        </div>
        <div className="item">
          <span className="remove">
            <FaTimes />
          </span>
          <div className="item__image">
            <img src={California} alt="place" />
          </div>
          <div className="item__description">
            <div className="about-hotel">
              <div className="rating">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <h4>Redac Gateway Hotel</h4>
              <div className="tags">
                <span>Budget</span>
                <span>Romantic</span>
                <span>Beautiful</span>
                <span>Best price</span>
              </div>
            </div>
            <div className="location">
              <GoLocation /> New York City
            </div>
          </div>
          <div className="item__reviews">
            <div className="review">
              <p>Excellent (5 / 5)</p>
              <span>3 reviews</span>
            </div>
            <div className="price">
              From <span className="black">133$</span> / night
            </div>
          </div>
        </div>
        <div className="item">
          <span className="remove">
            <FaTimes />
          </span>
          <div className="item__image">
            <img src={California} alt="place" />
          </div>
          <div className="item__description">
            <div className="about-hotel">
              <div className="rating">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <h4>Redac Gateway Hotel</h4>
              <div className="tags">
                <span>Budget</span>
                <span>Romantic</span>
                <span>Beautiful</span>
                <span>Best price</span>
              </div>
            </div>
            <div className="location">
              <GoLocation /> New York City
            </div>
          </div>
          <div className="item__reviews">
            <div className="review">
              <p>Excellent (5 / 5)</p>
              <span>3 reviews</span>
            </div>
            <div className="price">
              From <span className="black">133$</span> / night
            </div>
          </div>
        </div>
      </div>
      <span className="count-string">1 - 4 of 4 hotels</span>
    </div>
  );
};

export default WishList;
