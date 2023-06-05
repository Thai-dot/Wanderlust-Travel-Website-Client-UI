import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../assets/images/TravelEase.svg';
import { useLocation } from 'react-router-dom';

import California from '../../assets/images/California.jpg';
import authFirebase from '../../service/firebase/SignInWithProvider/getAuth';
import { getCookie, removeCookie, setCookie } from '../../utils/cookies';
import { isTokenExpired } from '../../utils/jwtFunction';

const NavBar = () => {
    const token = getCookie('accessToken') ?? '';

      const location = useLocation();
      const pathname = location.pathname;
     
      const isQuotationProvider =
          pathname.split('/')[1] === 'provider-quotation';

    const isExpired = isTokenExpired(token);

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
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = authFirebase.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null); // Set user state to null when there is no authenticated user
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
            {!isQuotationProvider && (
                <>
                    <div className="section">
                        <div>
                            <Link to="/home">
                                <button className="dropdown__button">
                                    Home
                                </button>
                            </Link>
                        </div>
                        <div className="dropdown">
                            <Link to="/about">
                                <button className="dropdown__button">
                                    About
                                </button>
                            </Link>
                            {/* <div className="dropdown__menu"></div> */}
                        </div>
                        <div className="dropdown">
                            <NavLink to={'/filter'}>
                                <button className="dropdown__button">
                                    Danh sách tour
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="dropdown">
                            <Link to="/customer/booking-list">
                                <div className="action dropdown__button">
                                    <AiOutlineShoppingCart />
                                </div>
                            </Link>
                        </div>
                        <div className="dropdown">
                            <div className="action dropdown__button">
                                {user?.photoURL && !isExpired ? (
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
                                {user && !isExpired ? (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <a href="/user-setting">
                                            <button
                                                type="button"
                                                className="link"
                                            >
                                                Thông tin cá nhân
                                            </button>
                                        </a>

                                        <button
                                            className="link"
                                            onClick={handleLogout}
                                        >
                                            Đăng Xuất
                                        </button>
                                    </div>
                                ) : (
                                    <a href="/login" className="link">
                                        Đăng nhập
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default NavBar;
