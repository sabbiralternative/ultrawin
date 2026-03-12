import { useQuery } from "@tanstack/react-query";

import { API } from "../api";

import { AxiosSecure } from "../lib/AxiosSecure";

const useBankAccount = (payload) => {
  const { data: bankData, refetch: refetchBankData } = useQuery({
    queryKey: ["bankAccount"],

    queryFn: async () => {
      const res = await AxiosSecure.post(API.bankAccount, payload);
      const data = res?.data;

      if (data?.success) {
        return data?.result;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { bankData, refetchBankData };
};

export default useBankAccount;
