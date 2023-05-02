interface DetailUser {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface DetailRoom {
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  rooms: number;
  numberOfNight: number;
}

export interface Payment {
  user?: string;
  room?: string;
  detailUser: DetailUser;
  detailRoom: DetailRoom;
  paymentMethod: string;
  totalPrice: number;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
