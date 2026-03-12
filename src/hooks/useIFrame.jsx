import { useQuery } from "@tanstack/react-query";
import { API, settings } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
/* Iframe  api  */
const useIFrame = (eventTypeId, eventId, hasVideo) => {
  const { data: iFrameUrl, refetch: refetchIFrameUrl } = useQuery({
    queryKey: ["iframeVideo"],
    enabled: hasVideo ? true : false,
    queryFn: async () => {
      const payload = {
        eventTypeId: eventTypeId,
        eventId: eventId,
        type: "video",

        casino_currency: settings.casino_currency,
      };
      const res = await AxiosSecure.post(API.accessToken, payload);
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
