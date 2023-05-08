import { useAppSelector } from "../../../app/hooks";
import Places from "./Places";
import SwiperComponent from "./Swiper";

interface IntroduceProps {
  name: string;
}

const Index = (props: IntroduceProps) => {
  const hotel = useAppSelector((state) => state.hotel);
  return (
      <section className="top-destinations">
          <h1 className="">{props.name}</h1>
          {props.name === 'Top destinations' ? (
              <SwiperComponent />
          ) : (
              <Places  tours={hotel.hotels} loading={false} />
          )}
      </section>
  );
};

export default Index;
