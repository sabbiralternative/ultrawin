import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API, settings } from "../api";
import handleRandomToken from "../utils/handleRandomToken";
import handleEncryptData from "../utils/handleEncryptData";
import { useSelector } from "react-redux";
import { userToken } from "../redux/features/auth/authSlice";
/* Iframe  api  */
const useIFrame = (eventTypeId, eventId, hasVideo) => {
  const token = useSelector(userToken);
  const { data: iFrameUrl, refetch: refetchIFrameUrl } = useQuery({
    queryKey: ["iframeVideo"],
    enabled: hasVideo ? true : false,
    queryFn: async () => {
      const generatedToken = handleRandomToken();
      const encryptedVideoData = handleEncryptData({
        eventTypeId: eventTypeId,
        eventId: eventId,
        type: "video",
        token: generatedToken,
        site: settings.siteUrl,
        casino_currency: settings.casino_currency,
      });
      const res = await axios.post(API.accessToken, encryptedVideoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res?.data;

      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { iFrameUrl, refetchIFrameUrl };
};

export default useIFrame;
