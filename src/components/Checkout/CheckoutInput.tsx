import React from "react";

interface CheckoutInputProp {
  name: string;
  type: string;
  title: string;
  required: boolean;
  pattern?: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckoutInput: React.FC<CheckoutInputProp> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handleChange(e);
  };
  return (
    <div className="input">
      <label htmlFor={props.name}>
        {props.title}
        {props.required && <span style={{ color: "#ff0000" }}>*</span>}
      </label>
      <input
        type={props.type}
        name={props.name}
        required={props.required}
        pattern={props.pattern}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckoutInput;
