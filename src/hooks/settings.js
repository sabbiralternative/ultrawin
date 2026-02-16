import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { settingsAPI } from "../const";
import { API, settings as Settings } from "../api";
import { useLogo } from "../context/ApiProvider";

export const useSettingsMutation = () => {
  const { setLogo } = useLogo();
  return useMutation({
    mutationKey: ["settings"],
    mutationFn: async () => {
      const { data } = await AxiosSecure.post(settingsAPI);
      if (data?.success) {
        if (data?.result) {
          const { endpoint = {}, ...settings } = data.result;

          Object.keys(endpoint).forEach((key) => {
            API[key] = endpoint[key];
          });

          Object.keys(settings).forEach((key) => {
            Settings[key] = settings[key];
          });
        }
        const logo = `${API.assets}/${Settings.siteUrl}/logo.${Settings.logo_format}`;
        setLogo(logo);
        /* Theme css */
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";

        if (Settings.build === "production") {
          link.href = `${API.assets}/${Settings.siteUrl}/theme.css`;
          document.head.appendChild(link);
        } else {
          link.href = `/src/assets/css/theme.css`;
          document.head.appendChild(link);
        }

        /* Dynamically append  favicon  */
        const FavIconLink = document.createElement("link");
        FavIconLink.rel = "icon";
        FavIconLink.type = "image/png";
        FavIconLink.href = `${API.assets}/${Settings.siteUrl}/favicon.png`;
        document.head.appendChild(FavIconLink);
      }
      return data;
    },
  });
};
