import { useEffect, useState } from "react";
import useGetUltraLobby from "../../hooks/useGetUltraLobby";
import "./LiveCasino.css";
import { useSelector } from "react-redux";
import { settings } from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import WarningCondition from "../../components/ui/WarningCondition/WarningCondition";
import Loader from "../../components/shared/Loader/Loader";

const LiveCasino = () => {
  const navigate = useNavigate();
  const { token, bonusToken } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { data, isLoading } = useGetUltraLobby();
  const [subProvider, setSubProvider] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSubProvider, setSelectedSubProvider] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(data);

  /* Search by games name */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    const searchGames = data.filter((game) =>
      game.gameName.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredData(searchGames);
  };

  /* Create unique sub provider name and category */
  useEffect(() => {
    if (data?.length > 0) {
      const subProviderNames = Array.from(
        new Set(data.map((item) => item.subProviderName)),
      );
      const categories = Array.from(new Set(data.map((item) => item.category)));

      setCategories(categories);
      setSubProvider(subProviderNames);
    }
  }, [data]);

  /* Load all data initially */
  useEffect(() => {
    if (data?.length > 0) {
      if (
        selectedCategory === "all" &&
        selectedSubProvider === "all" &&
        searchQuery === ""
      ) {
        setFilteredData(data);
      }
    }
  }, [data, selectedCategory, selectedSubProvider, searchQuery]);

  /* Filter By Category */
  useEffect(() => {
    if (data?.length > 0) {
      if (selectedCategory !== "all" && searchQuery === "") {
        const filterByCategory = data?.filter(
          (d) => d.category === selectedCategory,
        );
        return setFilteredData(filterByCategory);
      }
    }
  }, [data, selectedCategory, searchQuery]);

  // /* Filter By SubProvider */
  useEffect(() => {
    if (data?.length > 0) {
      if (selectedSubProvider !== "all" && searchQuery === "") {
        const filterByCategory = data?.filter(
          (d) => d.subProviderName === selectedSubProvider,
        );
        return setFilteredData(filterByCategory);
      }
    }
  }, [data, selectedSubProvider, searchQuery]);

  /* Handle Navigate */
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <div className="md hydrated">
        <div className="router-ctn">
          <div className="dc-page-bg">
            <div className="exch-inplay-events-view md hydrated">
              <div
                className="py-0 md hydrated"
                style={{
                  flex: "0 0 calc(calc(12 / var(--ion-grid-columns, 12)) * 100%)",
                  width: "calc(calc(12 / var(--ion-grid-columns, 12)) * 100%)",
                  maxWidth:
                    "calc(calc(12 / var(--ion-grid-columns, 12)) * 100%)",
                }}
              />
              <div
                className="mt-16 special-carousal md hydrated"
                style={{
                  flex: "0 0 calc(calc(12 / var(--ion-grid-columns, 12)) * 100%)",
                  width: "calc(calc(12 / var(--ion-grid-columns, 12)) * 100%)",
                  maxWidth:
                    "calc(calc(12 / var(--ion-grid-columns, 12)) * 100%)",
                }}
              >
                <div className="dc-ctn">
                  <div className="report-header">
                    <div className="report-img-title">
                      <div className="report-img-div-title">
                        <div className="report-img-div">
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            className="report-img"
                          >
                            <rect
                              width={20}
                              height={20}
                              rx={10}
                              fill="transparent"
                            ></rect>
                            <path
                              d="M13.6226 3.92407H6.37695C6.23047 3.92609 6.09055 3.98518 5.98696 4.08877C5.88338 4.19236 5.82429 4.33228 5.82227 4.47876V15.5213C5.82429 15.6677 5.88338 15.8077 5.98696 15.9112C6.09055 16.0148 6.23047 16.0739 6.37695 16.0759H13.6226C13.7696 16.0755 13.9104 16.017 14.0143 15.913C14.1183 15.8091 14.1769 15.6682 14.1773 15.5213V4.47876C14.1752 4.33228 14.1162 4.19236 14.0126 4.08877C13.909 3.98518 13.7691 3.92609 13.6226 3.92407ZM6.93164 5.03345H13.0679V14.9666H6.93164V5.03345Z"
                              fill="currentColor"
                            />
                            <path
                              d="M9.60759 12.4934C9.71174 12.5973 9.85284 12.6556 9.99993 12.6556C10.147 12.6556 10.2881 12.5973 10.3923 12.4934L12.4688 10.4175C12.571 10.3125 12.6281 10.1718 12.6281 10.0253C12.6281 9.87884 12.571 9.73814 12.4688 9.63313L10.3929 7.55688C10.2879 7.45466 10.1471 7.39746 10.0006 7.39746C9.854 7.39746 9.71323 7.45466 9.60821 7.55688L7.53134 9.63313C7.42921 9.73814 7.37207 9.87884 7.37207 10.0253C7.37207 10.1718 7.42921 10.3125 7.53134 10.4175L9.60759 12.4934ZM11.2917 10.0247L10.0001 11.3169L8.70821 10.0253L10.0001 8.73376L11.2917 10.0247Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="report-title">Live casino</div>
                      </div>
                      <div className="tab-btns">
                        <div className="search-games-ctn">
                          <input
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-games-input"
                            placeholder="Search games"
                          />
                          <svg
                            onClick={() => setSearchQuery("")}
                            className="MuiSvgIcon-root"
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0a.9959.9959 0 010-1.41L10.59 12 7.7 9.11a.9959.9959 0 010-1.41c.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="report-filters rh-web-view" />
                    <div className="report-filters rh-mob-view" />
                  </div>

                  {/* Tab */}
                  <div className="casino-filter-section">
                    <div
                      onClick={() => {
                        setSelectedSubProvider("all");
                        setSearchQuery("");
                      }}
                      className={`casino-filter-text-ctn  ${
                        selectedSubProvider === "all"
                          ? "casino-filter-text-ctn-selected"
                          : ""
                      }`}
                    >
                      <div className="casino-filter-text">All</div>
                    </div>
                    {subProvider?.map((provider, idx) => {
                      return (
                        <div
                          onClick={() => {
                            setSelectedSubProvider(provider);
                            setSearchQuery("");
                          }}
                          key={idx}
                          className={`casino-filter-text-ctn  ${
                            selectedSubProvider === provider
                              ? "casino-filter-text-ctn-selected"
                              : ""
                          }`}
                        >
                          <div className="casino-filter-text">{provider}</div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Tab 2 */}
                  <div className="cw-cts">
                    <div className="cw-sub-cts">
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          setSearchQuery("");
                        }}
                        className={`cw-ct ${
                          selectedCategory === "all" ? "cw-ct-sel" : ""
                        }`}
                      >
                        <div className="tab-icon-ctn">
                          <img
                            src={`/images/all.svg`}
                            alt=""
                            className="cw-ct-img"
                          />
                        </div>
                        <span
                          style={{
                            color:
                              selectedCategory === "all" ? "black" : "white",
                          }}
                          className={`tab-btn-text tab-btn-text-selected `}
                        >
                          All
                        </span>
                      </button>
                      {categories?.map((category, i) => {
                        return (
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setSearchQuery("");
                            }}
                            key={i}
                            className={`cw-ct ${
                              selectedCategory === category ? "cw-ct-sel " : ""
                            }`}
                          >
                            <div className="tab-icon-ctn">
                              <img
                                src={`/images/${category
                                  ?.split(" ")
                                  .join("")
                                  .toLowerCase()}.svg`}
                                alt=""
                                className="cw-ct-img"
                              />
                            </div>
                            <span
                              style={{
                                color:
                                  selectedCategory === category
                                    ? "black"
                                    : "white",
                              }}
                              className={`tab-btn-text tab-btn-text-selected `}
                            >
                              {category}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    role="tabpanel"
                    id="simple-tabpanel-1"
                    aria-labelledby="simple-tab-1"
                  >
                    <div className="MuiBox-root jss19">
                      <p className="MuiTypography-root MuiTypography-body1"></p>
                      {/* Cards */}
                      <div className="dc-games-ctn">
                        {filteredData?.map((d) => {
                          return (
                            <div
                              onClick={() => handleNavigateToIFrame(d)}
                              key={d?.gameId}
                              className="MuiPaper-root MuiCard-root dc-ion-card MuiPaper-elevation1 MuiPaper-rounded"
                            >
                              <div
                                className="MuiButtonBase-root MuiCardActionArea-root"
                                tabIndex={0}
                                type="button"
                              >
                                <div className="MuiPaper-root MuiCard-root dc-ion-card MuiPaper-elevation1 MuiPaper-rounded">
                                  <button
                                    className="MuiButtonBase-root MuiCardActionArea-root"
                                    tabIndex={0}
                                    type="button"
                                  >
                                    <img
                                      className="MuiCardMedia-root dc-card-media MuiCardMedia-media MuiCardMedia-img"
                                      src={d.urlThumb}
                                      loading="lazy"
                                      alt="AviatorX2"
                                      title="AviatorX2"
                                    />
                                    {/* <div className="MuiCardContent-root dc-card-ctn">
                                    <p
                                      className="MuiTypography-root game-name MuiTypography-body1 MuiTypography-gutterBottom"
                                      title="AviatorX2"
                                    >
                                      AviatorX2
                                    </p>
                                  </div> */}
                                    <span className="MuiCardActionArea-focusHighlight" />
                                    <span className="MuiTouchRipple-root" />
                                  </button>
                                </div>
                              </div>
                              <p />
                            </div>
                          );
                        })}
                      </div>
                      {/* Cards */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveCasino;
