import "./scoreCard.css";

const ScoreCard = ({ iscore }) => {
  return (
    <div className="score-card cricket-score-card">
      <div>
        <div>
          <div style={{ marginBottom: "3px" }}>
            <div className="sc_cw-container-main">
              <div className="sc_cw-row-ctm">
                <div className="sc_cw-batsman_svg" style={{ display: "block" }}>
                  <img
                    src="https://speedcdn.io/assets/score_card/batsman-bold-outline.svg"
                    height="auto"
                    width="auto"
                    style={{ height: "100px !important" }}
                  />
                </div>
                <div
                  className="sc_cw-team"
                  style={{
                    textAlign: "right",
                    marginRight: "10px",
                    lineHeight: 2,
                  }}
                >
                  <div className="sc_cw-curr_inn">
                    <div style={{ lineHeight: "1.2", fontWeight: 600 }}>
                      {iscore?.teamName}
                    </div>
                    <span className="run" style={{ fontWeight: 600 }}>
                      {iscore?.teamRun}&nbsp;
                    </span>
                    <span className="over" style={{ fontWeight: 600 }}>
                      ({iscore?.teamOver})
                    </span>
                    <br />
                    {iscore?.crr && (
                      <span className="over" style={{ fontWeight: 600 }}>
                        CRR :{iscore?.crr}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className="sc_cw-match_status"
                  style={{
                    border: "1px solid #fff !important",
                    borderRadius: "7px",
                    padding: "5px",
                  }}
                >
                  <span className="sc_cw-commantry2">{iscore?.status}</span>
                  <p
                    className="sc_cw-target"
                    style={{ fontStyle: "italic" }}
                  ></p>
                  <span className="sc_cw-day">
                    <div className="sc_cw-score-over">
                      <ul>
                        {iscore?.currentOver?.map((item, index) => (
                          <li key={index} className="sc_cw-six-balls">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </span>
                  <div
                    className="sc_cw-requiredRunRate"
                    style={{ fontWeight: 600 }}
                  >
                    <span style={{ fontWeight: 600 }} />
                  </div>
                  <div className="sc_cw-batsman-container">
                    <div>
                      {" "}
                      <span>
                        {iscore?.strike === 1 && "*"}
                        {iscore?.player_1_name}
                      </span>{" "}
                      <span>
                        {iscore?.player_1_run} ({iscore?.player_1_sr})
                      </span>{" "}
                    </div>
                    <div>
                      {" "}
                      <span>
                        {iscore?.strike === 2 && "*"}
                        {iscore?.player_2_name}
                      </span>{" "}
                      <span>
                        {iscore?.player_2_run} ({iscore?.player_2_sr})
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div
                  className="sc_cw-team"
                  style={{
                    textAlign: "left",
                    marginLeft: "10px",
                    lineHeight: 2,
                  }}
                >
                  <div className="sc_cw-curr_inn">
                    <div style={{ lineHeight: "1.2", fontWeight: 600 }}>
                      {iscore?.status2}
                    </div>
                    {/* <span className="run" style={{ fontWeight: 600 }}>
                      0/0
                    </span>
                    <span className="over" style={{ fontWeight: 600 }}>
                      (0.0)
                    </span> */}
                    <br />
                    {iscore?.crr && (
                      <span style={{ fontWeight: 600 }}>
                        CRR: {iscore?.crr}
                      </span>
                    )}
                  </div>
                </div>
                <div className="sc_cw-bowler_svg">
                  <img
                    src="https://speedcdn.io/assets/score_card/baller-bold-outline.svg"
                    height="auto"
                    width="auto"
                    style={{ height: "90px !important" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
