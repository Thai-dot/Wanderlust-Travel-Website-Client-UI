import Banner from "../components/Home/Banner";
import Discount from "../components/Home/Discount";
import Introduce from "../components/Home/Introduce";
import Subscribe from "../components/Home/Introduce/Subscribe";

const HomePage = () => {
  return (
    <main className="main-page">
      <Banner name="home" />
      <Discount />
      <Introduce name="Top tour" />
      <Introduce name="Tìm tour mà bạn yêu thích" />
      <Introduce name="Recommend cho bạn" />
      <Subscribe />
    </main>
  );
};

export default HomePage;
