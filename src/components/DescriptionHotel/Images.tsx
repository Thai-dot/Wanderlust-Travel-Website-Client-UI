interface ImagesProps {
  images: string[] | undefined;
}

const Images = (props: ImagesProps) => {
  return (
    <div className="images">
      {props.images?.map((image, i) => {
     
        return (
          <div className={`image ${i === 0 && "main-image"}`}>
            <img src={image} alt="place" key={i} />
          </div>
        );
      })}
    
    </div>
  );
};

export default Images;
