import React from "react";
import Breadcrumb from "../components/Common/Breadcrumb";
import User from "../components/User";

const UserPage = () => {
  return (
    <div className="main-page">
      <Breadcrumb />
      <User />
    </div>
  );
};

export default UserPage;
