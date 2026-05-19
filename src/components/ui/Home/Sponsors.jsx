import assets from "../../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Sponsors = () => {
  return (
    <div className="MuiBox-root jss52 providers-ctn">
      <div className="trusted-by-providers">
        Trusted by providers around the world
      </div>

      <div
        className="slick-slider slick-initialized sponsors-container"
        dir="ltr"
        style={{ paddingBottom: "10px" }}
      >
        <Swiper
          slidesPerView="auto"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <div className="slick-list">
            <div
              className="slick-track "
              style={{
                opacity: 1,
                height: "50px",
                display: "flex",
                gap: "100px",
                overflow: "auto",
              }}
            >
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={-7}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.group}
                        alt="ezugi"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={-6}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets?.playteck}
                        alt="playtech"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={-5}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.betsoft}
                        alt="betsoft"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={-4}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.gamzix}
                        alt="gamzix"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={4}
                  className="slick-slide slick-active slick-current"
                  tabIndex={-1}
                  aria-hidden="false"
                  style={{ outline: "none", width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.playteck}
                        alt="playtech"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={5}
                  className="slick-slide slick-active"
                  tabIndex={-1}
                  aria-hidden="false"
                  style={{ outline: "none", width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.betsoft}
                        alt="betsoft"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={6}
                  className="slick-slide slick-active"
                  tabIndex={-1}
                  aria-hidden="false"
                  style={{ outline: "none", width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.gamzix}
                        alt="gamzix"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={7}
                  className="slick-slide slick-active"
                  tabIndex={-1}
                  aria-hidden="false"
                  style={{ outline: "none", width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.evoplay}
                        alt="evoplay entertainment"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={8}
                  className="slick-slide slick-active"
                  tabIndex={-1}
                  aria-hidden="false"
                  style={{ outline: "none", width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.sexybtc}
                        alt="sexybcrt"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={9}
                  className="slick-slide slick-active"
                  tabIndex={-1}
                  aria-hidden="false"
                  style={{ outline: "none", width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.jili}
                        alt="jili gaming"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={10}
                  tabIndex={-1}
                  className="slick-slide slick-active slick-cloned"
                  aria-hidden="false"
                  style={{ width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.spribe}
                        alt="spribe"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={11}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.evolution}
                        alt="evolution games"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <div
                  data-index={12}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "134px" }}
                >
                  <div>
                    <button
                      className="csb-indv-provider"
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        src={assets.royal}
                        alt="royal gaming"
                        className="csb-indv-provider-img"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Sponsors;
