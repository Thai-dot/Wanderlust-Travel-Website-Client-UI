import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logoTravel.png';
import California from '../../assets/images/California.jpg';
import authFirebase from '../../service/firebase/SignInWithProvider/getAuth';
import { getCookie, removeCookie } from '../../utils/cookies';
import { isTokenExpired } from '../../utils/jwtFunction';

const NavBar = () => {
    const token = getCookie('accessToken') ?? '';

    const handleLogout = () => {
        authFirebase
            .signOut()
            .then((message) => {
                removeCookie('accessToken');
                removeCookie('id');
                window.location.href = '/login';
            })
            .catch((err) => console.error(err));
    };

    React.useEffect(() => {
        if (token && isTokenExpired(token)) {
            handleLogout();
        }
    }, [token]);

    const [user, setUser] = useState<any>(false);

    useEffect(() => {
        const unsubscribe = authFirebase.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <nav className="nav-bar">
            <NavLink to="/">
                <img
                    src={Logo}
                    width={130}
                    height={70}
                    style={{ borderRadius: '5px' }}
                    alt="logo"
                />
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
                    <NavLink to={'/filter'}>
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
                            <NavLink to={'/checkout/1'}>
                                <button className="room__btn">Pay Now</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="dropdown">
                    <div className="action dropdown__button">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '20px'
                                }}
                                alt="user avatar"
                            />
                        ) : (
                            <AiOutlineUser />
                        )}
                    </div>
                    <div className="dropdown__menu">
                        {user ? (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <a href="/user-setting">
                                    <button type="button" className="link">
                                        User Setting
                                    </button>
                                </a>

                                <button className="link" onClick={handleLogout}>
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <a href="/login" className="link">
                                Login
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
