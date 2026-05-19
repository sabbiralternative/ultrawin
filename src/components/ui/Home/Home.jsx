// import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import assets from "../../../assets";
import useBannerImage from "../../../hooks/useBannerImage";
// import useGetSocialLink from "../../../hooks/useGetSocialLink";
// import CryptoReferTab from "./CryptoReferTab";
// import LiveCasinoGames from "./LiveCasinoGames";
import CasinoThumbnailSlider from "./CasinoThumbnailSlider";
// import Promotion from "./Promotion";
// import RecommendedGames from "./RecommendedGames";
import Sponsors from "./Sponsors";
// import TopRatedGames from "./TopRatedGames";
// import TrendingGames from "./TrendingGames";
import { useSelector } from "react-redux";
import BottomTab from "./BottomTab";
import TopMatches from "./TopMatches";
import { useGetIndex } from "../../../hooks";
import CricketBattle from "./CricketBattle";
import Banner from "./Banner";

const Home = () => {
  const { data } = useGetIndex({
    type: "ultrawin_homepage_casino",
  });
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // const { socialLink } = useGetSocialLink();
  const { bannerImage } = useBannerImage();

  const new_launch = data?.filter((item) => item?.tag === "new_launch");
  const slot = data?.filter((item) => item?.tag === "slot");
  const recommended_games = data?.filter(
    (item) => item?.tag === "recommended_games",
  );
  const live_casino_games = data?.filter(
    (item) => item?.tag === "live_casino_games",
  );

  return (
    <div className="md hydrated">
      <div slot="fixed" className="md refresher-md hydrated refresher-native">
        <div className="md hydrated">
          <div className="refresher-pulling">
            <div className="refresher-pulling-icon">
              <div className="spinner-arrow-container">
                <div
                  className="md spinner-circular spinner-paused hydrated"
                  role="progressbar"
                  style={{ animationDuration: "1400ms" }}
                />
                <div className="arrow-container">
                  <img
                    role="img"
                    className="md hydrated"
                    aria-label="caret back sharp"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="refresher-refreshing">
            <div className="refresher-refreshing-icon">
              <div
                className="md spinner-circular hydrated"
                role="progressbar"
                style={{
                  animationDuration: "1400ms",
                  animationDelay: "-655ms",
                }}
              />
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="router-ctn">
        <div className="home-page-ctn">
          <div className="home-container">
            {/* <Promotion />
            {socialLink?.referral && <CryptoReferTab />} */}

            <div className="banner-container" style={{ display: "initial" }}>
              <div
                className="banner-cards"
                style={{ display: "initial", width: "100%" }}
              >
                {token && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",

                      marginTop: "10px",
                    }}
                  >
                    <button
                      style={{ borderRadius: "4px", width: "100%" }}
                      onClick={() => navigate("/deposit")}
                      className="MuiButtonBase-root MuiButton-root MuiButton-text deposit-btn"
                      type="button"
                    >
                      <span className="MuiButton-label">
                        <img src={assets.depositIcon} alt="deposit" />
                        Deposit{" "}
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                    <button
                      style={{ borderRadius: "4px", width: "100%" }}
                      onClick={() => navigate("/withdraw")}
                      className="MuiButtonBase-root MuiButton-root MuiButton-text withdraw-btn"
                      type="button"
                    >
                      <span className="MuiButton-label">
                        <img src={assets.withdrawIcon} alt="withdraw" />
                        Withdraw
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                )}
                {bannerImage?.banner?.length > 0 && (
                  <Banner banner={bannerImage?.banner} />
                )}
              </div>
            </div>
            <TopMatches />
            <CricketBattle />
            {new_launch?.length > 0 && (
              <CasinoThumbnailSlider data={new_launch} title="New Launch" />
            )}
            {recommended_games?.length > 0 && (
              <CasinoThumbnailSlider
                data={recommended_games}
                title="Recommended Games"
              />
            )}
            {live_casino_games?.length > 0 && (
              <CasinoThumbnailSlider
                data={live_casino_games}
                title="Live Casino Games"
              />
            )}
            {slot?.length > 0 && (
              <CasinoThumbnailSlider data={slot} title="Slots" />
            )}

            {/* <TrendingGames /> */}
            {/* <RecommendedGames />
            <TopRatedGames />
            <LiveCasinoGames /> */}

            <div className="banner-container pb-0" />
          </div>
          <Sponsors />
          <BottomTab />
        </div>
      </div>
    </div>
  );
};

export default Home;
