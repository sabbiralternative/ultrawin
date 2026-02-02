import { useDispatch, useSelector } from "react-redux";
import assets from "../../../assets";
import {
  setClosePopUpForForever,
  setGroupType,
  setShowAPKModal,
  setShowAppPopUp,
  setShowLeftSidebar,
} from "../../../redux/features/global/globalSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useBalance from "../../../hooks/useBalance";
import useBonusBalance from "../../../hooks/useBonusBalance";
import useContextState from "../../../hooks/useContextState";
import { useEffect, useState } from "react";
import moment from "moment";
import { settings } from "../../../api";
import AppPopup from "./AppPopUp";
import Notification from "./Notification";
import DownloadAPK from "../../modal/DownloadAPK/DownloadAPK";
import WarningCondition from "../../ui/WarningCondition/WarningCondition";
import Error from "../../modal/Error/Error";
// import Dropdown from "./Dropdown";

const Header = () => {
  const { showAppPopUp, windowWidth, showAPKModal, closePopupForForever } =
    useSelector((state) => state?.global);
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { logo } = useContextState();
  const { balance } = useBalance();
  const { bonusBalance } = useBonusBalance();
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [time, setTime] = useState();

  useEffect(() => {
    setTimeout(() => {
      setTime(moment().format("h:mm:ss a"));
    }, 1000);
  }, [time]);

  useEffect(() => {
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    dispatch(setClosePopUpForForever(closePopupForForever ? true : false));
    const apk_modal_shown = sessionStorage.getItem("apk_modal_shown");
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      sessionStorage.setItem("apk_modal_shown", true);
      localStorage.setItem("closePopupForForever", true);
      dispatch(setClosePopUpForForever(true));
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!apk_modal_shown) {
        dispatch(setShowAPKModal(true));
      }
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if ((!expiryTime || currentTime > expiryTime) && settings?.apkLink) {
          localStorage.removeItem("installPromptExpiryTime");

          dispatch(setShowAppPopUp(true));
        }
      }
    }
  }, [
    dispatch,
    windowWidth,
    showAppPopUp,
    location?.state?.pathname,
    location.pathname,
  ]);

  const handleNavigateToIFrame = (name, id) => {
    if (token) {
      if (settings.casinoCurrency !== "AED") {
        navigate(`/casino/${name}/${id}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: name, gameId: id });
        setShowWarning(true);
      }
    } else {
      navigate("/login");
    }
  };

  if (settings.appOnly && !closePopupForForever) {
    return <Error />;
  }
  return (
    <>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      {settings?.apkLink && showAPKModal && <DownloadAPK />}
      <Notification />
      {settings?.apkLink && showAppPopUp && windowWidth < 1040 && <AppPopup />}
      <div className="app-sub-header">
        <div className="MuiTabs-root actions-list web-view">
          <div
            className="MuiTabs-scrollable"
            style={{
              width: "99px",
              height: "99px",
              position: "absolute",
              top: "-9999px",
              overflow: "scroll",
            }}
          ></div>
          <div
            className="MuiTabs-scroller MuiTabs-scrollable"
            style={{ marginBottom: "0px" }}
          >
            <div
              className="MuiTabs-flexContainer"
              role="tablist"
              style={{ marginTop: "0px", height: "100%" }}
            >
              <Link
                aria-current="page"
                className={`nav-link  ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-text nav-link-btn"
                  type="button"
                >
                  <span className="MuiButton-label">home</span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </Link>
              <Link
                className={`nav-link  ${
                  location.pathname === "/in-play" ? "active" : ""
                }`}
                value="1"
                to="/in-play"
              >
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-text nav-link-btn"
                  type="button"
                >
                  <span className="MuiButton-label">Inplay</span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </Link>
              <Link
                className={`nav-link  ${
                  location.pathname === "/sports-book" ? "active" : ""
                }`}
                value="1"
                onClick={() => handleNavigateToIFrame("sportsbook", "550000")}
              >
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-text nav-link-btn"
                  type="button"
                >
                  <span className="MuiButton-label">Sportsbook</span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </Link>

              <Link
                className={`nav-link  ${
                  location.pathname === "/live-casino" ? "active" : ""
                }`}
                value="3"
                to="/live-casino"
              >
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-text nav-link-btn"
                  type="button"
                >
                  <span className="MuiButton-label">Live Casino</span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </Link>

              <Link
                className={`nav-link  ${
                  location.pathname === "/multi-markets" ? "active" : ""
                }`}
                value="1"
                to="/multi-markets"
              >
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-text nav-link-btn"
                  type="button"
                >
                  <span className="MuiButton-label">Multi Markets</span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </Link>
              <Link
                className="nav-link"
                textcolor="inherit"
                value="5"
                to="/promotions"
              >
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-text check-bonus-btn check-bt-blink-animation"
                  type="button"
                >
                  <span className="MuiButton-label">Check Bonuses</span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </Link>
            </div>
            <span
              className="jss53 jss55 MuiTabs-indicator"
              style={{ left: "84.625px", width: "57.4062px" }}
            ></span>
          </div>
        </div>
        <div className="logo-wrapper" style={{ gap: "5px" }}>
          <div
            onClick={() => dispatch(setShowLeftSidebar(true))}
            className="side-bar-icon-div mob-view"
          >
            <img
              src={assets.sidebarIcon}
              alt="sidebar-icon"
              className="sb-menu-bar-icon"
            />
          </div>
          <div
            onClick={() => {
              navigate("/");
              dispatch(setGroupType(null));
            }}
            className="new-whatsapp mob-view"
          >
            <img
              style={{ height: "100%", width: "100px", objectFit: "contain" }}
              src={logo}
            />
          </div>
        </div>
        <div className="whatsapp-login-signup ">
          {/* {token && (
            <Link to="/deposit" className="deposit-btn-wrapper mob-view">
              <div className="deposit-btn">&nbsp;&nbsp;Deposit&nbsp;&nbsp;</div>
            </Link>
          )} */}
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="cb cb-variant-1 sh-new-btn"
              >
                login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="cb cb-variant-2 sh-new-btn"
              >
                signup
              </button>
            </>
          ) : (
            <>
              <div className="bal-exp-btns">
                <div className="bal-exp-btn username-sb">{user}</div>
                <div className="bal-exp-btn balance-sb">
                  Bal:{balance?.availBalance}
                  <svg
                    className="MuiSvgIcon-root input-tooltip"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    title="Cashable : 0 Non-cashable :0.00"
                  >
                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                  </svg>
                </div>
              </div>
              <div className="bal-exp-btns">
                <div className="bal-exp-btn">
                  Bonus: {bonusBalance?.availBalance}
                </div>
                <div className="bal-exp-btn">
                  Exp:{balance?.deductedExposure}
                </div>
              </div>
            </>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0px 5px",
            }}
          >
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-text jss41 web-view"
              type="button"
              aria-controls="theme-menu"
              aria-haspopup="true"
            >
              <span className="MuiButton-label">
                <img src={assets.theme} />
              </span>
              <span className="MuiTouchRipple-root"></span>
            </button>
          </div>
        </div>
      </div>
      {/* <Dropdown /> */}
    </>
  );
};

export default Header;
