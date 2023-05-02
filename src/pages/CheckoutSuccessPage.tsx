import React from "react";
import CheckoutSuccess from "../components/CheckoutSuccess";
import Breadcrumb from "../components/Common/Breadcrumb";

const CheckoutSuccessPage = () => {
  return (
    <div className="main-page">
      <Breadcrumb />
      <CheckoutSuccess />
    </div>
  );
};

export default CheckoutSuccessPage;
