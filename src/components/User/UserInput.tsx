import React from "react";

interface UserInputProp {
  name: string;
  type: string;
  title: string;
  required?: boolean;
  pattern?: string;
  disabled?: boolean;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInput: React.FC<UserInputProp> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !props.disabled && props.handleChange(e);
  };
  return (
    <div className="input-area">
      <label htmlFor={props.name}>{props.title}</label>
      <input
        type={props.type}
        name={props.name}
        required={props.required}
        pattern={props.pattern}
        disabled={props.disabled}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserInput;
