import { Fragment } from "react";
import assets from "../../../assets";

const CricketBattle = () => {
  return (
    <Fragment>
      <div className="border-shadow-container" style={{ cursor: "auto" }}>
        <span className="text">Cricket Battle</span>
      </div>
      <img
        src={assets.cricketBattle}
        alt="logo"
        style={{ width: "100%", borderRadius: "10px", cursor: "auto" }}
      />
    </Fragment>
  );
};

export default CricketBattle;
