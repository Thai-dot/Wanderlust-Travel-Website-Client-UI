import { CircularProgress, Slider } from '@mui/material';
import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';
import Places from '../Home/Introduce/Places';

import axiosClientInstance from '../../service/axios/axiosClient/axiosClient';
import Error from '../Error/Error';

function valuetext(value: number) {
    return `${value}°C`;
}

const minDistance = 0;

const Filter = () => {
    const [filterTours, setFilterTours] = useState<any>([]);
    const [filter, setFilter] = useState({
        minPrice: 0,
        maxPrice: 300,
        reviewScore: [],
        star: [],
        facilities: [],
        hotelThemes: []
    });
    const [page, setPage] = React.useState(1);
    const fetchTour = () => {
        return axiosClientInstance
            .get('/api/customers/tourDates', {
                params: {
                    Page: page,
                    PageSize: 9
                }
            })
            .then((res) => res.data);
    };

    const { isLoading, error, data, refetch } = useQuery(
        'getTourDateClient',
        fetchTour,
        {
            enabled: false
        }
    );

    const handleChangePagination = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    React.useEffect(() => {
        refetch();
    }, [page]);

    useEffect(() => {
        handleFilter();
    }, []);

    useEffect(() => {
        if (data) {
            setFilterTours(data);
        }
    }, [data]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setFilter({
                ...filter,
                minPrice: Math.min(newValue[0], filter.maxPrice - minDistance)
            });
        } else {
            setFilter({
                ...filter,
                maxPrice: Math.max(newValue[1], filter.minPrice + minDistance)
            });
        }
    };

    const handleFilter = () => {};

    const handleCheckbox = (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
        if (e.currentTarget.name === 'reviewScore') {
            if (e.currentTarget.checked) {
                console.log(e.currentTarget.value);
                setFilter({
                    ...filter,
                    reviewScore: [
                        ...filter.reviewScore,
                        e.currentTarget.value as never
                    ]
                });
            } else {
                setFilter({
                    ...filter,
                    reviewScore: filter.reviewScore.filter(
                        (item) => item !== e.currentTarget.value
                    )
                });
            }
        }
    };


    if (isLoading) return <CircularProgress />;
    if (error) return <Error error={error} />;
    return (
        <div className="filter">
            <div className="filter__board">
                <div className="filter__item">
                    <h4 className="filter__name">Filter Price</h4>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={[filter.minPrice, filter.maxPrice]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={300}
                    />
                    <div className="items">
                        <div className="item">
                            <p>Min price</p>
                            <span>{filter.minPrice}$</span>
                        </div>
                        <div className="item">
                            <p>Max price</p>
                            <span>{filter.maxPrice}$</span>
                        </div>
                    </div>
                </div>
                <div className="filter__item">
                    <h4 className="filter__name">Review Score</h4>
                    <div className="filter__item__checkbox">
                        <div className="input">
                            <input
                                type="checkbox"
                                name="reviewScore"
                                onClick={handleCheckbox}
                                value={'5'}
                            />{' '}
                            Excellent
                        </div>
                        <div className="input">
                            <input
                                type="checkbox"
                                name="reviewScore"
                                onClick={handleCheckbox}
                                value={'4'}
                            />{' '}
                            Good
                        </div>
                        <div className="input">
                            <input
                                type="checkbox"
                                name="reviewScore"
                                onClick={handleCheckbox}
                                value={'3'}
                            />{' '}
                            Medium
                        </div>
                        <div className="input">
                            <input
                                type="checkbox"
                                name="reviewScore"
                                onClick={handleCheckbox}
                                value={'2'}
                            />{' '}
                            Bad
                        </div>
                        <div className="input">
                            <input
                                type="checkbox"
                                name="reviewScore"
                                onClick={handleCheckbox}
                                value={'1'}
                            />{' '}
                            Terrible
                        </div>
                    </div>
                </div>
                <div className="filter__item">
                    <h4 className="filter__name">Hotel Star</h4>
                    <div className="filter__item__checkbox">
                        <div className="input">
                            <input type="checkbox" />
                            <div className="star">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div>
                        <div className="input">
                            <input type="checkbox" />
                            <div className="star">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div>
                        <div className="input">
                            <input type="checkbox" />
                            <div className="star">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div>
                        <div className="input">
                            <input type="checkbox" />
                            <div className="star">
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div>
                        <div className="input">
                            <input type="checkbox" />
                            <div className="star">
                                <AiFillStar />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter__item">
                    <h4 className="filter__name">Facilities</h4>
                    <div className="filter__item__checkbox">
                        <div className="input">
                            <input type="checkbox" /> Air Conditioning
                        </div>
                        <div className="input">
                            <input type="checkbox" /> Airport Transport
                        </div>
                        <div className="input">
                            <input type="checkbox" /> Fitness Center
                        </div>
                        <div className="input">
                            <input type="checkbox" /> Flat TV
                        </div>
                        <div className="input">
                            <input type="checkbox" /> Internet - Wifi
                        </div>
                    </div>
                </div>
                <div className="filter__item">
                    <h4 className="filter__name">Hotel Themes</h4>
                    <div className="filter__item__checkbox">
                        <div className="input">
                            <input type="checkbox" /> Air Conditioning
                        </div>
                        <div className="input">
                            <input type="checkbox" /> Airport Transport
                        </div>
                        <div className="input">
                            <input type="checkbox" /> Fitness Center
                        </div>
                        <div className="input">
                            <input type="checkbox" /> Flat TV
                        </div>
                        <div className="input">
                            <input type="checkbox" /> Internet - Wifi
                        </div>
                    </div>
                </div>
                <button className="button__submit" onClick={handleFilter}>
                    Filter
                </button>
            </div>
            <div className="filter__items">
                {data && (
                    <>
                        <div className="number">
                            <span>{data?.totalRecords}</span> tour(s) found
                        </div>
                        <Places tours={filterTours} loading={isLoading} />
                        <div
                            style={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '2rem'
                            }}
                        >
                            <Pagination
                                count={data.totalPages}
                                page={page}
                                onChange={handleChangePagination}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Filter;
