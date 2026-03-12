import { useQuery } from "@tanstack/react-query";

import { API } from "../api";

import { logout } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AxiosSecure } from "../lib/AxiosSecure";

const useBonusBalance = () => {
  const dispatch = useDispatch();
  const bonusToken = localStorage.getItem("bonusToken");
  const { data: bonusBalance = {}, refetch: refetchBonusBalance } = useQuery({
    queryKey: ["bonusBalance"],
    enabled: bonusToken ? true : false,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.balance);

      if (res?.data?.success === false && bonusToken) {
        dispatch(logout());
      }
      if (res?.data?.success && bonusToken) {
        const data = res.data?.result;
        return data;
      }
    },
  });

  return { bonusBalance, refetchBonusBalance };
};

export default useBonusBalance;
