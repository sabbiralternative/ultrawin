import { useQuery } from "@tanstack/react-query";

import { API } from "../api";

import { AxiosSecure } from "../lib/AxiosSecure";
/* single passbook */
const useSingleProfitLoss = (marketId) => {
  const { data: singlePassbook } = useQuery({
    queryKey: ["singlePassbook"],
    /* enable when token available */
    queryFn: async () => {
      const res = await AxiosSecure.post(`${API.settledBets}/${marketId}`);
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });

  return { singlePassbook };
};

export default useSingleProfitLoss;
