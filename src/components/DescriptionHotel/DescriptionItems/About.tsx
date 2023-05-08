import React from 'react';
import DatePickerComponent from './DatePicker';
import Facilities from './Facilities';
import Reviews from './Reviews';
import RoomAvailable from './RoomAvailable';
import StringHtml from '../../StringHtml/StringHtml';
import Rules from './Rules';
import provinceVN from '../../../constant/VietnamDivision/VietnamProvince';
import PolicyTour from './PolicyTour';

interface AboutProps {
    name: string;
    type: number;
    descriptionData?: any;
    facilities?: {
        airportTransport: boolean;
        fitnessCenter: boolean;
        heater: boolean;
        internet: boolean;
        restaurant: boolean;
        spa: boolean;
        waterAndDryer: boolean;
        airConditioner: boolean;
        hotWater: boolean;
        shampoo: boolean;
        tv: boolean;
    };
}

const About = (props: AboutProps) => {
    const { descriptionData } = props;
    console.log(descriptionData);
    return (
        <div className="about__hotel">
            <h3 style={{ textTransform: 'capitalize' }}>{props.name}</h3>
            <div className="about__describe">
                {props.type === 1 &&
                    descriptionData.tourPrograms.map((tourDate: any) => {
                        return (
                            <div key={tourDate.id}>
                                <h4>Day: {tourDate.date}</h4>
                                <div className="ml-10">
                                    <div className="d-flex align-center mt-6 mb-6">
                                        <h6>Place(s):&nbsp;</h6>
                                        {tourDate.destinations.map(
                                            (place: any, index: number) => {
                                                return (
                                                    <p
                                                        key={
                                                            place.cityDestination
                                                        }
                                                    >
                                                        {index !== 0 && (
                                                            <span>,</span>
                                                        )}
                                                        {
                                                            provinceVN.find(
                                                                (item) =>
                                                                    item.code ===
                                                                    place.cityDestination
                                                            )?.name
                                                        }
                                                    </p>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div className="tour__content d-flex align-center mb-6">
                                        <h6>Description:&nbsp;</h6>
                                        <StringHtml
                                            htmlString={tourDate.programContent}
                                        />
                                    </div>
                                </div>

                                <p></p>
                            </div>
                        );
                    })}
                {props.type === 2 && (
                    <Facilities facilities={props.facilities} />
                )}
                {props.type === 3 && <Rules />}
                {props.type === 4 && <RoomAvailable />}
                {props.type === 5 && <Reviews />}
                {props.type === 6 && <DatePickerComponent />}
                {props.type === 7 && (
                    <PolicyTour
                        policyData={
                            (descriptionData.introduceInformation,
                            descriptionData.containInformation,
                            descriptionData.notContainPolicy,
                            descriptionData.cancellationPolicy,
                            descriptionData.paymentPolicy,
                            descriptionData.childrenPolicy)
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default About;
