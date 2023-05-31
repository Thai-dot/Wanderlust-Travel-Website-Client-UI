import { CircularProgress, Slider } from '@mui/material';
import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Places from '../Home/Introduce/Places';
import TextField from '@mui/material/TextField/TextField';

import { createTheme, ThemeProvider } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axiosClientInstance from '../../service/axios/axiosClient/axiosClient';
import Error from '../Error/Error';
import moment from 'moment';

function valuetext(value: number) {
    return `${value}°C`;
}

const minDistance = 0;

const Filter = () => {
    const [filterTours, setFilterTours] = useState<any>([]);

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '&.Mui-error .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                            {
                                borderColor: 'gray'
                            }
                    }
                }
            }
        }
    });

    const [page, setPage] = React.useState(1);

    const [filter, setFilter] = useState<any>({
        minPrice: 0,
        maxPrice: 500000000,
        startDate: moment().format('L'),
        endDate: ''
    });

    const fetchTour = () => {
        return axiosClientInstance
            .get('/api/customers/tourDates', {
                params: {
                    Page: page,
                    PageSize: 9,
                    Filters: `date>${moment().format('L')},date<=${
                        filter.endDate === ''
                            ? ''
                            : moment(filter.endDate.$d).format('L')
                    }`
                }
            })
            .then((res) => res.data);
    };

    console.log(filter);

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
        if (data) {
            setFilterTours(data);
        }
    }, [data]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {};

    const handleFilter = () => {
        refetch();
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Error error={error} />;
    return (
        <div className="filter">
            <div className="filter__board">
                <div className="filter__item">
                    <h4 className="filter__name">Tìm kiếm theo giá</h4>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={[filter.minPrice, filter.maxPrice]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={500000000}
                    />
                    <div className="items">
                        <div className="item">
                            <p>Giá thấp nhất</p>
                            <span>{filter.minPrice}vnd</span>
                        </div>
                        <div className="item">
                            <p>Giá cao nhất</p>
                            <span>{filter.maxPrice}vnd</span>
                        </div>
                    </div>
                </div>
                <div className="filter__item">
                    <h4 className="filter__name">Tìm kiếm theo ngày</h4>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày bắt đầu"
                            value={filter.startDate}
                            minDate={moment().format('L')}
                            onChange={(newValue: any) =>
                                setFilter({ ...filter, startDate: newValue })
                            }
                            renderInput={(params) => (
                                <TextField {...params} fullWidth />
                            )}
                        />
                    </LocalizationProvider>

                    <div className="mt-20">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Ngày Kết thúc"
                                value={filter.endDate}
                                
                                onChange={(newValue: any) =>
                                    setFilter({
                                        ...filter,
                                        endDate: newValue
                                    })
                                }
                                renderInput={(params) => (
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            {...params}
                                            sx={{ borderColor: 'gray' }}
                                            fullWidth
                                        />
                                    </ThemeProvider>
                                )}
                            />
                        </LocalizationProvider>
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
                            <span>{data?.totalRecords}</span> được tìm thấy
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
