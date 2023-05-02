import { Favourite, ListQuery } from "../models";
import axiosClient from "./axiosClient";

const favouriteApi = {
  getAll: (query: ListQuery): Promise<Favourite[]> => {
    const sort = !query.sort ? "" : `sort=${query.sort}`;
    const limit = !query.limit ? "" : `limit=${query.limit}`;
    const skip = !query.skip ? "" : `skip=${query.skip}`;
    const url = `/favourite?${sort}&${limit}&${skip}`;
    return axiosClient.get(url);
  },
  get: (hotelId: string): Promise<Favourite> => {
    const url = `/favourite/${hotelId}`;
    return axiosClient.get(url);
  },
  create: (hotelId: string): Promise<Favourite> => {
    const url = `/favourite/${hotelId}`;
    return axiosClient.post(url);
  },
  delete: (hotelId: string): Promise<Favourite> => {
    const url = `/favourite/${hotelId}`;
    return axiosClient.delete(url);
  },
};

export default favouriteApi;
