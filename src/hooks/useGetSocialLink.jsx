import { useQuery } from "@tanstack/react-query";
import { API } from "../api";

import { AxiosSecure } from "../lib/AxiosSecure";

const useGetSocialLink = () => {
  /* get whats app link */
  const { data: socialLink = {} } = useQuery({
    queryKey: ["whatsApp"],
    queryFn: async () => {
      /* random token function */

      const res = await AxiosSecure.post(API.whatsapp);
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { socialLink };
};

export default useGetSocialLink;
