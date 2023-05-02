import React from "react";
import SubscribeImage from "../../../assets/images/subscribe.png";

const Subscribe = () => {
  return (
    <div className="subscribe">
      <div className="subscribe__image">
        <img src={SubscribeImage} alt="subscribe" />
      </div>
      <div className="subscribe__input">
        <h3>Get special offers, and more from Traveler</h3>
        <p>Subscribe to see secret deals prices drop the moment you sign up!</p>
        <div className="subscribe__form">
          <input
            type="text"
            name="email"
            className="input"
            placeholder="Email Address"
          />
          <button type="button" className="btn-submit">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
