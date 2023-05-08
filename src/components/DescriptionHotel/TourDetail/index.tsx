import React, { Fragment } from 'react';
import About from '../DescriptionItems/About';
import BookingRoom from '../Booking/BookingRoom';
import SwiperRoom from '../../Swiper/SwiperRoom';
import { BiArea } from 'react-icons/bi';
import CodeIcon from '@mui/icons-material/Code';
import { IoBedOutline } from 'react-icons/io5';
import { MdChildCare, MdOutlinePersonOutline } from 'react-icons/md';

interface DescriptionTourProp {
    tourData: any;
}

const DescriptionTour = (props: DescriptionTourProp) => {
    const { tourData } = props;
    console.log(tourData);
    return (
        <Fragment>
            <div className="hotel">
                <div className="hotel__describe">
                    <div className="hotel__description">
                        <div className="hotel-list">
                            <div className="items">
                                <div className="item">
                                    <div className="icon">
                                        <BiArea />
                                    </div>
                                    <span className="text">SQ:m</span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <IoBedOutline />
                                    </div>
                                    <span className="text">Beds: </span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <MdOutlinePersonOutline />
                                    </div>
                                    <span className="text">Adults: </span>
                                </div>
                                <div className="item">
                                    <div className="icon">
                                        <MdChildCare />
                                    </div>
                                    <span className="text">Children:</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <About
                        name="About this tour"
                        type={1}
                        descriptionData={tourData}
                    />
                    <About
                        name="Tour Policies"
                        type={7}
                        descriptionData={tourData}
                    />
                 
                </div>
                <div className="hotel__status">
                    <BookingRoom />
                </div>
            </div>
            <div className="recommend">
                <h1>Explore other options</h1>
                <SwiperRoom />
            </div>
        </Fragment>
    );
};

export default DescriptionTour;
