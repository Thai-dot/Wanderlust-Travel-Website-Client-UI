enum Role {
  USER,
  ADMIN,
}

export interface User {
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
