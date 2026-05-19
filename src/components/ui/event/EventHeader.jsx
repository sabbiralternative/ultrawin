import OpenBets from "./OpenBets";
import { useParams } from "react-router-dom";
import useCurrentBets from "../../../hooks/useCurrentBets";
import useIFrame from "../../../hooks/useIFrame";

const EventHeader = ({ data, tab, setTab }) => {
  const { eventId, eventTypeId } = useParams();
  const { iFrameUrl } = useIFrame(eventTypeId, eventId);
  const { myBets } = useCurrentBets(eventId);

  return (
    <>
      <div className="hydrated md mob-stream-section">
        <div
          className="hydrated md eam-info-header eam-info-header-name"
          style={{ display: "block" }}
        >
          <div className="eam-teams-name">
            <div className="eam-date-ctn">
              <div className="eam-date">
                <div className="eam-dates">
                  <div
                    className="eam-date-time"
                    style={{ fontSize: "10px", display: "flex", gap: "5px" }}
                  >
                    <span style={{ paddingRight: "0px" }}>
                      {" "}
                      {data?.result?.length > 0 &&
                        data?.result?.[0]?.eventName?.split("v")[0]}
                    </span>
                    <span>V</span>
                    <span>
                      {" "}
                      {data?.result?.length > 0 &&
                        data?.result?.[0]?.eventName?.split("v")[1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="eam-teams-name-ctn">
              <div className="eam-team-1">
                {data?.result?.length > 0 && data?.result?.[0]?.openDate}
              </div>
            </div>
          </div>
        </div>
        <div className="MuiTabs-root eam-all-markets-header-tabs">
          <div
            className="MuiTabs-scroller MuiTabs-fixed"
            style={{ overflow: "hidden" }}
          >
            <div className="MuiTabs-flexContainer" role="tablist">
              <button
                style={{ padding: "0px 10px" }}
                onClick={() => setTab("scorecard")}
                className={`MuiTab-root MuiButtonBase-root MuiTab-textColorInherit  event-tab ${
                  tab === "scorecard" ? "Mui-selected" : ""
                }`}
                type="button"
                aria-selected="true"
                role="tab"
              >
                <span className="MuiTab-wrapper">Scorecard</span>
                <span className="MuiTouchRipple-root" />
              </button>
              {iFrameUrl?.url && (
                <button
                  style={{ padding: "0px 10px" }}
                  onClick={() => setTab("liveStream")}
                  className={`MuiTab-root MuiButtonBase-root MuiTab-textColorInherit  event-tab ${
                    tab === "liveStream" ? "Mui-selected" : ""
                  }`}
                  type="button"
                  aria-selected="false"
                  role="tab"
                >
                  <span className="MuiTab-wrapper">Live Stream</span>
                  <span className="MuiTouchRipple-root" />
                </button>
              )}

              <button
                style={{ padding: "0px 10px" }}
                onClick={() => setTab("openBets")}
                className={`MuiTab-root MuiButtonBase-root MuiTab-textColorInherit  event-tab ${
                  tab === "openBets" ? "Mui-selected" : ""
                }`}
                type="button"
                aria-selected="false"
                role="tab"
              >
                <span className="MuiTab-wrapper">
                  Open Bets ({myBets?.length})
                </span>
                <span className="MuiTouchRipple-root" />
              </button>
            </div>
            <span
              className="MuiTabs-indicator jss15 jss17"
              style={{ left: 0, width: "160px" }}
            />
          </div>
        </div>
        {/* <div
          className="event-stat-mobile-ctn"
          role="tabpanel"
          id="simple-tabpanel-0"
          aria-labelledby="simple-tab-0"
        >
          <div className="MuiBox-root jss22">
            <p className="MuiTypography-body1 MuiTypography-root"></p>
            <div>
              <div className="Mui-expanded MuiAccordion-root MuiAccordion-rounded MuiPaper-elevation1 MuiPaper-root MuiPaper-rounded scorecard-accordion">
                <div
                  className="Mui-expanded MuiButtonBase-root MuiAccordionSummary-root scorecard-header"
                  role="button"
                  aria-controls="panel1a-content"
                  aria-disabled="false"
                  aria-expanded="true"
                  tabIndex={0}
                >
                  <div className="Mui-expanded MuiAccordionSummary-content">
                    Live Score
                  </div>
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
                </div>
                <div
                  className="MuiCollapse-container MuiCollapse-entered"
                  style={{ minHeight: 0 }}
                >
                  <div className="MuiCollapse-wrapper">
                    <div className="MuiCollapse-wrapperInner">
                      <div role="region" id="panel1a-content">
                        <div className="MuiAccordionDetails-root scorecard-detail">
                          <div className="widgets">
                            <div>
                              <div className="cricket-score-card score-card">
                                <div />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {tab === "openBets" && <OpenBets myBets={myBets} />}
      </div>

      <div className="hydrated md eam-events-table-section ">
        <div className="hydrated md eam-info-header eam-info-header-name">
          <div className="eam-teams-name">
            <div className="eam-date-ctn">
              <div className="eam-date">
                <div className="eam-dates">
                  <div className="eam-date-time">
                    <span>
                      {data?.result?.length > 0 &&
                        data?.result?.[0]?.eventName?.split("v")[0]}
                      <span>V</span>
                      <span>
                        {" "}
                        {data?.result?.length > 0 &&
                          data?.result?.[0]?.eventName?.split("v")[1]}
                      </span>
                    </span>
                  </div>
                  <div className="eam-date-text"></div>
                </div>
              </div>
            </div>
            <div className="eam-teams-name-ctn">
              <div className="eam-team-1" style={{ color: "white" }}>
                {" "}
                {data?.result?.length > 0 && data?.result?.[0]?.openDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventHeader;
