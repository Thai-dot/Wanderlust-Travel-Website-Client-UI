import React from "react";
import { Checkout } from "../components/Checkout";
import Breadcrumb from "../components/Common/Breadcrumb";

const CheckoutPage = () => {
  return (
    <main className="main-page">
      <Breadcrumb />
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
