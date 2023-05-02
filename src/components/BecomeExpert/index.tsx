import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import VideoImage from "../../assets/images/video-image.png";
import ElementWidget from "./ElementWidget";

const BecomeExpert = () => {
  return (
    <div className="become-expert">
      <div className="video">
        <img src={VideoImage} alt="place" />
        <div className="description">
          <h3>You can become a Local Expert anything, anywhere</h3>
          <div className="button">
            <BsFillPlayFill />
          </div>
        </div>
        {/* <iframe
          width="942"
          height="530"
          src="https://www.youtube.com/embed/wGLGYUcv_CU"
          title="Traveler - Single Hotel Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
      </div>
      <ElementWidget name="How does it work?" type={1} />
      <ElementWidget name="Meet the superhosts" type={2} />
    </div>
  );
};

export default BecomeExpert;
