import React, { Fragment } from 'react';
import About from '../DescriptionHotel/DescriptionItems/About';
import QuotationInfo from './QuotationInfo';
import EditQuotation from './EditQuotation';

interface DescriptionQuotationType {
    tourData: any;
    departureDate: string;
    noOfPax: number;
    noOfChild: number;
    pricePerPerson: number;
}

function DescriptionQuotation(props: DescriptionQuotationType) {
    const { tourData, departureDate, noOfPax, noOfChild, pricePerPerson} = props;

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
                    <EditQuotation />
                </div>
                <div>
                    <QuotationInfo
                        quotationName={tourData.tourName}
                        departureDate={departureDate}
                        noOfPax={noOfPax}
                        noOfChild={noOfChild}
                        pricePerPerson={pricePerPerson}
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default DescriptionQuotation;
