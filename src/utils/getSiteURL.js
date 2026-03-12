import { settings } from "../api";

export const getSiteURL = () => {
  let siteURL;
  if (window.location.hostname === "localhost") {
    if (settings.siteUrl) {
      siteURL = settings.siteUrl;
    }
  }
  if (window.location.hostname !== "localhost") {
    siteURL = window.location.hostname;
  }

  return { siteURL };
};
