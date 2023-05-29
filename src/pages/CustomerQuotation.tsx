import React, { useState } from 'react';
import axiosClientInstance from '../service/axios/axiosClient/axiosClient';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Error from '../components/Error/Error';
import Images from '../components/DescriptionHotel/Images';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import exampleImage from '../assets/images/California.jpg';
import { useQuery } from 'react-query';
import DescriptionQuotation from '../components/Quotation/DescriptionQuotation';
import { decodeToken, isTokenExpired } from '../utils/jwtFunction';
import { getCookie } from '../utils/cookies';

function CustomerQuotation() {
    const { id } = useParams();
    const token = getCookie('accessToken');
    const nav = useNavigate();

    if (!token || isTokenExpired(token ?? '')) {
        nav('/login');
    }

    const decodedToken = decodeToken(token ?? '');

    const [tour, setTour] = useState<any>(null);
    const [pricePerPerson, setPricePerPerson] = useState(0);

    const fetchQuotation = () => {
        return axiosClientInstance.get(`/api/quotations/${id}`).then((res) => {
            axiosClientInstance
                .get(`/api/tours/${res.data.tourId}`)
                .then((tourRes: any) => {
                    setTour(tourRes.data);
                });

            axiosClientInstance
                .get(`/api/costStatementTables/tour/${res.data.tourId}`)
                .then((costStatementRes) =>
                    setPricePerPerson(
                        costStatementRes.data.data[0].sellingPrice
                    )
                );

            if (decodedToken.email !== res.data.customer.email) {
                window.location.href = '/';
            }
            return res.data;
        });
    };

    const { isLoading, error, data, refetch } = useQuery(
        'getTourDateDetailClient',
        fetchQuotation
    );

    if (isLoading) {
        return <Skeleton width={'100%'} height={'300px'} />;
    }

    if (error) return <Error error={error} />;

    return (
        <main className="main-page">
            {!tour && <div className="red fs-tiny">Tour not found!</div>}
            {data && tour ? (
                <>
                    <div className="description-room">
                        <h2>
                            [{data?.quotationCode}] {data?.quotationName ?? ''}
                        </h2>
                    </div>
                    <Images image={tour.tourImage || exampleImage} />
                    <DescriptionQuotation
                        tourData={tour}
                        departureDate={data.startDate}
                        noOfPax={data.noOfPax}
                        noOfChild={data.noOfChild}
                        pricePerPerson={pricePerPerson}
                        currentStatus={data.status}
                    />
                </>
            ) : (
                <CircularProgress />
            )}
        </main>
    );
}

export default CustomerQuotation;
