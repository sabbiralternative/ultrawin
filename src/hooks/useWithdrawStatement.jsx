import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../api";

/* withdraw api */
const useWithdrawStatement = () => {
  /* from date 7 days earlier */
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  /* current date */
  const toDate = new Date().toISOString().split("T")[0];

  const { data: withdrawStatement = [] } = useQuery({
    queryKey: ["withdraw-statement"],
    /* enable when token available */

    queryFn: async () => {
      /* Encrypt post data */
      const payload = {
        from: fromDate,
        to: toDate,
        type: "WITHDRAW",
        status: "ALL",
      };
      const res = await axios.post(API.accountStatement, payload);
      const data = res?.data;

      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
  return { withdrawStatement };
};

export default useWithdrawStatement;
