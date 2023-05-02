import React from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Logo from "../../assets/images/logoTravel.png";
import { authAction } from "../../features/auth/authSlice";
import California from "../../assets/images/California.jpg";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authAction.logout());
  };
  const auth = useAppSelector((state) => state.auth);
  return (
    <nav className="nav-bar">
      <NavLink to="/">
        <img src={Logo} width={130} height={70} style={{borderRadius: "5px"}} alt="logo" />
      </NavLink>
      <div className="section">
        <div className="dropdown">
          <button className="dropdown__button">
            Home <BiChevronDown />
          </button>
          <div className="dropdown__menu">
            <a href="/" className="link">
              Home
            </a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropdown__button">About</button>
          {/* <div className="dropdown__menu"></div> */}
        </div>
        <div className="dropdown">
          <NavLink to={"/filter"}>
            <button className="dropdown__button">Listing</button>
          </NavLink>
        </div>
      </div>
      <div className="actions">
        <div className="dropdown">
          <div className="action dropdown__button">
            <AiOutlineShoppingCart />
          </div>
          <div className="dropdown__menu dropdown__room">
            <h3>Your cart</h3>
            <div className="room">
              <div className="order">
                <div className="room__image">
                  <img src={California} alt="place" />
                </div>
                <div className="room__description">
                  <h6>Standard Double Room</h6>
                  <p>
                    Price: <span>$160</span>
                  </p>
                </div>
              </div>
              <div className="room__price">
                Subtotal <span>$160</span>
              </div>
              <NavLink to={"/checkout/1"}>
                <button className="room__btn">Pay Now</button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="dropdown">
          <div className="action dropdown__button">
            <AiOutlineUser />
          </div>
          <div className="dropdown__menu">
            {auth.isLoggedIn ? (
              <a href="/user-setting" className="link">
                Thông tin tài khoản
              </a>
            ) : (
              <a href="/login" className="link">
                Login
              </a>
            )}
            {auth.isLoggedIn && (
              <button className="link" onClick={handleLogout}>
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
