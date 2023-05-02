export interface Destination {
  _id?: string;
  user?: string;
  locationName: string;
  hotelQuantity: number;
  images: string[];
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}
