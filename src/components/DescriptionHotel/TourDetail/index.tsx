import React, { Fragment } from 'react';
import About from '../DescriptionItems/About';
import BookingRoom from '../Booking/BookingRoom';


interface DescriptionTourProp {
    tourData: any;
    tourPrice: number;
    tourDateCode: string;
    departureDate: string;
    noOfPax: number;
    tourDateID:number;
}

const DescriptionTour = (props: DescriptionTourProp) => {
    const {
        tourData,
        tourPrice,
        tourDateCode,
        departureDate,
        noOfPax,
        tourDateID
    } = props;

    return (
        <Fragment>
            <div className="tour">
                <div className="tour__describe">
                    <About
                        name="Giới thiệu tour"
                        type={1}
                        descriptionData={tourData}
                    />
                    <About
                        name="Hành trình tour"
                        type={2}
                        descriptionData={tourData}
                    />
                    <About
                        name="Các chính sách có trong tour"
                        type={7}
                        descriptionData={tourData}
                    />
                </div>
                <div className="tour__status">
                    <BookingRoom
                        tourData={tourData}
                        tourPrice={tourPrice}
                        tourDateCode={tourDateCode}
                        departureDate={departureDate}
                        noOfPax={noOfPax}
                        tourDateID={tourDateID}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default DescriptionTour;
