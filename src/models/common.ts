export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface ListResponse<T> {
  data: T[];
}

export interface ListQuery {
  limit?: number;
  skip?: number;
  sort?: string;
}
