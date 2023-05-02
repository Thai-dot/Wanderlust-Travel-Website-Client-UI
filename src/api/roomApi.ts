import { ListQuery } from "../models";
import { Room } from "../models/room";
import axiosClient from "./axiosClient";

const roomApi = {
  getAllByHotelId: ({
    query,
    hotelId,
  }: {
    query: ListQuery;
    hotelId: string;
  }): Promise<Room[]> => {
    const sort = !query.sort ? "" : `sort=${query.sort}`;
    const limit = !query.limit ? "" : `limit=${query.limit}`;
    const skip = !query.skip ? "" : `skip=${query.skip}`;
    const url = `/room/hotel/${hotelId}?${sort}&${limit}&${skip}`;
    return axiosClient.get(url);
  },
  get: (roomId: string): Promise<Room> => {
    const url = `/room/${roomId}`;
    return axiosClient.get(url);
  },
  add: (room: Room, hotelId: string): Promise<Room> => {
    const url = `/room/hotel/${hotelId}`;
    return axiosClient.post(url, room);
  },
  update: (room: Room, roomId: string): Promise<Room> => {
    const url = `/room/${roomId}`;
    return axiosClient.put(url, room);
  },
  delete: (roomId: string): Promise<string> => {
    const url = `/room/${roomId}`;
    return axiosClient.delete(url);
  },
};

export default roomApi;
