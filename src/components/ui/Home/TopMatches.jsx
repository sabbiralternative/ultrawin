import { Fragment } from "react";
import { useGetIndex } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import cricket from "../../../assets/images/cricket.1d9c2d59.webp";
import football from "../../../assets/images/football.2fdc311b.webp";
import assets from "../../../assets";
import moment from "moment";

const TopMatches = () => {
  const navigate = useNavigate();
  const { data } = useGetIndex({
    type: "ultrawin_featured",
  });

  const navigateGameList = (item) => {
    navigate(`/${item?.sportId}/${item?.eventId}`);
  };

  const formatTime = (date) => {
    const isToday = moment(date).isSame(moment(), "day");
    const format = moment(date).format("DD MMM hh.mm A");
    return isToday ? "Today" : format;
  };

  return (
    <Fragment>
      {data?.result?.length > 0 && (
        <div className="top-matches-ctn">
          <div className="border-shadow-container">
            <span className="text">Top Matches</span>
          </div>
          <div className="infinite-scroll-carousel top-matches-slider">
            {data?.result?.map((item) => {
              return (
                <div
                  onClick={() => navigateGameList(item)}
                  key={item?.eventId}
                  className="top-match-card"
                >
                  <div className="match-info">
                    <div className="category-and-live">
                      <div className="category-name-container">
                        <div className="sport-icon-container">
                          {item?.sportId === "4" && (
                            <img
                              style={{ height: "25px" }}
                              src={cricket}
                              alt="Cricket"
                              className="sport-icon"
                              height={25}
                              loading="lazy"
                            />
                          )}
                          {item?.sportId === "1" && (
                            <img
                              style={{ height: "25px" }}
                              src={football}
                              alt="Cricket"
                              className="sport-icon"
                              height={25}
                              loading="lazy"
                            />
                          )}

                          <div className="sport-name-top-matches">
                            {item?.sportName}
                          </div>
                        </div>
                        <div className="market-types">
                          {item?.markets?.enableMatchOdds && (
                            <div className="market-enabled">
                              <div className="market-enabled-inner">MO</div>
                            </div>
                          )}
                          {item?.markets?.enableBookmaker && (
                            <div className="market-enabled">
                              <div className="market-enabled-inner">BM</div>
                            </div>
                          )}
                          {item?.markets?.enableFancy && (
                            <div className="market-enabled">
                              <div className="market-enabled-inner">F</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="competition-name-top-matches">
                      {item?.competitionName}
                    </div>
                    <div className="event-details">
                      <div className="event-name-container">
                        <div className="team-names">{item?.eventName}</div>
                        {item?.forcedInplay && (
                          <img
                            src={assets.live}
                            alt="Live Event"
                            className="live-img-top-matches"
                          />
                        )}
                      </div>
                      <div className="event-time-top-matches">
                        <div className="date-display-top-matches">
                          <div>{formatTime(item?.openDate)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="odds-section">
                    {item?.markets?.matchOdds?.[0]?.runners?.map(
                      (runner, index) => {
                        return (
                          <div key={index} className="team-odds">
                            <div className="exch-odd-view">
                              <div className="back-odd exch-odd-button">
                                <div className="exch-odd-button-content">
                                  <div className="price">
                                    {runner?.backPrices?.[0]?.price}
                                  </div>
                                  <div className="size">
                                    {" "}
                                    {runner?.backPrices?.[0]?.size}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="exch-odd-view">
                              <div className="lay-odd exch-odd-button">
                                <div className="exch-odd-button-content">
                                  <div className="price">
                                    {" "}
                                    {runner?.layPrices?.[0]?.price}
                                  </div>
                                  <div className="size">
                                    {" "}
                                    {runner?.layPrices?.[0]?.size}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}
                    {/* <div className="team-odds">
                      <div className="exch-odd-view">
                        <div className="back-odd exch-odd-button">
                          <div className="exch-odd-button-content">
                            <div className="price">2.86</div>
                            <div className="size">4K</div>
                          </div>
                        </div>
                      </div>
                      <div className="exch-odd-view">
                        <div className="lay-odd exch-odd-button">
                          <div className="exch-odd-button-content">
                            <div className="price">2.98</div>
                            <div className="size">109K</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="team-odds">
                      <div className="exch-odd-view">
                        <div className="back-odd disabled exch-odd-button">
                          <svg
                            className="MuiSvgIcon-root lock-icon"
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="exch-odd-view">
                        <div className="lay-odd disabled exch-odd-button">
                          <svg
                            className="MuiSvgIcon-root lock-icon"
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="team-odds">
                      <div className="exch-odd-view">
                        <div className="back-odd exch-odd-button">
                          <div className="exch-odd-button-content">
                            <div className="price">1.51</div>
                            <div className="size">188K</div>
                          </div>
                        </div>
                      </div>
                      <div className="exch-odd-view">
                        <div className="lay-odd exch-odd-button">
                          <div className="exch-odd-button-content">
                            <div className="price">1.54</div>
                            <div className="size">7K</div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TopMatches;
