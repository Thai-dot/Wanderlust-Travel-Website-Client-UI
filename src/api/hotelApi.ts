import { ListQuery, ListResponse } from "../models";
import { Hotel } from "../models/hotel";
import axiosClient from "./axiosClient";

const hotelApi = {
  getAll(query: ListQuery): Promise<ListResponse<Hotel>> {
    const sort = !query.sort ? "" : `sort=${query.sort}`;
    const limit = !query.limit ? "" : `limit=${query.limit}`;
    const skip = !query.skip ? "" : `skip=${query.skip}`;
    const url = `/hotel?${sort}&${limit}&${skip}`;
    return axiosClient.get(url);
  },
  getAllByDesId(desId: string): Promise<Hotel[]> {
    const url = `/hotel/destination/${desId}`;
    return axiosClient.get(url);
  },
  get(hotelId: string): Promise<Hotel> {
    const url = `/hotel/${hotelId}`;
    return axiosClient.get(url);
  },
  add(hotel: Hotel, desId: string): Promise<Hotel> {
    const url = `/hotel/${desId}`;
    return axiosClient.post(url, hotel);
  },
  update(hotel: Hotel, desId: string, hotelId: string): Promise<Hotel> {
    const url = `/hotel/${desId}/${hotelId}`;
    return axiosClient.put(url, hotel);
  },
  delete(desId: string, hotelId: string): Promise<string> {
    const url = `/hotel/${desId}/${hotelId}`;
    return axiosClient.delete(url);
  },
};

export default hotelApi;
