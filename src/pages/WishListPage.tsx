import React from "react";
import Breadcrumb from "../components/Common/Breadcrumb";
import WishList from "../components/WishList";

const WishListPage = () => {
  return (
    <div className="main-page">
      <Breadcrumb />
      <WishList />
    </div>
  );
};

export default WishListPage;
