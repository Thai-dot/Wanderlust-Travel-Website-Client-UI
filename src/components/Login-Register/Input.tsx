import React from "react";

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return (
    <div className="form__input">
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Input;
