import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../api";
import handleDecryptData from "../utils/handleDecryptData";

const useSportsBook = (group) => {
  const {
    data,
    refetch: refetchSports,
    isLoading,
  } = useQuery({
    queryKey: ["sports", group],
    enabled: group !== null ? true : false,
    queryFn: async () => {
      const res = await axios.get(`${API.groupSportsBook}/${group}`, {
        headers: {
          "Cache-Control": "public",
          "max-age": 1,
        },
      });
      const data = res.data;
      if (data?.ct) {
        return handleDecryptData(JSON.stringify(data));
      } else {
        return data;
      }
    },

    refetchInterval: 2000,
  });

  return { data, refetchSports, isLoading };
};

export default useSportsBook;
