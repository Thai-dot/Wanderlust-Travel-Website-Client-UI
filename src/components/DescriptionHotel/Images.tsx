interface ImagesProps {
    image: string | undefined;
}

const Images = (props: ImagesProps) => {
    return (
        <div className="image d-flex flex-center" style={{ width: '100%' }}>
            <img src={props.image} alt="place" />
        </div>
    );
};

export default Images;
