// import assets from "../../../assets";
import useBannerImage from "../../../hooks/useBannerImage";
import useGetSocialLink from "../../../hooks/useGetSocialLink";
import CryptoReferTab from "./CryptoReferTab";
import LiveCasinoGames from "./LiveCasinoGames";
import PopularGames from "./PopularGames";
import Promotion from "./Promotion";
import RecommendedGames from "./RecommendedGames";
import Sponsors from "./Sponsors";
import TopRatedGames from "./TopRatedGames";
import TrendingGames from "./TrendingGames";

const Home = () => {
  const { socialLink } = useGetSocialLink();
  const { bannerImage } = useBannerImage();
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
            <Promotion />
            {socialLink?.referral && <CryptoReferTab />}
            {bannerImage?.banner?.length > 0 && (
              <div className="banner-container mt-12">
                <div className="banner-cards">
                  {bannerImage?.banner?.slice(0, 2).map((img) => {
                    return (
                      <>
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
                      </>
                    );
                  })}
                </div>
              </div>
              // <div className="banner-container mt-12">
              //   <div className="banner-cards">

              //     {/* <div className="inplay-bg banner-card-div">
              //       <div className="banner-image">
              //         <img src={assets.affiliate} alt="Affiliate" />
              //       </div>
              //     </div> */}
              //   </div>
              // </div>
            )}

            <PopularGames />
            <TrendingGames />
            <RecommendedGames />
            <TopRatedGames />
            <LiveCasinoGames />
            <div className="banner-container pb-0" />
          </div>
          <Sponsors />
        </div>
      </div>
    </div>
  );
};

export default Home;
