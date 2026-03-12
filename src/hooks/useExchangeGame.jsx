import { useQuery } from "@tanstack/react-query";

import { API } from "../api";

import { AxiosSecure } from "../lib/AxiosSecure";
/* Get casino banner image */
const useExchangeGame = () => {
  const { data: exchangeGame } = useQuery({
    queryKey: ["exchange"],
    queryFn: async () => {
      const res = await AxiosSecure.post(API.exchangeGames);
      const data = res?.data;
      if (data?.success) {
        return data?.result?.liveGames;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { exchangeGame };
};

export default useExchangeGame;
