import React from 'react';
import {
    AiOutlineArrowRight,
    AiOutlineEnvironment,
    AiOutlineSearch,
    AiOutlineUsergroupAdd
} from 'react-icons/ai';
import { BsCalendar3 } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import BannerImage from '../../assets/images/banner.png';

interface BannerProps {
    name: string;
}

const Banner = (props: BannerProps) => {
    return (
        <section className="banner">
            <img src={BannerImage} alt="banner" />
            {props.name === 'home' && (
                <div className="banner__text">
                    <h1>Hãy tìm theo tour của bạn</h1>
                    <h5>Nhận giá tốt từ Travel Ease</h5>
                </div>
            )}
            <div
                className={`travel-booking + ${
                    props.name === 'filter' && ' center'
                }`}
            >
                <div className="action">
                    <AiOutlineEnvironment />
                    <div className="description">
                        <h3>Địa điểm</h3>
                        <span>Nơi bạn muốn đi</span>
                    </div>
                </div>
                <div className="action">
                    <div className="day">
                        <BsCalendar3 />
                        <div className="description">
                            <h3>Day in</h3>
                            <span>Thêm ngày</span>
                        </div>
                    </div>
                    <AiOutlineArrowRight />
                    <div className="day">
                        <BsCalendar3 />
                        <div className="description">
                            <h3>Day out</h3>
                            <span>Thêm ngày</span>
                        </div>
                    </div>
                </div>

                <button className="btn">
                    <AiOutlineSearch /> Search
                </button>
            </div>
        </section>
    );
};

export default Banner;
