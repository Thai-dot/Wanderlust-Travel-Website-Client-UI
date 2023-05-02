import Skeleton from "react-loading-skeleton";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { favouriteAction } from "../../../features/favourite/favouriteSlice";
import { Hotel } from "../../../models/hotel";
import Place from "../../Common/Place";

interface PlaceProp {
  hotels: Hotel[];
  loading: boolean;
}

const Places: React.FC<PlaceProp> = (props) => {
  const dispatch = useAppDispatch();
  const handleAddToFavourite = (id: string) => {
    dispatch(favouriteAction.create(id));
  };
  return (
    <div className="places">
      {props.loading ? (
        <div className="place">
          <div className="place__image">
            <Skeleton height="100%" />
          </div>
          <div className="place__description">
            {/* <div className="rating"> */}
            <Skeleton style={{ marginBottom: "5px" }} />
            {/* </div> */}
            <Skeleton height="28px" style={{ marginBottom: "5px" }} />
            <Skeleton />
          </div>
          <div className="place__prices">
            <Skeleton />
          </div>
        </div>
      ) : (
        props.hotels?.map((hotel) => <Place hotel={hotel} />)
      )}
    </div>
  );
};

export default Places;
