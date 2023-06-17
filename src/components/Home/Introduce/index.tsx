import Places from './Places';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClientInstance from '../../../service/axios/axiosClient/axiosClient';
import { useQuery } from 'react-query';
import Error from '../../Error/Error';
import exampleImg from '../../../assets/images/California.jpg';

interface IntroduceProps {
    name: string;
}

var items = [
    {
        name: 'Hà Nội',
        description: 'Khám phá thành phố nghìn năm văn hiến!',
        img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg'
    },
    {
        name: 'Thành phố Hồ Chí Minh',
        description: 'Năng động, trẻ trung, giàu sức sống',
        img: 'https://bcp.cdnchinhphu.vn/334894974524682240/2023/1/2/tphcm-16726501373541473396704.jpg'
    },
    {
        name: 'Đà Nẵng',
        description: 'Thành phố đáng sống nhất Việt Nam',
        img: 'https://upload.wikimedia.org/wikipedia/commons/0/09/B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg'
    },
    {
        name: 'Đà Lạt',
        description: 'Thành phố mộng mơ, xinh đẹp',
        img: 'https://cdn.tgdd.vn/Files/2021/06/22/1362277/tat-tan-tat-kinh-nghiem-du-lich-da-lat-checkin-o-dau-an-gi-202206031411593741.jpeg'
    },
    {
        name: 'Hải Phòng',
        description: 'Thành phố hoa phượng đỏ',
        img: 'https://nguoilambao.vn/upload_images/images/phat-trien-du-lich-hai-phong-tro-thanh-dong-luc-cua-khu-vuc-va-ca-nuoc1.jpg'
    },
    {
        name: 'Hạ Long',
        description: 'Danh lam thắng cảnh hùng vĩ',
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Ha_Long_2019_taken_by_DJI_FC220.jpg'
    }
];

function Item(props) {
    return (
        <Paper>
            <h3>{props.item.name}</h3>
            <p className="reg-text mt-10 mb-10">{props.item.description}</p>
            <div className="flex-center">
                <img
                    style={{
                        borderRadius: '10px',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                    }}
                    src={props.item.img}
                    height={370}
                    width={800}
                    alt="item img"
                />
            </div>
            <Link to="/filter">
                <Button
                    sx={{ fontWeight: 'bold' }}
                    className="CheckButton mt-20 mb-20"
                >
                    Xem qua các điểm này
                </Button>
            </Link>
        </Paper>
    );
}

const Index = (props: IntroduceProps) => {
    const fetchTour = () => {
        return axiosClientInstance
            .get('/api/customers/tourDates', {
                params: {
                    Page: 1,
                    PageSize: 4
                }
            })
            .then((res) => res.data);
    };

    const { isLoading, error, data, refetch } = useQuery(
        'getTourDateClient',
        fetchTour
    );

    if (isLoading) return <CircularProgress />;

    if (error) return <Error error="Lỗi hiển thị" />;

    return (
        <section className="top-destinations">
            <h1 className="">{props.name}</h1>
            {props.name === 'Top địa điểm' ? (
                <Carousel
                    autoPlay
                    animation="fade"
                    cycleNavigation
                    navButtonsAlwaysVisible
                    fullHeightHover
                    duration={20}
                >
                    {items.map((item, i) => (
                        <Item key={i} item={item} />
                    ))}
                </Carousel>
            ) : (
                <Carousel
                    autoPlay
                    animation="fade"
                    cycleNavigation
                    navButtonsAlwaysVisible
                    fullHeightHover
                    duration={20}
                >
                    {data?.data.map((item, i) => (
                        <Paper key={i}>
                            <h3 className="mb-20">{item.tour.tourName}</h3>

                            <div className="flex-center">
                                <img
                                    style={{
                                        borderRadius: '10px',
                                        boxShadow:
                                            'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                                    }}
                                    src={
                                        item.tour.tourImage.length === 0
                                            ? exampleImg
                                            : item.tour.tourImage
                                    }
                                    height={370}
                                    width={800}
                                    alt="item img"
                                />
                            </div>
                            <Link to={`/tour/${item.id}`}>
                                <Button
                                    sx={{ fontWeight: 'bold' }}
                                    className="CheckButton mt-20 mb-20"
                                >
                                    Xem tour này
                                </Button>
                            </Link>
                        </Paper>
                    ))}
                </Carousel>
            )}
        </section>
    );
};

export default Index;
