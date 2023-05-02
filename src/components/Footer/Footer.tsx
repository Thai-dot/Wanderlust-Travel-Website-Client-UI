import React from 'react';
import '../../styles/components/footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Wanderlust VN</h4>
                    <p>Email: wanderlust5231@gmail.com</p>
                    <p>Phone: 0919520565</p>
                </div>
                <div className="footer-section">
                    <h4>Navigate</h4>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/filter">Tour List</a>
                        </li>
                        <li>
                            <a href="/personal-information">
                                Personal Information
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
