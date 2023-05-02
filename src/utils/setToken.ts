import axiosClient from "../api/axiosClient";

const setToken = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  if (accessToken) {
    axiosClient.defaults.headers.common[
      "authorization"
    ] = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    axiosClient.defaults.headers.common["x-refresh"] = `Bearer ${refreshToken}`;
  }
};

export default setToken;
