import { useQuery } from "@tanstack/react-query";

import { API } from "../api";

import { AxiosSecure } from "../lib/AxiosSecure";

const useGetAllPaymentMethods = (amount) => {
  const { data: paymentMethods, refetch: refetchPaymentMethods } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: async () => {
      const bankData = {
        type: "depositMethods",

        amount,
      };

      const res = await AxiosSecure.post(API.bankAccount, bankData);
      const data = res?.data;
      if (data?.success) {
        return data?.result;
      }
    },

    gcTime: 0,
  });
  return { paymentMethods, refetchPaymentMethods };
};

export default useGetAllPaymentMethods;
