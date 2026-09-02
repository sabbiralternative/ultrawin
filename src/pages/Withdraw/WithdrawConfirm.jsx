import { useState } from "react";
import WithdrawSuccess from "../../components/modal/WithdrawSuccess";
import { API } from "../../api";
import toast from "react-hot-toast";
import assets from "../../assets";
import { AxiosSecure } from "../../lib/AxiosSecure";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const WithdrawConfirm = ({
  bank,
  amount,
  setBank,
  setAmount,
  setShowBankAccount,
  setConfirmWithdraw,
}) => {
  const { getLanguage } = useLanguage();
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const [disable, setDisable] = useState(false);
  /* handle withdraw function */
  const handleCoinSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (amount?.length > 0 && bank) {
      const bankData = {
        type: "withdrawCoins",
        amount: amount,
        bankId: bank?.bankId,
      };

      const res = await AxiosSecure.post(API.bankAccount, bankData);
      const data = res?.data;

      if (data?.success) {
        toast.success(data?.result?.message);
        setWithdrawSuccess(true);
      } else {
        toast.error(data?.error?.errorMessage);
      }
    }
  };
  return (
    <>
      <div
        className="withdraw-account card-bg"
        style={{
          padding: "10px",
          margin: "0px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      >
        <div
          onClick={() => {
            setShowBankAccount(true);
            setConfirmWithdraw(false);
          }}
          className="back-nav-bc "
        >
          <img loading="lazy" src={assets.backArrow} alt="" className="" />
          <span
            style={{ color: "white" }}
            className="back-nav-title-bc ellipsis "
          >
            {getLanguage(LanguageKey.BACK_TO_SELECT_ACCOUNT)}
          </span>
        </div>
        <div className="withdraw-amount ">
          <span style={{ color: "white" }} className="">
            {getLanguage(LanguageKey.WITHDRAWL_AMOUNT)}
          </span>
          <div
            style={{ cursor: "pointer" }}
            className="edit-logo"
            onClick={() => {
              setBank("");
              setShowBankAccount(false);
              setConfirmWithdraw(false);
              setAmount("");
            }}
          >
            <img loading="lazy" src={assets.edit} alt="" className="" />
          </div>
        </div>
        <input
          style={{ color: "white" }}
          type="text"
          name=""
          className=""
          defaultValue={amount}
          disabled
        />
        <div className="bank-account ">
          <span style={{ color: "white" }} className="">
            {getLanguage(LanguageKey.BANK_ACCOUNT)}
          </span>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowBankAccount(true);
              setConfirmWithdraw(false);
            }}
            className="edit-logo "
          >
            <img loading="lazy" src={assets.edit} alt="" className="" />
          </div>
        </div>
        <div className="bank-card1 ">
          <div className="bank-logo1 ">
            <div className="logo ">
              <img
                style={{ maxWidth: "50px", width: "50px" }}
                loading="lazy"
                alt=""
                className=""
                src={assets?.bankPicture}
              />
              <p className="">{bank?.bankName}</p>
            </div>
          </div>
          <div className="bank-inner-box ">
            <div className="bank-detail ">
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  flexDirection: "row",
                  color: "white",
                }}
                className=""
              >
                <span className="">
                  {getLanguage(LanguageKey.BANK_NAME)} :-
                </span>
                <span style={{ marginLeft: "0.2rem" }} className="">
                  {bank?.bankName}
                </span>
              </div>
            </div>
            <div className="bank-detail ">
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  flexDirection: "row",
                  color: "white",
                }}
                className=""
              >
                <span className="">
                  {getLanguage(LanguageKey.IFSC_CODE)} :-
                </span>
                <span style={{ marginLeft: "0.2rem" }} className="">
                  {bank?.ifsc}
                </span>
              </div>
            </div>
            <div className="bank-detail ">
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  flexDirection: "row",
                  color: "white",
                }}
                className=""
              >
                <span className="">
                  {getLanguage(LanguageKey.ACCOUNT_NUMBER)} :-
                </span>
                <span className="bank-detail-txt "> {bank?.accountNumber}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={disable}
          style={{ cursor: disable ? "not-allowed" : "pointer" }}
          onClick={handleCoinSubmit}
          className="proceed-btn "
        >
          <span className="">{getLanguage(LanguageKey.PROCEED)}</span>
        </button>
      </div>
      {withdrawSuccess && (
        <WithdrawSuccess setWithdrawSuccess={setWithdrawSuccess} />
      )}
    </>
  );
};

export default WithdrawConfirm;
