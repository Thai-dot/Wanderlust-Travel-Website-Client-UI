import React from "react";
import HowItWork from "./HowItWork";
import PeopleHost from "./PeopleHost";

interface IProps {
  name: string;
  type: number;
}

const ElementWidget = (props: IProps) => {
  return (
    <div className="element-widget">
      <h3>{props.name}</h3>
      {props.type === 1 && <HowItWork />}
      {props.type === 2 && <PeopleHost />}
    </div>
  );
};

export default ElementWidget;
