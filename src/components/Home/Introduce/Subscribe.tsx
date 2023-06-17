import React from "react";
import SubscribeImage from "../../../assets/images/subscribe.png";

const Subscribe = () => {
  return (
    <div className="subscribe mb-40 mt-40">
      <div className="subscribe__image">
        <img src={SubscribeImage} alt="subscribe" />
      </div>
      <div className="subscribe__input">
        <h3>Nhận offer từ Travel Ease</h3>
        <p>Thêm email của bạn vào đây!</p>
        <div className="subscribe__form">
          <input
            type="text"
            name="email"
            className="input"
            placeholder="Email Address"
          />
          <button type="button" className="btn-submit">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
