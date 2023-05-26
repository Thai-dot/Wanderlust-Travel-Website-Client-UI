import React from 'react';
import axiosClientInstance from '../service/axios/axiosClient/axiosClient';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Error from '../components/Error/Error';
import Images from '../components/DescriptionHotel/Images';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import exampleImage from '../assets/images/California.jpg';
import { useQuery } from 'react-query';
import DescriptionQuotation from '../components/Quotation/DescriptionQuotation';

function CustomerQuotation() {
    const { id } = useParams();

    const fetchTour = () => {
        return axiosClientInstance
            .get(`/api/quotations/${id}`)
            .then((res) => res.data);
    };

    const { isLoading, error, data, refetch } = useQuery(
        'getTourDateDetailClient',
        fetchTour
    );

    if (isLoading) {
        return <Skeleton width={'100%'} height={'300px'} />;
    }

    if (error) return <Error error={error} />;

    return (
        <main className="main-page">
            {data ? (
                <>
                    <div className="description-room">
                        <h2>
                            [{data?.quotationCode}] {data?.quotationName ?? ''}
                        </h2>
                    </div>
                    <Images image={data?.tour.tourImage || exampleImage} />
                    <DescriptionQuotation
                        tourData={data.tour}
                        departureDate={data.startDate}
                        noOfPax={data.noOfPax}
                        noOfChild={data.noOfChild}
                        pricePerPerson={data.totalPrice}
                    />
                </>
            ) : (
                <CircularProgress />
            )}
        </main>
    );
}

export default CustomerQuotation;