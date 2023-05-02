import React from "react";

interface UserInfoProp {
  fullName: string;
  address: string;
  email: string;
  phone: string;
}

const UserInfo: React.FC<{ user: UserInfoProp | undefined }> = ({ user }) => {
  return (
    <div className="user__info">
      <h2>Your Information</h2>
      <div className="descriptions">
        <div className="description">
          <span className="key">Full Name</span>
          <p className="value">{user?.fullName}</p>
        </div>
        <div className="description">
          <span className="key">Phone number</span>
          <p className="value">{user?.phone}</p>
        </div>
        <div className="description">
          <span className="key">Address</span>
          <p className="value">{user?.address}</p>
        </div>
        <div className="description">
          <span className="key">Email</span>
          <p className="value">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
