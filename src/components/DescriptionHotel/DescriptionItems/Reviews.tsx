import moment from "moment";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useAppSelector } from "../../../app/hooks";
import Person from "../../../assets/images/person.jpg";

const Reviews = () => {
  const hotel = useAppSelector((state) => state.hotel);
  console.log(hotel.hotel?.reviews);
  return (
    <div className="reviews">
      <div className="reviews__box">
        <div className="reviews__number">
          <AiFillStar />
          <span className="emphasize">5 / 5</span>
          <span className="emphasize">Excellent</span>
          <span>(3 reviews)</span>
        </div>
        <div className="reviews__list">
          <div className="reviews__list__item">
            <p className="description">Cleanliness</p>
            <span className="status-bar"></span>
            <span className="rating">5 / 5</span>
          </div>
          <div className="reviews__list__item">
            <p className="description">Room</p>
            <span className="status-bar"></span>
            <span className="rating">5 / 5</span>
          </div>
          <div className="reviews__list__item">
            <p className="description">Room</p>
            <span className="status-bar"></span>
            <span className="rating">5 / 5</span>
          </div>
        </div>
      </div>
      <div className="reviews__descriptions">
        {hotel.hotel?.reviews.map((review) => (
          <div className="reviews__description">
            <div className="user__info">
              <div className="user__info__image">
                <img src={Person} alt="person" />
              </div>
              <div className="user__info__description">
                <p>{review.user.fullName}</p>
                <span>
                  {moment(review.createdAt).subtract(10, "days").calendar()}
                </span>
              </div>
            </div>
            <div className="rating">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <div className="comment">{review.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
