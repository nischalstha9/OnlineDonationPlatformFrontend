import { useState, useEffect } from "react";
import { Carousel } from "react-carousel-minimal";
import AxiosInstance, { host } from "../AxiosInstance";

function CarouselSlider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get("carousel/1/detail/").then((resp) => {
      let imgs = resp.data.carousel_images;
      let img_data = imgs.map((img) => {
        return {
          image: host + img.image,
          caption: img.caption,
        };
      });
      setData(img_data);
      setLoading(false);
    });
  }, []);

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };

  return loading ? (
    ""
  ) : (
    <div>
      <Carousel
        data={data}
        time={5000}
        width="100vw"
        height="60vh"
        captionStyle={captionStyle}
        radius="0px"
        captionPosition="bottom"
        automatic={true}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnails={false}
        thumbnailWidth="100px"
        style={{
          textAlign: "center",
          maxWidth: "100vw",
          maxHeight: "100vh",
          margin: "auto",
        }}
      />
    </div>
  );
}

export default CarouselSlider;
