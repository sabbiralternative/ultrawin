import { useQuery } from "@tanstack/react-query";

import { API } from "../api";

import { AxiosSecure } from "../lib/AxiosSecure";
/* passbook api */
const useBettingProfitLoss = () => {
  /* from date 7 days earlier */
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  /* current date */
  const toDate = new Date().toISOString().split("T")[0];
  const { data } = useQuery({
    queryKey: ["passbook"],
    /* enable when token loading */
    queryFn: async () => {
      const payload = {
        from: fromDate,
        to: toDate,
        type: "GR",
      };
      const res = await AxiosSecure.post(API.accountStatement, payload);
      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { data };
};

export default useBettingProfitLoss;
