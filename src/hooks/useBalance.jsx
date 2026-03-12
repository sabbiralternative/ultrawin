import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { logout, userToken } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AxiosSecure } from "../lib/AxiosSecure";

const useBalance = () => {
  const dispatch = useDispatch();
  const token = useSelector(userToken);
  const { data: balance = {}, refetch: refetchBalance } = useQuery({
    queryKey: ["balance"],
    enabled: token ? true : false,
    queryFn: async () => {
      const res = await AxiosSecure.post(API.balance);

      if (res?.data?.success === false && token) {
        dispatch(logout());
      }
      if (res?.data?.success && token) {
        const data = res.data?.result;
        return data;
      }
    },
  });

  return { balance, refetchBalance };
};

export default useBalance;
