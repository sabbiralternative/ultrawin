import { createContext, useContext, useEffect, useState } from "react";
import { getSetApis } from "../api/config";
import { settings } from "../api";

export const ApiContext = createContext(null);
const ApiProvider = ({ children }) => {
  const closePopupForForever = localStorage.getItem("closePopupForForever");
  const [noticeLoaded, setNoticeLoaded] = useState(false);
  const [logo, setLogo] = useState("");
  const [addBank, setAddBank] = useState(false);

  useEffect(() => {
    if (!noticeLoaded) {
      const fetchAPI = () => {
        getSetApis(setNoticeLoaded);
      };
      fetchAPI();
    }
  }, [noticeLoaded]);

  useEffect(() => {
    if (noticeLoaded) {
      /* Site title */
      if (settings.app_only && !closePopupForForever) {
        document.title = window.location.hostname;
      } else {
        document.title = settings.site_name;
      }
    }
  }, [noticeLoaded]);

  if (!noticeLoaded) {
    return;
  }

  const stateInfo = { logo, addBank, setAddBank, setLogo };
  return (
    <ApiContext.Provider value={stateInfo}>{children}</ApiContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(ApiContext);
  return context;
};

export default ApiProvider;
