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

    return (
        <Fragment>
            <div className="tour">
                <div className="tour__describe">
                   
                    {/* <About
                        name="About this tour"
                        type={1}
                        descriptionData={tourData}
                    />
                    */}
                    <About
                        name="Tour Policies"
                        type={7}
                        descriptionData={tourData}
                    />
                </div>
                <div className="tour__status">
                    <BookingRoom />
                </div>
            </div>
            
        </Fragment>
    );
};

export default DescriptionTour;
