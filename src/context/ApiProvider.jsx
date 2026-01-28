import { createContext, useEffect, useState } from "react";
import { getSetApis } from "../api/config";
import { API, settings } from "../api";
import notice from "../../notice.json";
export const ApiContext = createContext(null);
const ApiProvider = ({ children }) => {
  const closePopupForForever = localStorage.getItem("closePopupForForever");
  const [noticeLoaded, setNoticeLoaded] = useState(false);
  const [logo, setLogo] = useState("");
  const [addBank, setAddBank] = useState(false);
  const baseUrl = notice?.result?.settings?.baseUrl;
  useEffect(() => {
    getSetApis(setNoticeLoaded, baseUrl);
  }, [noticeLoaded, baseUrl]);

  useEffect(() => {
    if (noticeLoaded) {
      const logo = `${API.assets}/${settings.siteUrl}/logo.${settings.logoFormat}`;
      setLogo(logo);
      /* Theme css */
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";

      if (settings.build === "production") {
        link.href = `${API.assets}/${settings.siteUrl}/theme.css`;
        document.head.appendChild(link);
      } else {
        link.href = `/src/assets/css/theme.css`;
        document.head.appendChild(link);
      }

      /* Dynamically append  favicon  */
      const FavIconLink = document.createElement("link");
      FavIconLink.rel = "icon";
      FavIconLink.type = "image/png";
      FavIconLink.href = `${API.assets}/${settings.siteUrl}/favicon.png`;
      document.head.appendChild(FavIconLink);
      /* Site title */
      if (settings.appOnly && !closePopupForForever) {
        document.title = window.location.hostname;
      } else {
        document.title = settings.siteTitle;
      }
    }
  }, [noticeLoaded]);

  if (!noticeLoaded) {
    return;
  }

  const stateInfo = { logo, addBank, setAddBank };
  return (
    <ApiContext.Provider value={stateInfo}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
