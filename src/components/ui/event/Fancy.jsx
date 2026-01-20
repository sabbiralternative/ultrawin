import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import { useNavigate, useParams } from "react-router-dom";
import useExposer from "../../../hooks/useExposure";
import isOddSuspended from "../../../utils/isOddSuspended";
import BetSlip from "./BetSlip";
import Ladder from "../../modal/Ladder";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";

const Fancy = ({ data }) => {
  const navigate = useNavigate();
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true,
  );
  const [marketName, setMarketName] = useState("");
  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { exposer } = useExposer(eventId);
  const [getLadder] = useGetLadderMutation();

  const handleBetSlip = (betType, games, runner, price, bottomValue) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposer?.pnlBySelection) {
        const obj = exposer?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId,
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        pnl: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
        bottomValue,
      };
      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      navigate("/login");
    }
  };

  let pnlBySelection;
  if (exposer?.pnlBySelection) {
    const obj = exposer?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (pnl, marketName) => {
    if (!pnl?.MarketId) {
      return;
    }
    setMarketName(marketName);
    const res = await getLadder({ marketId: pnl?.MarketId }).unwrap();

    if (res.success) {
      setLadderData(res.result);
    }
  };

  return (
    <>
      {ladderData?.length > 0 && (
        <Ladder
          ladderData={ladderData}
          setLadderData={setLadderData}
          eventName={marketName}
        />
      )}
      {fancyData?.length > 0 && (
        <div className="hydrated md eam-table-section fancy-tab-section">
          <div className="hydrated md">
            <div
              className="fancy-tab-ctn"
              role="tabpanel"
              id="simple-tabpanel-0"
              aria-labelledby="simple-tab-0"
            >
              <div className="MuiBox-root jss21">
                <p className="MuiTypography-body1 MuiTypography-root"></p>
                <div className="fm-table-ctn">
                  <div className="table-ctn fm-table-content">
                    <div className="MuiPaper-root MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root">
                      <table
                        className="MuiTable-root fm-table"
                        style={{ maxWidth: "100vw" }}
                      >
                        <thead className="MuiTableHead-root">
                          {/* <tr className="MuiTableRow-root MuiTableRow-head">
                        <th
                          className="MuiTableCell-root MuiTableCell-head tabs-table-cell"
                          colSpan={12}
                          scope="col"
                        >
                          <div className="tabs-fancy">
                            <span className="sel-tab">
                              <div>All</div>
                            </span>
                            <span className="ind-tab">
                              <div>SESSIONS</div>
                            </span>
                            <span className="ind-tab">
                              <div>W/P MARKET</div>
                            </span>
                            <span className="ind-tab">
                              <div>EXTRA MARKET</div>
                            </span>
                            <span className="ind-tab">
                              <div>ODD/EVEN</div>
                            </span>
                          </div>
                        </th>
                      </tr> */}
                        </thead>
                        <tbody className="MuiTableBody-root">
                          <tr className="MuiTableRow-root header-row undefined">
                            <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft market-name-cell-head">
                              <div className="groupname-cell">
                                {" "}
                                Fancy Market
                              </div>
                            </td>

                            <td className="MuiTableCell-root MuiTableCell-body odds-cell-head MuiTableCell-alignCenter odds-no-cell">
                              <div className="odds-no-cell">no</div>
                            </td>
                            <td className="MuiTableCell-root MuiTableCell-body odds-cell-head MuiTableCell-alignCenter odds-yes-cell">
                              <div className="odds-yes-cell">yes</div>
                            </td>
                            <td className="MuiTableCell-root MuiTableCell-body limits-cell MuiTableCell-alignCenter odds-cell-head">
                              <div
                                className="Mui-expanded MuiButtonBase-root MuiAccordionSummary-expandIcon MuiIconButton-edgeEnd MuiIconButton-root"
                                aria-disabled="false"
                                aria-hidden="true"
                              >
                                <span className="MuiIconButton-label">
                                  <svg
                                    className="MuiSvgIcon-root expand-icon"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    focusable="false"
                                  >
                                    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
                                  </svg>
                                </span>
                                <span className="MuiTouchRipple-root" />
                              </div>
                              <div
                                className="MuiCollapse-container MuiCollapse-entered"
                                style={{ minHeight: 0 }}
                              >
                                <div className="MuiCollapse-wrapper">
                                  <div className="MuiCollapse-wrapperInner">
                                    <div role="region" id="panel1a-content" />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          {/* <tr className="MuiTableRow-root header-row row-hidden">
                          <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft market-name-cell-head">
                            <div className="groupname-cell"> Fancy Market</div>
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body book-btn-cell MuiTableCell-alignCenter odds-cell-head">
                            <div className="odds-no-cell" />
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body odds-cell-head MuiTableCell-alignCenter odds-no-cell">
                            <div className="odds-no-cell">no</div>
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body odds-cell-head MuiTableCell-alignCenter odds-yes-cell">
                            <div className="odds-yes-cell">yes</div>
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body limits-cell MuiTableCell-alignCenter odds-cell-head" />
                        </tr> */}
                          {fancyData?.map((games) => {
                            const pnl =
                              pnlBySelection?.find(
                                (pnl) => pnl?.MarketId === games?.id,
                              ) || {};

                            return (
                              <>
                                <tr
                                  key={games?.id}
                                  className="MuiTableRow-root"
                                >
                                  <td className="MuiTableCell-root MuiTableCell-body market-name-cell">
                                    <div className="market">
                                      {games?.name}

                                      {pnl && (
                                        <span
                                          className={` ${
                                            pnl?.pnl > 0 ? "profit" : "loss"
                                          }`}
                                        >
                                          {pnl?.pnl}
                                        </span>
                                      )}
                                    </div>
                                    <div
                                      className="MuiTableCell-root MuiTableCell-body odds-cell book-btn-cell"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {pnl?.length > 0 ? (
                                        <button
                                          onClick={() =>
                                            handleGetLadder(pnl, games?.name)
                                          }
                                          className={`cursor-pointer MuiButton-root MuiButtonBase-root MuiButton-text fancy-book-btn`}
                                          tabIndex={-1}
                                          type="button"
                                        >
                                          <span className="MuiButton-label">
                                            Book
                                          </span>
                                        </button>
                                      ) : (
                                        <button
                                          className={`Mui-disabled Mui-disabled MuiButton-root MuiButtonBase-root MuiButton-text fancy-book-btn`}
                                          tabIndex={-1}
                                          type="button"
                                          disabled
                                        >
                                          <span className="MuiButton-label">
                                            Book
                                          </span>
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  {/* <td className="MuiTableCell-root MuiTableCell-body odds-cell book-btn-cell">
                                  {pnl?.length > 0 ? (
                                    pnl?.map(({ MarketId }, i) => {
                                      return (
                                        <button
                                          key={i}
                                          onClick={() =>
                                            handleGetLadder(MarketId, games)
                                          }
                                          className={`cursor-pointer MuiButton-root MuiButtonBase-root MuiButton-text fancy-book-btn`}
                                          tabIndex={-1}
                                          type="button"
                                        >
                                          <span className="MuiButton-label">
                                            Book
                                          </span>
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <button
                                      className={`Mui-disabled Mui-disabled MuiButton-root MuiButtonBase-root MuiButton-text fancy-book-btn`}
                                      tabIndex={-1}
                                      type="button"
                                      disabled
                                    >
                                      <span className="MuiButton-label">
                                        Book
                                      </span>
                                    </button>
                                  )}
                                </td> */}
                                  <td className="MuiTableCell-root MuiTableCell-body odds-cell">
                                    <div className="odds-block">
                                      <div className="exch-odd-view">
                                        <div
                                          className={`exch-odd-button odds-no-cell ${
                                            isOddSuspended(games)
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          {!isOddSuspended(games) ? (
                                            <div
                                              onClick={() =>
                                                handleBetSlip(
                                                  "lay",
                                                  games,
                                                  games?.runners?.[0],
                                                  games?.runners?.[0]?.lay?.[0]
                                                    ?.line,
                                                  games?.runners?.[0]?.lay?.[0]
                                                    ?.price,
                                                )
                                              }
                                              className="exch-odd-button-content"
                                            >
                                              <div className="runs">
                                                {" "}
                                                {games?.runners?.[0]?.lay?.[0]
                                                  ?.line || "-"}
                                              </div>
                                              <div className="odds">
                                                {" "}
                                                {
                                                  games?.runners?.[0]?.lay?.[0]
                                                    ?.price
                                                }
                                              </div>
                                            </div>
                                          ) : (
                                            <svg
                                              className="MuiSvgIcon-root lock-icon"
                                              viewBox="0 0 24 24"
                                              aria-hidden="true"
                                              focusable="false"
                                            >
                                              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                            </svg>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="MuiTableCell-root MuiTableCell-body odds-cell">
                                    <div className="odds-block">
                                      <div className="exch-odd-view">
                                        <div
                                          className={`exch-odd-button odds-yes-cell ${
                                            isOddSuspended(games)
                                              ? "disabled"
                                              : ""
                                          }`}
                                        >
                                          {!isOddSuspended(games) ? (
                                            <div
                                              onClick={() =>
                                                handleBetSlip(
                                                  "back",
                                                  games,
                                                  games?.runners?.[0],
                                                  games?.runners?.[0]?.back?.[0]
                                                    ?.line,
                                                  games?.runners?.[0]?.back?.[0]
                                                    ?.price,
                                                )
                                              }
                                              className="exch-odd-button-content"
                                            >
                                              <div className="runs">
                                                {" "}
                                                {
                                                  games?.runners?.[0]?.back?.[0]
                                                    ?.line
                                                }
                                              </div>
                                              <div className="odds">
                                                {" "}
                                                {
                                                  games?.runners?.[0]?.back?.[0]
                                                    ?.price
                                                }
                                              </div>
                                            </div>
                                          ) : (
                                            <svg
                                              className="MuiSvgIcon-root lock-icon"
                                              viewBox="0 0 24 24"
                                              aria-hidden="true"
                                              focusable="false"
                                            >
                                              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                            </svg>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="MuiTableCell-root MuiTableCell-body limits-cell"
                                    style={{
                                      paddingLeft: "4px",
                                    }}
                                  >
                                    <div className="limits-data">
                                      <div className="row web-view">
                                        <div>
                                          Min: {games?.minLiabilityPerBet}
                                        </div>
                                        <div>
                                          Max: {games?.maxLiabilityPerBet}
                                        </div>
                                      </div>
                                      <div className="row mob-view">
                                        <div>
                                          Min: {games?.minLiabilityPerBet}
                                        </div>
                                        <div>
                                          Max: {games?.maxLiabilityPerBet}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                {runnerId === games?.id && (
                                  <BetSlip currentPlaceBetEvent={games} />
                                )}
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fancy;
