import React from 'react';
import '../../styles/components/footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>TravelEase VN</h4>
                    <p>Email: travelease5231@gmail.com</p>
                    <p>Phone: 0919520565</p>
                </div>
                <div className="footer-section">
                    <h4>Đường dẫn</h4>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/filter">Danh sách tour</a>
                        </li>
                        <li>
                            <a href="/user-setting">Thông tin cá nhân</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
