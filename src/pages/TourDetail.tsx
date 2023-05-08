import React, { useEffect } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Breadcrumb from '../components/Common/Breadcrumb';
import Images from '../components/DescriptionHotel/Images';
import DescriptionTour from '../components/DescriptionHotel/TourDetail';
import axiosClientInstance from '../service/axios/axiosClient/axiosClient';
import Error from '../components/Error/Error';
import { CircularProgress } from '@mui/material';

const TourDetail = () => {
    const { id } = useParams();

    const fetchTour = () => {
        return axiosClientInstance
            .get(`/api/customers/tours/${id}`)
            .then((res) => res.data);
    };

    const { isLoading, error, data, refetch } = useQuery(
        'getTourDetailClient',
        fetchTour
    );

    if (isLoading) {
        return <Skeleton width={'100%'} height={'300px'} />;
    }

    if (error) return <Error error={error} />;

    return (
        <main className="main-page">
            <Breadcrumb />
            {data ? (
                <>
                    <div className="description-room">
                        <h3>{data?.tourName ?? ''}</h3>
                        <span className="place">
                            <CodeIcon /> {data.departureAddress}
                        </span>
                    </div>
                    <Images
                        images={[
                            data?.tourImage,
                            data?.tourImage,
                            data?.tourImage,
                            data?.tourImage,
                            data?.tourImage
                        ]}
                    />
                    <DescriptionTour tourData={data} />
                </>
            ) : (
                <CircularProgress />
            )}
        </main>
    );
};

export default TourDetail;
