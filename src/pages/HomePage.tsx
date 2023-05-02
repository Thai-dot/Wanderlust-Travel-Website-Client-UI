import Banner from "../components/Home/Banner";
import Discount from "../components/Home/Discount";
import Introduce from "../components/Home/Introduce";
import Subscribe from "../components/Home/Introduce/Subscribe";

const HomePage = () => {
  return (
    <main className="main-page">
      <Banner name="home" />
      <Discount />
      <Introduce name="Top destinations" />
      <Introduce name="Plan your next staycation" />
      <Introduce name="Recommend for you" />
      <Subscribe />
    </main>
  );
};

export default HomePage;
