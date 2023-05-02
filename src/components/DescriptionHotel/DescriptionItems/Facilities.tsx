import React from "react";
import { AiOutlineWifi } from "react-icons/ai";

interface FacilitiesProps {
  facilities:
    | {
        airportTransport: boolean;
        fitnessCenter: boolean;
        heater: boolean;
        internet: boolean;
        restaurant: boolean;
        spa: boolean;
        waterAndDryer: boolean;
        airConditioner: boolean;
        hotWater: boolean;
        shampoo: boolean;
        tv: boolean;
      }
    | undefined;
}

const Facilities = (props: FacilitiesProps) => {
  console.log(props.facilities);
  return (
    <div className="about__facilities">
      <div className="item">
        <AiOutlineWifi /> Internet - Wifi
      </div>
    </div>
  );
};

export default Facilities;
