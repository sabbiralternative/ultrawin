import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBalance from "../../../hooks/useBalance";
import useExposer from "../../../hooks/useExposure";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import {
  setPlaceBetValues,
  setPrice,
  setRunnerId,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { API, settings } from "../../../api";
import toast from "react-hot-toast";
import { handleIncreasePrice } from "../../../utils/handleIncreasePrice";
import { handleDecreasePrice } from "../../../utils/handleDecreasePrice";
import useCurrentBets from "../../../hooks/useCurrentBets";
import { AxiosJSEncrypt } from "../../../lib/AxiosJSEncrypt";

const BetSlip = ({ currentPlaceBetEvent }) => {
  const closePopupForForever = localStorage.getItem("closePopupForForever");
  const [isCashOut, setIsCashOut] = useState(false);
  const [profit, setProfit] = useState(0);
  const { eventTypeId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  const { refetchCurrentBets } = useCurrentBets(eventId);
  const { refetchBalance } = useBalance();
  const { refetchExposure } = useExposer(eventId);
  const { placeBetValues, price, stake, predictOdd } = useSelector(
    (state) => state?.event,
  );

  // const [createOrder] = useOrderMutation();
  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  const [betDelay, setBetDelay] = useState("");

  useEffect(() => {
    dispatch(setPrice(parseFloat(placeBetValues?.price)));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize?.toFixed(2)
          : null,
      ),
    );
    setIsCashOut(placeBetValues?.cashout || false);
  }, [placeBetValues, dispatch]);

  let payload = {};
  if (price) {
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: currentPlaceBetEvent?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: stake,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: settings.b2c,
      };
    } else {
      payload = {
        betDelay: currentPlaceBetEvent?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: stake,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: settings.b2c,
      };
    }
  }

  /* Handle bets */

  const handleOrderBets = async () => {
    setLoading(true);
    const payloadData = [
      {
        ...payload,

        nounce: uuidv4(),
        isbetDelay:
          placeBetValues?.btype === "FANCY" &&
          placeBetValues?.eventTypeId === "4"
            ? false
            : settings.bet_delay,
        apk: closePopupForForever ? true : false,
      },
    ];
    let delay = 0;
    if (
      placeBetValues?.btype !== "FANCY" &&
      placeBetValues?.eventTypeId !== "4"
    ) {
      if (
        (eventTypeId == 4 || eventTypeId == 2) &&
        placeBetValues?.btype === "MATCH_ODDS" &&
        price > 3 &&
        placeBetValues?.name?.length === 2
      ) {
        delay = 9000;
      }
      if (
        (eventTypeId == 4 || eventTypeId == 2) &&
        placeBetValues?.btype === "MATCH_ODDS" &&
        price > 7 &&
        placeBetValues?.name?.length === 3
      ) {
        delay = 9000;
      } else {
        setBetDelay(currentPlaceBetEvent?.betDelay);
        delay = settings?.bet_delay ? currentPlaceBetEvent?.betDelay * 1000 : 0;
      }
    }

    // Introduce a delay before calling the API
    setTimeout(async () => {
      try {
        // const res = await createOrder(payloadData).unwrap();
        const { data } = await AxiosJSEncrypt.post(API.order, payloadData);
        if (data?.success) {
          setLoading(false);
          refetchExposure();
          refetchBalance();
          dispatch(setRunnerId(null));
          dispatch(setPlaceBetValues(null));
          refetchCurrentBets();
          setBetDelay("");
          dispatch(setStake(null));
          toast.success(data?.result?.result?.placed?.[0]?.message);
        } else {
          setLoading(false);
          toast.error(
            data?.error?.status?.[0]?.description || data?.error?.errorMessage,
          );
          setBetDelay("");
          setBetDelay(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong. Please try again.");
        setBetDelay("");
      }
    }, delay);
  };

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      const bookmaker = 1 + price / 100;
      const total = bookmaker * stake - stake;

      setProfit(formatNumber(total));
    } else if (price && stake && placeBetValues?.btype === "FANCY") {
      const profit =
        (parseFloat(placeBetValues?.bottomValue) * parseFloat(stake)) /
        parseFloat(stake);
      setProfit(profit);
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const handleCancelBet = () => {
    dispatch(setRunnerId(null));
    dispatch(setPlaceBetValues(null));
    dispatch(setStake(null));
  };

  const handleButtonValue = (value) => {
    setIsCashOut(false);
    const buttonValue = Number(value);
    const prevStake = !stake ? null : Number(stake);

    if (prevStake === null) {
      dispatch(setStake(buttonValue));
    }
    if (prevStake >= 0) {
      dispatch(setStake(buttonValue + prevStake));
    }
  };
  const selectedEvent = predictOdd?.find(
    (odd) => odd?.id === placeBetValues?.selectionId,
  );
  return (
    <tr className="MuiTableRow-root inline-betslip mobile-betslip">
      <td className="MuiTableCell-root MuiTableCell-body" colSpan="4">
        <div className="exch-betslip-ctn">
          {loading && (
            <div className="betslip-progress">
              <span
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "2px",
                  color: "white",
                }}
              >
                {betDelay > 0 && betDelay}
              </span>
              <div className="centered">
                <div className="spinner loading"></div>
              </div>
            </div>
          )}

          <div
            className={`body-ctn   ${
              placeBetValues?.back
                ? "bs-back-bet bet-body-back  back-line"
                : "bs-lay-bet bet-body-lay  lay-line"
            }`}
          >
            <div
              className={`bet-body  ${
                placeBetValues?.back ? "bet-body-back" : "bet-body-lay"
              }`}
            >
              <div className="header-row">
                <div
                  className="header-event-market-div"
                  style={{
                    height: "100%",
                    marginTop: "5px",
                  }}
                >
                  <div className="event">{placeBetValues?.eventName}</div>
                  <div className="market">
                    {placeBetValues?.selectedBetName ||
                      placeBetValues?.marketName}
                    {/* <span className="odd-value">1.86</span> */}
                  </div>
                </div>
                <button
                  onClick={handleCancelBet}
                  className="MuiButtonBase-root MuiIconButton-root bet-del-btn"
                  type="button"
                  aria-label="close"
                >
                  <span className="MuiIconButton-label">
                    <svg
                      className="MuiSvgIcon-root close-icon"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                  </span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </div>
              <div className="bet-card bet-card-back">
                <div className="input-row">
                  <div className="input-row-ctn odds-ctn">
                    <div className="row-header">Odd Value</div>
                    <div
                      className="row-input"
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {!placeBetValues?.isWeak && (
                        <button
                          onClick={() => {
                            handleDecreasePrice(
                              price,
                              placeBetValues,
                              dispatch,
                              setPrice,
                            );
                            setIsCashOut(false);
                          }}
                          className="MuiButtonBase-root MuiButton-root MuiButton-contained odds-btns MuiButton-containedPrimary"
                          type="button"
                        >
                          <span className="MuiButton-label">
                            <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M19 13H5v-2h14v2z"></path>
                              </svg>
                            </span>
                          </span>
                          <span className="MuiTouchRipple-root"></span>
                        </button>
                      )}

                      <div className="sc-ion-input-md-h sc-ion-input-md-s md has-value hydrated">
                        <input
                          style={{
                            width: "100%",
                          }}
                          onChange={(e) => {
                            dispatch(setPrice(e.target.value));
                            setIsCashOut(false);
                          }}
                          className="native-input sc-ion-input-md"
                          aria-labelledby="ion-input-1-lbl"
                          name="ion-input-1"
                          type="number"
                          value={price}
                        />
                      </div>
                      {!placeBetValues?.isWeak && (
                        <button
                          onClick={() => {
                            handleIncreasePrice(
                              price,
                              placeBetValues,
                              dispatch,
                              setPrice,
                            );
                            setIsCashOut(false);
                          }}
                          className="MuiButtonBase-root MuiButton-root MuiButton-contained odds-btns MuiButton-containedPrimary"
                          type="button"
                        >
                          <span className="MuiButton-label">
                            <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                              </svg>
                            </span>
                          </span>
                          <span className="MuiTouchRipple-root"></span>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="input-row-ctn stake-ctn">
                    <div className="row-header">Amount</div>
                    <input
                      onChange={(e) => {
                        dispatch(setStake(e.target.value));
                        setIsCashOut(false);
                      }}
                      onInput={(e) => {
                        const raw = e.target.value;

                        if (raw === "") {
                          dispatch(setStake(null));
                          return;
                        }

                        const value = Number(raw);

                        if (value >= 1) {
                          dispatch(setStake(raw));
                        } else {
                          e.target.value = null;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      min={1}
                      className="row-input"
                      type="number"
                      placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
                      value={stake !== null && stake}
                      style={{ height: "39px", border: "0px", padding: "10px" }}
                    />
                    <div
                      onClick={() => dispatch(setStake(""))}
                      className="clear-row"
                    >
                      <span className="text b-text">Clear</span>
                    </div>
                  </div>
                </div>
                <div className="quick-bet">
                  {/* <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-text qb-btn"
                    type="button"
                  >
                    <span className="MuiButton-label">+Gurpreet </span>
                    <span className="MuiTouchRipple-root"></span>
                  </button> */}

                  {parseButtonValues?.map((button, idx) => {
                    return (
                      <button
                        onClick={() => handleButtonValue(button?.value)}
                        key={idx}
                        className="MuiButtonBase-root MuiButton-root MuiButton-text qb-btn"
                        type="button"
                      >
                        <span className="MuiButton-label">
                          +{button?.value}
                        </span>
                        <span className="MuiTouchRipple-root"></span>
                      </button>
                    );
                  })}
                </div>
                <div className="quick-bet">
                  <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-text qb-btn-allin min-btn"
                    type="button"
                  >
                    <span className="MuiButton-label">Min Stake</span>
                    <span className="MuiTouchRipple-root"></span>
                  </button>
                  <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-text qb-btn-allin max-btn"
                    type="button"
                  >
                    <span className="MuiButton-label">Max Stake</span>
                    <span className="MuiTouchRipple-root"></span>
                  </button>
                  {/* <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-text qb-btn-allin edit-btn"
                    tabindex="0"
                    type="button"
                  >
                    <span className="MuiButton-label">Edit Stake</span>
                    <span className="MuiTouchRipple-root"></span>
                  </button> */}
                  <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-text qb-btn-allin clear-btn"
                    type="button"
                  >
                    <span className="MuiButton-label">Clear</span>
                    <span className="MuiTouchRipple-root"></span>
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        setStake(
                          parseButtonValues[parseButtonValues?.length - 1]
                            ?.value,
                        ),
                      )
                    }
                    className="MuiButtonBase-root MuiButton-root MuiButton-text qb-btn-allin"
                    type="button"
                  >
                    <span className="MuiButton-label">MAX</span>
                    <span className="MuiTouchRipple-root"></span>
                  </button>
                </div>
                <div className="d-flex-row">
                  <div className="width-mob-100">
                    <div className="profit-loss">
                      <div className="info">
                        {placeBetValues?.back ? "Profit :" : "Liability : "}
                      </div>
                      <div className="returns">
                        <div className="amt">
                          {" "}
                          {placeBetValues?.back
                            ? profit
                            : placeBetValues?.btype === "FANCY"
                              ? profit
                              : selectedEvent?.exposure}
                        </div>
                      </div>
                    </div>
                    {/* <div className="profit-loss-pts">
                      <div className="info">
                        <div className="profit-loss">
                          <div className="info">Total Amount (in PTS)</div>
                        </div>
                      </div>
                      <div className="returns">
                        <div className="amt">0.00</div>
                      </div>
                    </div> */}
                  </div>
                  <div className="place-section mob-view">
                    <button
                      onClick={handleOrderBets}
                      disabled={!stake || betDelay > 0}
                      className={`MuiButtonBase-root MuiButton-root MuiButton-text  place-btn`}
                      type="button"
                    >
                      <span className="MuiButton-label">
                        <div className="btn-content">
                          <div className="label">Place Bet</div>
                        </div>
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bet-footer web-view">
            <div className="place-section">
              <button
                style={{ width: "100%" }}
                onClick={handleOrderBets}
                disabled={!stake || betDelay > 0}
                className={`MuiButtonBase-root MuiButton-root MuiButton-text ${
                  !stake || betDelay > 0 ? "place-btn-disable" : "place-btn"
                }`}
                type="button"
              >
                <span className="MuiButton-label">
                  <div className="btn-content">
                    <div className="label">Place Bet</div>
                  </div>
                </span>
                <span className="MuiTouchRipple-root"></span>
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default BetSlip;
