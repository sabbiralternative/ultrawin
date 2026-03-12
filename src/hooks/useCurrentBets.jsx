import { useQuery } from "@tanstack/react-query";
import { API } from "../api";

import { AxiosSecure } from "../lib/AxiosSecure";

const useCurrentBets = (eventId) => {
  const { data: myBets = [], refetch: refetchCurrentBets } = useQuery({
    queryKey: ["currentBets"],
    queryFn: async () => {
      const response = await AxiosSecure.post(
        `${API.currentBets}/${eventId || "sports"}`,
      );

      const data = await response.json();

      if (data.success) {
        return data.result;
      }
    },
    gcTime: 0,
  });
  return { myBets, refetchCurrentBets };
};

export default useCurrentBets;
