interface ImagesProps {
  images: string[] | undefined;
}

const Images = (props: ImagesProps) => {
  return (
    <div className="images">
      {props.images?.map((image, i) => {
        console.log(i);
        return (
          <div className={`image ${i === 0 && "main-image"}`}>
            <img src={image} alt="place" key={i} />
          </div>
        );
      })}
      {/* <div className="image main-image">
        <img src={Site1_1} alt="place" />
      </div>
      <div className="image">
        <img src={Site1_2} alt="place" />
      </div>
      <div className="image">
        <img src={Site1_3} alt="place" />
      </div>
      <div className="image">
        <img src={Site1_4} alt="place" />
      </div>
      <div className="image">
        <img src={Site1_5} alt="place" />
      </div> */}
    </div>
  );
};

export default Images;
