import React from "react";
import NotFound from "../assets/images/404.png";

const NotFoundPage = () => {
  return (
    <div className="main-page">
      <div className="not-found">
        <img src={NotFound} alt="not-found" />
        <h2>Oops! Look like you are lost</h2>
        <p>Either something went wrong or the page doesn't exist anymore.</p>
        <button className="return-page">Go to home</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
