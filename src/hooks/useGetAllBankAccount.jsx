import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useGetAllBankAccount = () => {
  const { data: bankAccounts, refetch: refetchBankAccounts } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: async () => {
      const bankData = {
        type: "getBankAccounts",
        status: "1",
      };

      const res = await AxiosSecure.post(API.bankAccount, bankData);
      const data = res?.data;

      if (data?.success) {
        return data?.result;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { bankAccounts, refetchBankAccounts };
};

export default useGetAllBankAccount;
