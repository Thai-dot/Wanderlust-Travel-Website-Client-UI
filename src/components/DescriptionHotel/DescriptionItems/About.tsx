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
    
    return (
        <div className="about__hotel">
            <h3 style={{ textTransform: 'capitalize', marginBottom: '20px' }}>
                {props.name}
            </h3>
            <div className="about__describe">
                {props.type === 1 && (
                    <div>
                        <StringHtml
                            htmlString={descriptionData.introduceInformation}
                            style={{ lineHeight: '1.8' }}
                        />
                    </div>
                )}
                {props.type === 2 &&
                    descriptionData.tourPrograms.map((tourDate: any) => {
                        return (
                            <div key={tourDate.id}>
                                <h4>Ngày: {tourDate.date}</h4>
                                <div className="ml-10">
                                    <div className=" mt-6 mb-6">
                                        <h5>Các địa điểm tham quan:</h5>
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
                                    <div className="tour__content  mb-6">
                                        <h5>Mô tả chi tiết cho</h5>
                                        <StringHtml
                                            htmlString={tourDate.programContent}
                                            style={{ lineHeight: '1.8' }}
                                        />
                                    </div>
                                </div>

                                <p></p>
                            </div>
                        );
                    })}
                {props.type === 3 && <Rules />}
                {props.type === 4 && <RoomAvailable />}
                {props.type === 5 && <Reviews />}
                {props.type === 6 && <DatePickerComponent />}
                {props.type === 7 && (
                    <PolicyTour policyData={descriptionData} />
                )}
            </div>
        </div>
    );
};

export default About;
