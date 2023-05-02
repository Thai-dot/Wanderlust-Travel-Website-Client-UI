import React from "react";
import Discount1 from "../../assets/images/discount-1.png";
import Discount2 from "../../assets/images/discount-2.png";

const Discount = () => {
  return (
    <section className="discount">
      <div className="discount__image">
        <img src={Discount1} alt="discount" />
      </div>
      <div className="discount__image">
        <img src={Discount2} alt="discount" />
      </div>
    </section>
  );
};

export default Discount;
