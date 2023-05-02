import { Destination, ListQuery, ListResponse } from "../models";
import axiosClient from "./axiosClient";

const destinationApi = {
  getAll: (query: ListQuery): Promise<ListResponse<Destination>> => {
    const sort = !query.sort ? "" : `sort=${query.sort}`;
    const limit = !query.limit ? "" : `limit=${query.limit}`;
    const skip = !query.skip ? "" : `skip=${query.skip}`;
    const url = `/destination?${sort}&${limit}&${skip}`;

    return axiosClient.get(url);
  },

  getById: (id: string): Promise<Destination> => {
    const url = `/destination/${id}`;

    return axiosClient.get(url);
  },

  add: (destination: Destination): Promise<Destination> => {
    const url = "/destination";

    return axiosClient.post(url, destination);
  },

  update: (destinationUpdate: Destination): Promise<Destination> => {
    const url = "/destination";

    return axiosClient.put(url, destinationUpdate);
  },

  remove: (): Promise<String> => {
    const url = "/destination";

    return axiosClient.delete(url);
  },
};

export default destinationApi;
