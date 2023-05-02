import React from "react";
import DatePickerComponent from "./DatePicker";
import Facilities from "./Facilities";
import Reviews from "./Reviews";
import RoomAvailable from "./RoomAvailable";
import Rules from "./Rules";

interface AboutProps {
  name: string;
  type: number;
  description?: string;
  facilities?: {
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
  };
}

const About = (props: AboutProps) => {
  return (
    <div className="about__hotel">
      <h3>{props.name}</h3>
      <div className="about__describe">
        {props.type === 1 && (
          <p style={{ lineHeight: 2 }}>{props.description}</p>
        )}
        {props.type === 2 && <Facilities facilities={props.facilities} />}
        {props.type === 3 && <Rules />}
        {props.type === 4 && <RoomAvailable />}
        {props.type === 5 && <Reviews />}
        {props.type === 6 && <DatePickerComponent />}
      </div>
    </div>
  );
};

export default About;
