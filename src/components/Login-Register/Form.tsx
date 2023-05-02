import React, { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Facebook from "../../assets/images/Facebook.svg";
import Google from "../../assets/images/Google.svg";
import Twitter from "../../assets/images/Twitter.svg";
import {
  authAction,
  LoginPayload,
  RegisterPayload,
} from "../../features/auth/authSlice";
import Input from "./Input";
import { CircularProgress } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { signInWithGoogle } from "../../service/firebase/signInWithProvider/signInWithProvider";

interface FormProps {
  name: string;
  type: number;
}

const Form = (props: FormProps) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [userLogin, setUserLogin] = useState<LoginPayload>({
    username: "",
    password: "",
  });
  const [userRegister, setUserRegister] = useState<RegisterPayload>({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  if (!auth.loading && auth.isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === 1) {
      setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    } else {
      setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
    }
  };

  const handleLogin = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(authAction.login(userLogin));
  };

  const handleRegister = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(authAction.register(userRegister));
  };

  return (
    <div className="user-form">
      <h2>{props.type === 1 ? "Sign in" : "Sign up"}</h2>
      <form className="form">
        <h3>
          {props.type === 1 ? "Sign in to your account" : "Create an account"}
        </h3>
        <Input
          name="username"
          placeholder="Enter username or email"
          type="text"
          handleChange={handleChange}
        />
        {props.type === 0 && (
          <Input
            name="fullName"
            placeholder="Enter full name"
            type="text"
            handleChange={handleChange}
          />
        )}
        {props.type === 0 && (
          <Input
            name="email"
            placeholder="Enter email"
            type="email"
            handleChange={handleChange}
          />
        )}
        {props.type === 0 && (
          <Input
            name="phoneNumber"
            placeholder="Enter phone number"
            type="text"
            handleChange={handleChange}
          />
        )}
        <Input
          name="password"
          placeholder="Enter password"
          type="password"
          handleChange={handleChange}
        />
        {props.type === 0 ? (
          <button className="form__btn" onClick={handleRegister}>
            {auth.loading === true ? (
              <CircularProgress color="inherit" size={"16px"} />
            ) : (
              "Register"
            )}
          </button>
        ) : (
          <button className="form__btn" onClick={handleLogin}>
            {auth.loading ? (
              <CircularProgress color="inherit" size={"16px"} />
            ) : (
              "Login"
            )}
          </button>
        )}
      </form>
      <div className="actions">
        <div className="remember-me">
          <input type="checkbox" className="checkbox" />{" "}
          {props.type === 1
            ? "Remember me"
            : "I confirm that I have read and accepted the policy"}
        </div>
        {props.type === 1 && <a href="/forgot-password">Forgot Password?</a>}
      </div>
      <div className="login-text">
        <span className="rope"></span>
        <span>or sign in with</span>
        <span className="rope"></span>
      </div>
      <div className="social-login">
        <div className="item">
          <img src={Facebook} alt="social" className="social-image" />
          <p>Sign in with facebook</p>
        </div>
        <div className="item" onClick={() => signInWithGoogle()} style={{cursor:"pointer"}}>
          <img src={Google} alt="social"  className="social-image" />
          <p>Sign in with google</p>
        </div>
        <div className="item">
          <img src={Twitter} alt="social" className="social-image" />
          <p>Sign in with twitter</p>
        </div>
      </div>
      {props.type === 1 && (
        <Link to="/register" className="create-account">
          Create an account
        </Link>
      )}
      {props.type === 0 && (
        <Link to="/login" className="create-account">
          Already have an account? Sign in
        </Link>
      )}
    </div>
  );
};

export default Form;
