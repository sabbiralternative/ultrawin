import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Banner = ({ banner }) => {
  return (
    <Fragment>
      <div style={{ width: "100%" }}>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          slidesPerView="auto"
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {banner?.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <div
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  className="inplay-bg banner-card-div"
                >
                  <div className="banner-image">
                    <img
                      style={{
                        borderRadius: "5px",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      src={image}
                      alt="image"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* {banner?.slice(0, 2).map((img) => {
        return (
          <div
            style={{ borderRadius: "5px" }}
            key={img}
            className="inplay-bg banner-card-div"
          >
            <div className="banner-image">
              <img
                style={{ borderRadius: "5px" }}
                src={img}
                alt="Deposit now"
              />
            </div>
          </div>
        );
      })} */}
    </Fragment>
  );
};

export default Banner;
