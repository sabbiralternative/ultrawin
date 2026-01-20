import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import assets from "../../../assets";
import isOddSuspended, { isGameSuspended } from "../../../utils/isOddSuspended";
import BetSlip from "./BetSlip";
import { settings } from "../../../api";
import useExposer from "../../../hooks/useExposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { handleCashOutPlaceBet } from "../../../utils/handleCashoutPlaceBet";
import SpeedCashOut from "../../modal/SpeedCashOut/SpeedCashOut";

const MatchOdds = ({ data }) => {
  const navigate = useNavigate();
  const [speedCashOut, setSpeedCashOut] = useState(null);
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { data: exposure } = useExposer(eventId);

  const handleBetSlip = (betType, games, runner, price) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
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
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
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
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
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

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId,
  ) => {
    let runner,
      largerExposure,
      layValue,
      oppositeLayValue,
      lowerExposure,
      speedCashOut;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = runner1?.lay?.[0]?.price;
      oppositeLayValue = runner2?.lay?.[0]?.price;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = runner2?.lay?.[0]?.price;
      oppositeLayValue = runner1?.lay?.[0]?.price;
      lowerExposure = exposureA;
    }
    if (exposureA > 0 && exposureB > 0) {
      const difference = exposureA - exposureB;
      if (difference <= 10) {
        speedCashOut = true;
      }
    }
    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
      exposureA,
      exposureB,
      runner1,
      runner2,
      speedCashOut,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      data?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      data.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id,
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id,
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id,
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  return (
    <>
      {speedCashOut && (
        <SpeedCashOut
          speedCashOut={speedCashOut}
          setSpeedCashOut={setSpeedCashOut}
        />
      )}
      {data?.map((games) => {
        const teamProfitForGame = teamProfit?.find(
          (profit) =>
            profit?.gameId === games?.id && profit?.isOnePositiveExposure,
        );

        return (
          <div key={games?.id} className="hydrated md eam-table-section">
            <div className="matchodds-table-ctn">
              <div className="table-ctn matchodds-table-content">
                <div className="MuiPaper-root MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root">
                  <table
                    className="MuiTable-root matchodds-table"
                    style={{
                      width: "100%",
                    }}
                  >
                    <thead className="MuiTableHead-root">
                      <tr className="MuiTableRow-root MuiTableRow-head">
                        <th
                          className="MuiTableCell-root MuiTableCell-head"
                          colSpan={3}
                          scope="col"
                        >
                          <div className="market-name-cell-head-ctn">
                            <span className="market-name">
                              <img
                                src={assets.multipin}
                                className="multi-add-icon"
                                alt="multimarket"
                                title="Add To Multi Markets "
                              />{" "}
                              {games?.name}
                              {settings.betFairCashOut &&
                                games?.runners?.length !== 3 &&
                                games?.status === "OPEN" &&
                                games?.name !== "toss" &&
                                !speedCashOut && (
                                  <div className="cashout-option">
                                    <button
                                      style={{
                                        cursor: `${
                                          !teamProfitForGame
                                            ? "not-allowed"
                                            : "pointer"
                                        }`,
                                        opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
                                      }}
                                      onClick={() =>
                                        handleCashOutPlaceBet(
                                          games,
                                          "lay",
                                          dispatch,
                                          pnlBySelection,
                                          token,
                                          teamProfitForGame,
                                          navigate,
                                        )
                                      }
                                      className={`MuiButtonBase-root MuiButton-root MuiButton-contained btn cashout-btn   MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall ${
                                        teamProfitForGame?.profit > 0
                                          ? "profit"
                                          : "loss"
                                      }`}
                                      type="button"
                                    >
                                      <span className="MuiButton-label">
                                        Cashout{" "}
                                        {teamProfitForGame?.profit &&
                                          `(${teamProfitForGame.profit.toFixed(2)})`}
                                      </span>
                                      <span className="MuiTouchRipple-root"></span>
                                    </button>
                                  </div>
                                )}
                              {settings.betFairCashOut &&
                                games?.runners?.length !== 3 &&
                                games?.status === "OPEN" &&
                                games?.name !== "toss" &&
                                speedCashOut && (
                                  <div className="cashout-option">
                                    <button
                                      onClick={() =>
                                        setSpeedCashOut({
                                          ...speedCashOut,
                                          market_name: games?.name,
                                          event_name: games?.eventName,
                                        })
                                      }
                                      style={{
                                        cursor: `${
                                          !teamProfitForGame
                                            ? "not-allowed"
                                            : "pointer"
                                        }`,
                                        opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
                                      }}
                                      disabled={isGameSuspended(games)}
                                      className={`px-4 py-1.5 rounded-lg !bg-[#82371b] `}
                                      type="button"
                                    >
                                      <span className="MuiButton-label">
                                        Speed Cashout
                                      </span>
                                      <span className="MuiTouchRipple-root"></span>
                                    </button>
                                  </div>
                                )}
                            </span>

                            <span className="web-view bet-limits-section">
                              Min: 100 Max: 25K
                            </span>
                            <span className="mob-view bet-limits-section">
                              <div>Min: 100</div>
                              <div>Max: 25K</div>
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="MuiTableBody-root">
                      <tr className="MuiTableRow-root header-row">
                        <td
                          className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft market-name-cell-head"
                          colSpan={1}
                        >
                          <div className="teamname-odd">Market</div>
                        </td>
                        <td
                          className="MuiTableCell-root MuiTableCell-body odds-cell-head MuiTableCell-alignRight"
                          colSpan={1}
                        >
                          <div className="back-odd">Back</div>
                        </td>
                        <td
                          className="MuiTableCell-root MuiTableCell-body odds-cell-head MuiTableCell-alignLeft"
                          colSpan={1}
                        >
                          <div className="lay-odd">Lay</div>
                        </td>
                      </tr>
                      {games?.runners?.map((runner) => {
                        const pnl = pnlBySelection?.find(
                          (pnl) => pnl?.RunnerId === runner?.id,
                        );
                        const predictOddValues = predictOdd?.find(
                          (val) => val?.id === runner?.id,
                        );
                        return (
                          <>
                            <tr key={runner?.id} className="MuiTableRow-root">
                              <td className="MuiTableCell-root MuiTableCell-body team-name-cell">
                                <div
                                  className="team"
                                  style={{
                                    marginLeft: "10px",
                                  }}
                                >
                                  {" "}
                                  {runner?.name}
                                  {pnl && (
                                    <span
                                      style={{ backgroundColor: "white" }}
                                      className={` ${
                                        pnl?.pnl > 0 ? "profit" : "loss"
                                      }`}
                                    >
                                      {pnl?.pnl > 0 && "+"}
                                      {pnl?.pnl}
                                    </span>
                                  )}
                                </div>
                                {stake && runnerId && predictOddValues && (
                                  <div className="profit-loss-box">
                                    <span
                                      className={`${
                                        predictOddValues?.exposure > 0
                                          ? "profit"
                                          : "loss"
                                      }`}
                                    >
                                      {predictOddValues?.exposure > 0 && "+"}{" "}
                                      {predictOddValues?.exposure}
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td className="MuiTableCell-root MuiTableCell-body odds-cell">
                                <div className="odds-block web-view back-odds-block">
                                  <div className="exch-odd-view">
                                    <div
                                      className={`exch-odd-button back-odd ${
                                        isOddSuspended(runner) ? "disabled" : ""
                                      }`}
                                    >
                                      {isOddSuspended(runner) ? (
                                        <svg
                                          className="MuiSvgIcon-root lock-icon"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                        </svg>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            handleBetSlip(
                                              "back",
                                              games,
                                              runner,
                                              runner?.back?.[0]?.price,
                                            )
                                          }
                                          className="exch-odd-button-content"
                                        >
                                          <div className="price">
                                            {" "}
                                            {runner?.back?.[0]?.price || "-"}
                                          </div>
                                          <div className="size">
                                            {" "}
                                            {runner?.back?.[0]?.size || "-"}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="exch-odd-view">
                                    <div
                                      className={`exch-odd-button back-odd ${
                                        isOddSuspended(runner) ? "disabled" : ""
                                      }`}
                                    >
                                      {isOddSuspended(runner) ? (
                                        <svg
                                          className="MuiSvgIcon-root lock-icon"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                        </svg>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            handleBetSlip(
                                              "back",
                                              games,
                                              runner,
                                              runner?.back?.[1]?.price,
                                            )
                                          }
                                          className="exch-odd-button-content"
                                        >
                                          <div className="price">
                                            {" "}
                                            {runner?.back?.[1]?.price || "-"}
                                          </div>
                                          <div className="size">
                                            {" "}
                                            {runner?.back?.[1]?.size || "-"}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="exch-odd-view">
                                    <div
                                      className={`exch-odd-button back-odd ${
                                        isOddSuspended(runner) ? "disabled" : ""
                                      }`}
                                    >
                                      {isOddSuspended(runner) ? (
                                        <svg
                                          className="MuiSvgIcon-root lock-icon"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                        </svg>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            handleBetSlip(
                                              "back",
                                              games,
                                              runner,
                                              runner?.back?.[2]?.price,
                                            )
                                          }
                                          className="exch-odd-button-content"
                                        >
                                          <div className="price">
                                            {" "}
                                            {runner?.back?.[2]?.price || "-"}
                                          </div>
                                          <div className="size">
                                            {" "}
                                            {runner?.back?.[2]?.size || "-"}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="odds-block mob-view">
                                  <div className="exch-odd-view">
                                    <div
                                      className={`exch-odd-button back-odd ${
                                        isOddSuspended(runner) ? "disabled" : ""
                                      }`}
                                    >
                                      {isOddSuspended(runner) ? (
                                        <svg
                                          className="MuiSvgIcon-root lock-icon"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                        </svg>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            handleBetSlip(
                                              "back",
                                              games,
                                              runner,
                                              runner?.back?.[0]?.price,
                                            )
                                          }
                                          className="exch-odd-button-content"
                                        >
                                          <div className="price">
                                            {" "}
                                            {runner?.back?.[0]?.price || "-"}
                                          </div>
                                          <div className="size">
                                            {" "}
                                            {runner?.back?.[0]?.size || "-"}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="MuiTableCell-root MuiTableCell-body odds-cell">
                                <div className="odds-block web-view">
                                  <div className="exch-odd-view">
                                    <div
                                      className={`exch-odd-button lay-odd ${
                                        isOddSuspended(runner) ? "disabled" : ""
                                      }`}
                                    >
                                      {isOddSuspended(runner) ? (
                                        <svg
                                          className="MuiSvgIcon-root lock-icon"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                        </svg>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            handleBetSlip(
                                              "lay",
                                              games,
                                              runner,
                                              runner?.lay?.[0]?.price,
                                            )
                                          }
                                          className="exch-odd-button-content"
                                        >
                                          <div className="price">
                                            {" "}
                                            {runner?.lay?.[0]?.price || "-"}
                                          </div>
                                          <div className="size">
                                            {" "}
                                            {runner?.lay?.[0]?.size || "-"}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="exch-odd-view">
                                    <div
                                      className={`exch-odd-button lay-odd ${
                                        isOddSuspended(runner) ? "disabled" : ""
                                      }`}
                                    >
                                      {isOddSuspended(runner) ? (
                                        <svg
                                          className="MuiSvgIcon-root lock-icon"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                        </svg>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            handleBetSlip(
                                              "lay",
                                              games,
                                              runner,
                                              runner?.lay?.[1]?.price,
                                            )
                                          }
                                          className="exch-odd-button-content"
                                        >
                                          <div className="price">
                                            {" "}
                                            {runner?.lay?.[1]?.price || "-"}
                                          </div>
                                          <div className="size">
                                            {" "}
                                            {runner?.lay?.[1]?.size || "-"}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="exch-odd-view">
                                    <div
                                      className={`exch-odd-button lay-odd ${
                                        isOddSuspended(runner) ? "disabled" : ""
                                      }`}
                                    >
                                      {isOddSuspended(runner) ? (
                                        <svg
                                          className="MuiSvgIcon-root lock-icon"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                        </svg>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            handleBetSlip(
                                              "lay",
                                              games,
                                              runner,
                                              runner?.lay?.[2]?.price,
                                            )
                                          }
                                          className="exch-odd-button-content"
                                        >
                                          <div className="price">
                                            {" "}
                                            {runner?.lay?.[2]?.price || "-"}
                                          </div>
                                          <div className="size">
                                            {" "}
                                            {runner?.lay?.[2]?.size || "-"}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="odds-block mob-view">
                                  <div className="exch-odd-view">
                                    <div
                                      className={`exch-odd-button lay-odd ${
                                        isOddSuspended(runner) ? "disabled" : ""
                                      }`}
                                    >
                                      {isOddSuspended(runner) ? (
                                        <svg
                                          className="MuiSvgIcon-root lock-icon"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                                        </svg>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            handleBetSlip(
                                              "lay",
                                              games,
                                              runner,
                                              runner?.lay?.[0]?.price,
                                            )
                                          }
                                          className="exch-odd-button-content"
                                        >
                                          <div className="price">
                                            {" "}
                                            {runner?.lay?.[0]?.price || "-"}
                                          </div>
                                          <div className="size">
                                            {" "}
                                            {runner?.lay?.[0]?.size || "-"}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            {runner?.id === runnerId && (
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
        );
      })}
    </>
  );
};

export default MatchOdds;
