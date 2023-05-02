import React from "react";
import Filter from "../components/Filter";
import Banner from "../components/Home/Banner";

const FilterPage = () => {
  return (
    <main className="main-page">
      <Banner name="filter" />
      <Filter />
    </main>
  );
};

export default FilterPage;
