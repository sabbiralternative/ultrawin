import { useEffect, useState } from "react";
import AddBank from "../../components/modal/bank/AddBank";
import DeleteBank from "../../components/modal/bank/DeleteBank";
import useContextState from "../../hooks/useContextState";
import assets from "../../assets";
import AddUSDTAccount from "../../components/modal/bank/AddUSDTAccount";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const BankAccounts = ({
  bankData,
  setConfirmWithdraw,
  setShowBankAccount,
  setAmount,
  refetchBankData,
  setBank,
  bank,
}) => {
  const { getLanguage } = useLanguage();
  const { addBank, setAddBank } = useContextState();
  const [removeBank, setRemoveBank] = useState("");
  const [addUSDTAccount, setAddUSDTAccount] = useState(false);

  /* select first bank by default */
  useEffect(() => {
    setBank(bankData?.[0]);
  }, [bankData, setBank]);

  return (
    <>
      {/* <div
        style={{ marginTop: "5px", backgroundColor: "var(--table-bg)" }}
        className="active-bonus-card "
      >
        <div className="active-bonus-inner-card ">
          <div className="money-text ">
            <p style={{ color: "white" }} className="">
              Free Money
            </p>
            <p style={{ color: "white" }} className="money-bal ">
              ₹{withdrawBreakdown?.freeMoney}
            </p>
          </div>
          <div className="money-text ">
            <p style={{ color: "white" }} className="">
              Active Bonus
            </p>
            <p style={{ color: "white" }} className="money-bal ">
              ₹{withdrawBreakdown?.activeBonus}
            </p>
          </div>
          <div className="progressbar ">
            <div className="progressbg " style={{ width: "3%" }}>
              <div className="progressdot "></div>
            </div>
          </div>
          <div className="wallet-msg ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className=""
            >
              <path
                d="M13.4801 3.08634C12.5267 1.99967 10.4801 1.33301 8.00008 1.33301C5.52008 1.33301 3.47341 1.99967 2.52008 3.08634C0.933411 4.92634 0.933411 11.0863 2.52008 12.913C3.47341 13.9997 5.52008 14.6663 8.00008 14.6663C10.4801 14.6663 12.5267 13.9997 13.4801 12.913C15.0667 11.073 15.0667 4.92634 13.4801 3.08634ZM8.00008 4.49967C8.1649 4.49967 8.32601 4.54855 8.46305 4.64012C8.6001 4.73168 8.70691 4.86183 8.76998 5.0141C8.83305 5.16638 8.84955 5.33393 8.8174 5.49558C8.78525 5.65723 8.70588 5.80572 8.58933 5.92226C8.47279 6.03881 8.32431 6.11817 8.16265 6.15033C8.001 6.18248 7.83345 6.16598 7.68118 6.10291C7.5289 6.03983 7.39876 5.93302 7.30719 5.79598C7.21562 5.65894 7.16675 5.49783 7.16675 5.33301C7.16675 5.11199 7.25454 4.90003 7.41082 4.74375C7.5671 4.58747 7.77907 4.49967 8.00008 4.49967ZM8.66675 11.6663H7.33341C7.1566 11.6663 6.98703 11.5961 6.86201 11.4711C6.73698 11.3461 6.66675 11.1765 6.66675 10.9997C6.66675 10.8229 6.73698 10.6533 6.86201 10.5283C6.98703 10.4032 7.1566 10.333 7.33341 10.333V8.33301C7.1566 8.33301 6.98703 8.26277 6.86201 8.13775C6.73698 8.01272 6.66675 7.84315 6.66675 7.66634C6.66675 7.48953 6.73698 7.31996 6.86201 7.19494C6.98703 7.06991 7.1566 6.99967 7.33341 6.99967H8.00008C8.17689 6.99967 8.34646 7.06991 8.47148 7.19494C8.59651 7.31996 8.66675 7.48953 8.66675 7.66634V10.333C8.84356 10.333 9.01313 10.4032 9.13815 10.5283C9.26317 10.6533 9.33341 10.8229 9.33341 10.9997C9.33341 11.1765 9.26317 11.3461 9.13815 11.4711C9.01313 11.5961 8.84356 11.6663 8.66675 11.6663Z"
                fill="#F75555"
                className=""
              ></path>
            </svg>
            <p className="">
              The free money and any active bonus funds will be removed if you
              make a withdrawal.
            </p>
          </div>
        </div>
      </div> */}
      <div
        className="dep-w-info-bc card-bg"
        style={{
          padding: "10px",
          margin: "0px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      >
        <div className="bank-account-section  ">
          <div
            onClick={() => {
              setAmount("");
              setShowBankAccount(false);
              setBank("");
            }}
            className="back-nav-bc "
          >
            <img loading="lazy" src={assets?.backArrow} alt="" className="" />
            <span
              className="back-nav-title-bc ellipsis "
              style={{ color: "white" }}
            >
              {getLanguage(LanguageKey.BACK_TO_AMOUNT)}
            </span>
          </div>

          {/*   <!-- no bank account start -->
           */}
          {/*  <!-- <div  className="bank-account-box  ">
                    <div  className="bank-account-inner ">
                        <div  className="bank-card "><img 
                                loading="lazy" src="assets/img/bank3d.svg" alt=""
                                className="">
                            <p  className="">You don't have any bank account added</p>
                            <button  className=""><span 
                                    className="">Add Bank Account</span></button>
                        </div>
                    </div>
                </div> 
                --> */}

          {/*   <!-- no bank account end --> */}

          {/*  <!-- bank account list start  --> */}

          <div
            style={{ width: "100%", gap: "1rem", display: "grid" }}
            className=" "
          >
            {bankData?.map((data, i) => {
              return (
                <div
                  onClick={() => setBank(data)}
                  key={i}
                  className={`bank-card${bankData?.length - i} ${
                    bank?.bankId === data?.bankId ? "active" : ""
                  }`}
                >
                  <div className=" bank-logo3">
                    <div className="logo ">
                      <img
                        style={{ maxWidth: "50px", width: "50px" }}
                        loading="lazy"
                        alt=""
                        className=""
                        src={assets?.bankPicture}
                      />
                      <p className=""> {data?.bankName}</p>
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
                        <span className="bank-detail-txt ">
                          {data?.bankName}
                        </span>
                      </div>
                      <div
                        onClick={() => setRemoveBank(data?.bankId)}
                        className=""
                      >
                        <img
                          loading="lazy"
                          src={assets.deleteIcon}
                          alt=""
                          className="delete-logo "
                        />
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
                        <span className="bank-detail-txt ">{data?.ifsc}</span>
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
                        <span className="bank-detail-txt ">
                          {data?.accountNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className=" bank-card3 active ">
              <div className=" bank-logo3">
                <div className="logo ">
                  <img
                    loading="lazy"
                    alt=""
                    className=""
                    src="https://s3.ap-south-1.amazonaws.com/cdn.mac1j.com/gstatic/bankIcons/ICICI_BANK.svg"
                  />
                  <p className="">test</p>
                </div>
              </div>
              <div className="bank-inner-box ">
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Bank :-</span>
                    <span className="bank-detail-txt ">ICICI Bank</span>
                  </div>
                  <div className="">
                    <img
                      loading="lazy"
                      src="assets/img/delete-icon.svg"
                      alt=""
                      className="delete-logo "
                    />
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">IFSC :-</span>
                    <span className="bank-detail-txt ">ICIC0000035</span>
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Account No :-</span>
                    <span className="bank-detail-txt ">12345678900</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bank-card2 ">
              <div className=" bank-logo2">
                <div className="logo ">
                  <img
                    loading="lazy"
                    alt=""
                    className=""
                    src="https://s3.ap-south-1.amazonaws.com/cdn.mac1j.com/gstatic/bankIcons/ICICI_BANK.svg"
                  />
                  <p className="">test test test test test</p>
                </div>
              </div>
              <div className="bank-inner-box ">
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Bank :-</span>
                    <span className="bank-detail-txt ">ICICI Bank</span>
                  </div>
                  <div className="">
                    <img
                      loading="lazy"
                      src="assets/img/delete-icon.svg"
                      alt=""
                      className="delete-logo "
                    />
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">IFSC :-</span>
                    <span className="bank-detail-txt ">ICIC0000035</span>
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Account No :-</span>
                    <span className="bank-detail-txt ">1234567899</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bank-card1 ">
              <div className=" bank-logo1">
                <div className="logo ">
                  <img
                    loading="lazy"
                    alt=""
                    className=""
                    src="https://s3.ap-south-1.amazonaws.com/cdn.mac1j.com/gstatic/bankIcons/ICICI_BANK.svg"
                  />
                  <p className="">test test</p>
                </div>
              </div>
              <div className="bank-inner-box ">
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Bank :-</span>
                    <span className="bank-detail-txt ">ICICI Bank</span>
                  </div>
                  <div className="">
                    <img
                      loading="lazy"
                      src="assets/img/delete-icon.svg"
                      alt=""
                      className="delete-logo "
                    />
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">IFSC :-</span>
                    <span className="bank-detail-txt ">ICIC0000035</span>
                  </div>
                </div>
                <div className="bank-detail ">
                  <div
                    style={{
                      width: "max-content",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className=""
                  >
                    <span className="">Account No :-</span>
                    <span className="bank-detail-txt ">1234567890</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div style={{ gap: "1rem", display: "grid" }} className=" "></div>
          <div style={{ display: "flex", gap: "0px 10px", width: "100%" }}>
            <button onClick={() => setAddBank(true)} className="plus-btn  ">
              <img
                loading="lazy"
                src="assets/img/plus-logo.svg"
                alt=""
                className=""
              />
              <span className="">
                {getLanguage(LanguageKey.ADD_BANK_ACCOUNT)}
              </span>
            </button>
            <button
              onClick={() => setAddUSDTAccount(true)}
              className="plus-btn  "
            >
              <img
                loading="lazy"
                src="assets/img/plus-logo.svg"
                alt=""
                className=""
              />
              <span className="">
                {getLanguage(LanguageKey.ADD_USDT_ACCOUNT)}
              </span>
            </button>
          </div>
          <div className="withdraw-page-buttons  ">
            <button
              onClick={() => {
                setConfirmWithdraw(true);
                setShowBankAccount(false);
              }}
              type="submit"
              className="process-btn "
              disabled={!bank}
            >
              <span className="">{getLanguage(LanguageKey.PROCEED)}</span>
            </button>
          </div>

          {/*     <!-- bank accoutn list end  --> */}
        </div>
      </div>
      {addBank && (
        <AddBank setAddBank={setAddBank} refetchBankData={refetchBankData} />
      )}
      {addUSDTAccount && (
        <AddUSDTAccount
          setAddUSDTAccount={setAddUSDTAccount}
          refetchBankData={refetchBankData}
        />
      )}
      {removeBank && (
        <DeleteBank
          refetchBankData={refetchBankData}
          setRemoveBank={setRemoveBank}
          removeBank={removeBank}
        />
      )}
    </>
  );
};

export default BankAccounts;
