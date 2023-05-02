import { User } from "./user";

export interface Review {
  _id?: string;
  user: User;
  star: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
