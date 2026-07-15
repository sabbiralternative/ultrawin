import { useParams } from "react-router-dom";
import { useGetAllOddsEventsQuery } from "../../redux/features/events/events";
import EventHeader from "../../components/ui/event/EventHeader";
import Fancy from "../../components/ui/event/Fancy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import IFrame from "../../components/ui/event/IFrame";
import ScoreCard from "../../components/ui/event/ScoreCard";
import RightSidebar from "../../components/ui/event/RightSidebar/RightSidebar";
import HorseGreyhound from "../../components/ui/event/HorseGreyhound";
import Bookmaker from "../../components/ui/event/Bookmaker";
import MatchOdds from "../../components/ui/event/MatchOdds";
import Premium from "../../components/ui/event/Premium";

const Event = () => {
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("scorecard");
  const { placeBetValues, price, stake } = useSelector((state) => state.event);
  const { eventTypeId, eventId } = useParams();
  const payload = {
    eventTypeId,
    eventId,
  };

  const { data } = useGetAllOddsEventsQuery(payload, {
    pollingInterval: 900,
  });

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
      setProfit(formatNumber(1 + price / stake));
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const matchOdds = data?.result?.filter(
    (game) =>
      game.btype === "MATCH_ODDS" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );
  const bookmaker = data?.result?.filter(
    (game) =>
      game.btype === "BOOKMAKER" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );

  const tiedMatch = data?.result?.filter(
    (game) =>
      (game.btype === "MATCH_ODDS" || game.btype === "BOOKMAKER") &&
      game?.visible == true &&
      game?.name === "tied match",
  );

  return (
    <>
      <div className="router-ctn">
        <div className="ds-view-ctn">
          <div className="punter-view" id="main-content">
            <div className="sports-view-ctn">
              <div>
                <div
                  className="hydrated md eam-ctn"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div
                    className="eam-events-table-section md hydrated"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      background: "var( --primary-background-color)",
                    }}
                  >
                    <EventHeader setTab={setTab} tab={tab} data={data} />
                    <IFrame tab={tab} setTab={setTab} score={data?.score} />
                    {data?.iscore &&
                      eventTypeId == 4 &&
                      tab === "scorecard" && (
                        <ScoreCard iscore={data?.iscore} />
                      )}
                    {matchOdds?.length > 0 && <MatchOdds data={matchOdds} />}

                    {bookmaker?.length > 0 && <Bookmaker data={bookmaker} />}
                    {data?.result?.length > 0 && <Fancy data={data?.result} />}

                    {eventTypeId == 7 || eventTypeId == 4339 ? (
                      <HorseGreyhound data={data} />
                    ) : null}
                    {tiedMatch?.length > 0 && <MatchOdds data={tiedMatch} />}
                    {data?.premium && data?.premium?.eventId && (
                      <Premium premium={data?.premium} />
                    )}
                  </div>
                  <RightSidebar score={data?.score} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
