import { Fragment, useEffect } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import BookingHotel from "./Booking/BookingHotel";
import About from "./DescriptionItems/About";
import SwiperHotel from "../Swiper/SwiperHotel";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { hotelAction } from "../../features/hotel/hotelSlice";
import { favouriteAction } from "../../features/favourite/favouriteSlice";
import Images from "./Images";
import Skeleton from "react-loading-skeleton";
import { roomAction } from "../../features/room/roomSlice";

const reviewDescription = ["Terrible", "Bad", "Average", "Good", "Excellent"];

const Description = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hotelAction.getOne({ hotelId: params.id as string }));
    dispatch(roomAction.getAllByHotelId(params.id as string));
  }, [dispatch, params.id]);

  const hotel = useAppSelector((state) => state.hotel);

  const addToFavourite = (_id: string) => {
    dispatch(favouriteAction.create(_id));
  };

  if (hotel.loadingHotel || hotel.hotel === null || hotel.loading) {
    return <Skeleton width={"100%"} height={"300px"} />;
  }

  return (
    <Fragment>
      <Images images={hotel.hotel?.images} />
      {hotel.loadingHotel ? (
        <div className="hotel">
          <div className="hotel__describe">
            <div className="hotel__description">
              <div className="hotel-rating">
                <div className="rating-star">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <h3>Best Hotel</h3>
                <div className="person-review">
                  <span className="star">{hotel.hotel?.rating} / 5</span>

                  <span className="rating-name">
                    {reviewDescription[hotel.hotel.rating - 1]}
                  </span>
                  <span className="rating-quantity">
                    (3 reviews) &#x2022;{" "}
                    <span className="location">
                      {hotel.hotel.destination.locationName}
                    </span>
                  </span>
                </div>
              </div>
              <div className="hotel__action">
                <div className="hotel__icon">
                  <BsShare />
                </div>
                <div className="hotel__icon">
                  <AiOutlineHeart style={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
            <About name="About this hotel" type={1} />
            <About name="Hotel Facilities" type={2} />
            <About name="Rules" type={3} />
            <About name="Availability" type={4} />
            <About name="Reviews" type={5} />
          </div>
          <div className="hotel__status">
            <BookingHotel />
          </div>
        </div>
      ) : (
        <div className="hotel">
          <div className="hotel__describe">
            <div className="hotel__description">
              <div className="hotel-rating">
                <div className="rating-star">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <h3>{hotel.hotel?.nameHotel}</h3>
                <div className="person-review">
                  <span className="star">{hotel.hotel?.rating} / 5</span>

                  <span className="rating-name">
                    {reviewDescription[hotel.hotel?.rating - 1]}
                  </span>
                  <span className="rating-quantity">
                    (3 reviews) &#x2022;{" "}
                    <span className="location">Los Angeles</span>
                  </span>
                </div>
              </div>
              <div className="hotel__action">
                <div className="hotel__icon">
                  <BsShare />
                </div>
                <div
                  className="hotel__icon"
                  onClick={() => addToFavourite(params.id as string)}
                >
                  <AiOutlineHeart style={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
            <About
              name="About this hotel"
              type={1}
              description={hotel.hotel?.description}
            />
            <About
              name="Hotel Facilities"
              type={2}
              facilities={hotel.hotel?.facilities}
            />
            <About name="Rules" type={3} />
            <About name="Availability" type={4} />
            <About name="Reviews" type={5} />
          </div>
          <div className="hotel__status">
            <BookingHotel />
          </div>
        </div>
      )}
      <div className="recommend">
        <h1>Explore other options</h1>
        <SwiperHotel />
      </div>
    </Fragment>
  );
};

export default Description;
