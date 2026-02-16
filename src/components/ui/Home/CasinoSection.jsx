import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { settings } from "../../../api";
import toast from "react-hot-toast";
import WarningCondition from "../WarningCondition/WarningCondition";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
const CasinoSection = ({ sectionTitle, data }) => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const { token, bonusToken } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });

  const handleNavigateToIFrame = (game) => {
    if (token) {
      if (bonusToken) {
        return setError("Bonus wallet is available only on sports.");
      }
      if (settings.casino_currency !== "AED") {
        navigate(`/casino/${game?.gameName.replace(/ /g, "")}/${game?.gameId}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: game?.gameName, gameId: game?.gameId });
        setShowWarning(true);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    // Set the swiper instance on initial render
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current = swiperRef.current.swiper;
    }
  }, []);

  // Slide left function
  const slideLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  // Slide right function
  const slideRight = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <div className="game-carousel-ctn">
        <div className="border-shadow-container">
          <span className="text">{sectionTitle}</span>
        </div>
        <div
          className="slick-slider slick-initialized casino-section"
          dir="ltr"
        >
          <div onClick={slideLeft} className="jss45 jss46">
            <button
              className="MuiButtonBase-root MuiIconButton-root jss48"
              type="button"
            >
              <span className="MuiIconButton-label">
                <svg
                  className="MuiSvgIcon-root jss49"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="12px"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  <path d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" />
                </svg>
              </span>
              <span className="MuiTouchRipple-root" />
            </button>
          </div>
          <Swiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView="auto"
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <div className="slick-list">
              <div
                className="slick-track"
                style={{
                  opacity: 1,
                  height: "220px",
                  display: "flex",
                  overflow: "auto",
                }}
              >
                {data?.map((game) => {
                  return (
                    <SwiperSlide
                      onClick={() => handleNavigateToIFrame(game)}
                      key={game?.gameId}
                      style={{
                        width: "160px",
                        height: "220px",
                        cursor: "pointer",
                        background: "none",
                      }}
                    >
                      <div
                        style={{ width: "100%" }}
                        className="slick-slide slick-cloned"
                        aria-hidden="true"
                      >
                        <div
                          style={{
                            display: "inline-block",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <img
                            className="home-casino-img"
                            style={{ height: "100%", width: "100%" }}
                            src={game?.trendingThumbnail}
                            loading="lazy"
                            alt="Diamonds"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </div>
            </div>
          </Swiper>
          <div onClick={slideRight} className="jss45 jss47">
            <button
              className="MuiButtonBase-root MuiIconButton-root jss48"
              type="button"
            >
              <span className="MuiIconButton-label">
                <svg
                  className="MuiSvgIcon-root jss49"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  <path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z" />
                </svg>
              </span>
              <span className="MuiTouchRipple-root" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasinoSection;
