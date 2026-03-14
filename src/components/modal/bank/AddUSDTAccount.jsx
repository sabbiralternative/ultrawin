import { useEffect, useRef, useState } from "react";
import { API, settings } from "../../../api";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const AddUSDTAccount = ({ setAddUSDTAccount, refetchBankData }) => {
  /* Handle close modal click outside */
  const addBankRef = useRef();
  useCloseModalClickOutside(addBankRef, () => {
    setAddUSDTAccount(false);
  });
  const [timer, setTimer] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [isFormValid, setIsFormValid] = useState(false);
  const [mobile, setMobile] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [usdtDetails, setUsdtDetails] = useState({
    otp: "",
    usdt_type: "",
    wallet_address: "",
  });

  /* Handle add bank function */
  const handleAddBank = async (e) => {
    e.preventDefault();
    /* generating random token for post data */
    if (usdtDetails.accountNumber != usdtDetails.confirmAccountNumber) {
      return toast.error("Account number not matched!");
    }

    if (mobile && !usdtDetails.otp && settings.otp) {
      return toast.error("Please enter otp to add new account");
    }

    let payload = {
      wallet_address: usdtDetails.wallet_address,
      usdt_type: usdtDetails.usdt_type,
      type: "addUSDTAccount",
    };
    if (mobile) {
      payload.mobile = mobile;
      payload.otp = usdtDetails.otp;
      payload.orderId = orderId;
    }

    const res = await AxiosSecure.post(API.bankAccount, payload);
    const data = res?.data;

    if (data?.success) {
      setUsdtDetails({
        otp: "",
        usdt_type: "",
        wallet_address: "",
      });
      toast.success(data?.result?.message);
      if (refetchBankData) {
        refetchBankData();
      }
      //   if (refetchWithdrawData) {
      //     refetchWithdrawData();
      //   }
      setAddUSDTAccount(false);
    } else {
      toast.error(data?.result?.message);
    }
  };

  const validateForm = (usdtDetails) => {
    const isUSDTTypeFilled = usdtDetails.usdt_type.trim() !== "";
    const isWalletAddressFilled = usdtDetails.wallet_address.trim() !== "";
    const isOTPFilled = mobile ? usdtDetails.otp.trim() !== "" : true;
    const isFormValid =
      isUSDTTypeFilled && isWalletAddressFilled && isOTPFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(usdtDetails);
  }, [usdtDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      setOrderId(data?.result?.orderId);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };
  useEffect(() => {
    const getMobile = () => {
      const decode = jwtDecode(token);

      if (decode?.mobile) {
        setMobile(decode?.mobile);
      }
    };
    getMobile();
  }, [token]);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);
  return (
    <div className="Modal-Background  ">
      <div className="card-add-bank card-add-bank-position" ref={addBankRef}>
        <div className="card-header">
          <h2>Add Bank Account</h2>
          <div className="close-btn">
            <svg
              onClick={() => setAddUSDTAccount(false)}
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
                <div style={{ display: "flex", gap: "0px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <p>BEP20</p>
                    <input
                      name="usdt-type"
                      onChange={(e) => {
                        setUsdtDetails({
                          ...usdtDetails,
                          usdt_type: e.target.value,
                        });
                      }}
                      type="radio"
                      placeholder="Enter Wallet Address"
                      value="BEP20"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <p>TRC20</p>
                    <input
                      name="usdt-type"
                      onChange={(e) => {
                        setUsdtDetails({
                          ...usdtDetails,
                          usdt_type: e.target.value,
                        });
                      }}
                      type="radio"
                      placeholder="Enter Wallet Address"
                      value="TRC20"
                    />
                  </div>
                </div>
              </div>
              <div className="input-box ">
                <input
                  onChange={(e) => {
                    setUsdtDetails({
                      ...usdtDetails,
                      wallet_address: e.target.value,
                    });
                  }}
                  value={usdtDetails.wallet_address}
                  placeholder="Enter Wallet Address"
                  type="text"
                />
              </div>
              {mobile && settings.otp && (
                <div style={{ position: "relative" }} className="input-box ">
                  <input
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        setMobile(e.target.value);
                      }
                    }}
                    type="number"
                    placeholder="Phone Number"
                    value={mobile}
                  />
                  {timer ? (
                    <div
                      style={{
                        backgroundColor: "var(--color1)",
                        borderRadius: "4px",
                        padding: "6px 0px",
                        width: "80px",
                        color: "white",
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Retry in {timer}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      {/* {Settings.otpWhatsapp && (
                      <button
                        onClick={getOtpOnWhatsapp}
                        style={{
                          backgroundColor: "var(--color1)",
                          borderRadius: "4px",
                          padding: "6px 0px",
                          width: "110px",
                          color: "white",
                          fontSize: "11px",
                        }}
                        type="button"
                      >
                        Get OTP Whatsapp
                      </button>
                    )} */}
                      <button
                        onClick={getOtp}
                        style={{
                          backgroundColor: "var(--color1)",
                          borderRadius: "4px",
                          padding: "6px 0px",
                          width: "110px",
                          color: "white",
                          fontSize: "11px",
                        }}
                        type="button"
                      >
                        Get OTP Message
                      </button>
                    </div>
                  )}
                </div>
              )}
              {mobile && settings.otp && (
                <div style={{ position: "relative" }} className="input-box ">
                  <input
                    maxLength={6}
                    onChange={(e) => {
                      setUsdtDetails({
                        ...usdtDetails,
                        otp: e.target.value,
                      });
                    }}
                    value={usdtDetails.otp}
                    placeholder="Enter OTP"
                  />
                </div>
              )}

              <div className="btn-box ">
                <button
                  onClick={() => setAddUSDTAccount(false)}
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

export default AddUSDTAccount;
