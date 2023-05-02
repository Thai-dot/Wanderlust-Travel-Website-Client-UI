import { Review } from "./review";

export interface Hotel {
  _id?: string;
  destination: {
    locationName: string;
  };
  nameHotel: string;
  images: string[];
  description: string;
  price: number;
  rating: number;
  reviews: Review[];
  facilities: {
    airportTransport: boolean;
    fitnessCenter: boolean;
    heater: boolean;
    internet: boolean;
    restaurant: boolean;
    spa: boolean;
    waterAndDryer: boolean;
    airConditioner: boolean;
    hotWater: boolean;
    shampoo: boolean;
    tv: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
