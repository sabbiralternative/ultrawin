import { useSelector } from "react-redux";
import HomeComponent from "../../components/ui/Home/Home";
import useSportsBook from "../../hooks/useSportsBook";
import Group from "../../components/ui/Home/Group";
import HorseRacing from "../../components/ui/Home/HorseRacing/HorseRacing";
import GreyhoundRacing from "../../components/ui/Home/GreyhoundRacing/GreyhoundRacing";
import { useState } from "react";
import MiniGames from "../../components/modal/MiniGames";

const Home = () => {
  const [showMiniGamesModal, setShowMiniGamesModal] = useState(false);
  const { group } = useSelector((state) => state.global);
  const { data } = useSportsBook(group);
  return (
    <>
      {group === null && <HomeComponent />}
      {group !== null &&
        group !== "horse-racing" &&
        group !== "greyhound-racing" &&
        data && <Group data={data} />}
      {group === "horse-racing" && <HorseRacing />}
      {group === "greyhound-racing" && <GreyhoundRacing />}
      <div
        onClick={() => setShowMiniGamesModal(true)}
        style={{
          position: "fixed",
          top: "calc(100dvh - 130px)",
          left: "0",
          height: "fit-content",
          cursor: "pointer",
          // zIndex: 999999,
        }}
      >
        <img
          style={{
            height: "70px",
          }}
          src="/images/uv_games-CkYT1PYz.gif"
        />
      </div>
      {showMiniGamesModal && (
        <MiniGames setShowMiniGamesModal={setShowMiniGamesModal} />
      )}
    </>
  );
};

export default Home;
