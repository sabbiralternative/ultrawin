import { useEffect, useRef, useState } from "react";

import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";

const AddBank = ({ setAddBank, refetchBankData }) => {
  /* Handle close modal click outside */
  const addBankRef = useRef();
  useCloseModalClickOutside(addBankRef, () => {
    setAddBank(false);
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    ifsc: "",
    accountNumber: "",
  });

  /* Handle add bank function */
  const handleAddBank = async (e) => {
    e.preventDefault();
    /* generating random token for post data */
    const generatedToken = handleRandomToken();
    const bankData = {
      accountName: bankDetails.accountName,
      ifsc: bankDetails.ifsc,
      accountNumber: bankDetails.accountNumber,
      type: "addBankAccount",
      token: generatedToken,
    };

    const res = await axios.post(API.bankAccount, bankData);
    const data = res?.data;

    if (data?.success) {
      toast.success(data?.result?.message);
      if (refetchBankData) {
        refetchBankData();
      }
      //   if (refetchWithdrawData) {
      //     refetchWithdrawData();
      //   }
      setAddBank(false);
    } else {
      toast.error(data?.result?.message);
    }
  };

  const validateForm = (bankDetails) => {
    const isaccountNameFilled = bankDetails.accountName.trim() !== "";
    const isaccountNumberFilled = bankDetails.accountNumber.trim() !== "";
    const isIfscFilled = bankDetails.ifsc.trim() !== "";
    const isFormValid =
      isaccountNameFilled && isIfscFilled && isaccountNumberFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(bankDetails);
  }, [bankDetails]);
  return (
    <div className="Modal-Background  ">
      <div className="card-add-bank card-add-bank-position" ref={addBankRef}>
        <div className="card-header">
          <h2>Add Bank Account</h2>
          <div className="close-btn">
            <svg
              onClick={() => setAddBank(false)}
              width="1rem"
              height="1rem"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.91703 10.7588C2.68924 10.9867 2.68928 11.356 2.9171 11.5838C3.14493 11.8116 3.51427 11.8116 3.74206 11.5837L7.00012 8.32511L10.2584 11.5834C10.4862 11.8112 10.8556 11.8112 11.0834 11.5834C11.3112 11.3556 11.3112 10.9863 11.0834 10.7585L7.82501 7.5001L11.0832 4.24138C11.3109 4.01356 11.3109 3.64421 11.083 3.41643C10.8552 3.18864 10.4859 3.18867 10.2581 3.4165L7 6.67516L3.74166 3.41678C3.51386 3.18897 3.14451 3.18897 2.91671 3.41678C2.6889 3.64459 2.6889 4.01393 2.91671 4.24174L6.17517 7.50016L2.91703 10.7588Z"
                fill="#111827"
              ></path>
            </svg>
          </div>
        </div>
        <div className="card-body">
          <div className="bank-popup">
            <form onSubmit={handleAddBank}>
              <div className="input-box ">
                <input
                  onChange={(e) => {
                    setBankDetails({
                      ...bankDetails,
                      accountName: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter Account Holder Name"
                  name=""
                />
              </div>
              <div className="input-box ">
                <input
                  onChange={(e) => {
                    setBankDetails({
                      ...bankDetails,
                      accountNumber: e.target.value,
                    });
                  }}
                  placeholder="Enter Account Number"
                  type="text"
                />
              </div>
              <div className="input-box ">
                <input
                  onChange={(e) => {
                    setBankDetails({
                      ...bankDetails,
                      accountNumber: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  placeholder="Enter Account Number"
                />
              </div>
              <div
                onChange={(e) => {
                  setBankDetails({
                    ...bankDetails,
                    ifsc: e.target.value,
                  });
                }}
                className="input-box "
              >
                <input type="text" placeholder="IFSC0000001" name="" />
              </div>
              <div className="btn-box ">
                <button
                  onClick={() => setAddBank(false)}
                  className="cancel-btn "
                >
                  <span className="">Cancel</span>
                </button>
                <button
                  disabled={!isFormValid}
                  className="add-btn "
                  type="submit"
                >
                  <span className="">Add Bank Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBank;
