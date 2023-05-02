import { Hotel } from "./hotel";

export interface Room {
  _id?: string;
  destination?: string;
  hotel: Hotel;
  user?: string;
  name: string;
  description: string;
  facilities: string[];
  images: string[];
  beds: number;
  maxAdults: number;
  maxChildren: number;
  area: number;
  createdAt?: Date;
  price: number;
  updatedAt?: Date;
}
