import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useAppSelector } from '../../app/hooks';
import { Hotel } from '../../models/hotel';
import Places from '../Home/Introduce/Places';

function valuetext(value: number) {
    return `${value}°C`;
}

const minDistance = 0;

const exampleTour = [
    {
        _id: '1',
        destination: {
            locationName: 'string'
        },
        nameHotel: 'string',
        images: [],
        description: 'string',
        price: 122222,
        rating: 4,
        reviews: [
            {
                user: {
                    username: 'string',
                    fullName: 'string',
                    email: 'string',
                    phoneNumber: 'string',
                    role: 0,
                    _id: '12'
                },
                star: 1,
                description: 'string',
                _id: '1'
            }
        ],
        facilities: {
            airportTransport: true,
            fitnessCenter: true,
            heater: true,
            internet: true,
            restaurant: true,
            spa: true,
            waterAndDryer: true,
            airConditioner: true,
            hotWater: true,
            shampoo: true,
            tv: true
        }
    }
];

const Filter = () => {
    const hotel = useAppSelector((state) => state.hotel);
    const [filterHotels, setFilterHotels] = useState<Hotel[]>([]);
    const [filter, setFilter] = useState({
        minPrice: 0,
        maxPrice: 300,
        reviewScore: [],
        star: [],
        facilities: [],
        hotelThemes: []
    });

    useEffect(() => {
        handleFilter();
    }, [hotel]);
    
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

    const handleFilter = () => {
        let newHotels: Hotel[] = [];

        hotel.hotels.map((hotel: Hotel) => {
            if (
                hotel.price >= filter.minPrice &&
                hotel.price <= filter.maxPrice
            ) {
                console.log(filter.reviewScore, hotel.rating);
                if (filter.reviewScore.length > 0) {
                    if (
                        filter.reviewScore.includes(
                            (hotel.rating + '') as never
                        )
                    ) {
                        newHotels.push(hotel);
                    }
                } else {
                    newHotels.push(hotel);
                }
            }
        });

        setFilterHotels(newHotels);
    };

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
                <div className="number">
                    <span>{filterHotels.length}</span> hotels found
                </div>
                <Places hotels={exampleTour} loading={false} />
            </div>
        </div>
    );
};

export default Filter;
