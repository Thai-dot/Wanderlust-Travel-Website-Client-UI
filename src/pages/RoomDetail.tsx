import React, { useEffect } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Breadcrumb from "../components/Common/Breadcrumb";
import Images from "../components/DescriptionHotel/Images";
import DescriptionRoom from "../components/DescriptionHotel/RoomDetail";
import { roomAction } from "../features/room/roomSlice";

const RoomDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(roomAction.getRoomById(params.id as string));
    dispatch(roomAction.getAllByHotelId(params.hotelId as string));
  }, [dispatch, params]);

  const room = useAppSelector((state) => state.room);

  if (room.loadingRoom || room.room === null) {
    return <Skeleton width={"100%"} height={"300px"} />;
  }
  return (
    <main className="main-page">
      <Breadcrumb />
      <div className="description-room">
        <h3>{room.room.name}</h3>
        <span className="place">
          <AiOutlineEnvironment /> Los Angeles
        </span>
      </div>
      <Images images={room.room.images} />
      <DescriptionRoom room={room.room} />
    </main>
  );
};

export default RoomDetail;
