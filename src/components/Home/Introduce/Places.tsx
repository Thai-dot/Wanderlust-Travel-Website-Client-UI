import Skeleton from 'react-loading-skeleton';
import React from 'react';
import Place from '../../Common/Place';

interface PlaceProp {
    tours: any;
    loading: boolean;
}

const Places: React.FC<PlaceProp> = (props) => {
    const { tours, loading } = props;

    return (
        <div className="places">
            {loading && !tours.data ? (
                <div className="place">
                    <div className="place__image">
                        <Skeleton height="100%" />
                    </div>
                    <div className="place__description">
                        {/* <div className="rating"> */}
                        <Skeleton style={{ marginBottom: '5px' }} />
                        {/* </div> */}
                        <Skeleton
                            height="28px"
                            style={{ marginBottom: '5px' }}
                        />
                        <Skeleton />
                    </div>
                    <div className="place__prices">
                        <Skeleton />
                    </div>
                </div>
            ) : (
                tours?.data?.map((tour: any) => (
                    <Place
                        tour={tour.tour}
                        tourDateCode={tour.tourDateCode}
                        date={tour.date}
                        id={tour.id}
                        sellingPrice={
                            tour.tourDateCostStatementTable.sellingPrice
                        }
                    />
                ))
            )}
        </div>
    );
};

export default Places;
