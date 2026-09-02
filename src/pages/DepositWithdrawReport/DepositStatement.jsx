import { LanguageKey } from "../../const";
import useLanguage from "../../hooks/use-language";

const DepositStatement = ({ accountStatement }) => {
  const { getLanguage } = useLanguage();
  return (
    <div className="tr-table-ctn md hydrated">
      <div className="reports-ctn my-bets-ctn">
        <div className="content-ctn light-bg my-bets-content">
          <div className="myb-bets-div">
            <div className="tbl-ctn my-bets-tbl no-hov-style web-view">
              <div className="MuiPaper-root MuiTableContainer-root MuiPaper-elevation1 MuiPaper-rounded">
                <table
                  style={{ width: "100%" }}
                  className="MuiTable-root myb-table"
                >
                  <thead className="MuiTableHead-root myb-table-header trx-request-table">
                    <tr className="MuiTableRow-root trx-webView-head MuiTableRow-head">
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        {getLanguage(LanguageKey.TRANSACTION_TIME)}
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        {getLanguage(LanguageKey.TRANSACTION_ID)}
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        {getLanguage(LanguageKey.TRANSACTION_TYPE)}
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        {getLanguage(LanguageKey.AMOUNT)}
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        {getLanguage(LanguageKey.TRANSACTION_STATUS)}
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        {getLanguage(LanguageKey.NOTES)}
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        {getLanguage(LanguageKey.PAYMENT_METHODS)}
                      </th>
                    </tr>

                    {/* <tr className="MuiTableRow-root trx-mobView-head MuiTableRow-head">
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        Transaction Type
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head trx-status MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        Status
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        Amount
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall"
                        scope="col"
                      >
                        TXN ID
                      </th>
                    </tr> */}
                  </thead>
                  <tbody className="MuiTableBody-root apl-table-body trx-webView-body">
                    {accountStatement?.map((data, idx) => {
                      return (
                        <tr
                          key={idx}
                          className="MuiTableRow-root apl-table-row"
                        >
                          <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft MuiTableCell-sizeSmall">
                            {data?.date}
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft MuiTableCell-sizeSmall">
                            {data?.referenceNo}
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body text-capitalize MuiTableCell-alignLeft MuiTableCell-sizeSmall">
                            {getLanguage(LanguageKey.DEPOSIT)}
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft MuiTableCell-sizeSmall">
                            {data?.amount}
                          </td>
                          <td
                            className={`MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft MuiTableCell-sizeSmall ${
                              data?.status === "APPROVED"
                                ? "status-text-approved"
                                : ""
                            } ${
                              data?.status === "REJECTED"
                                ? "status-text-rejected"
                                : ""
                            } ${
                              data?.status === "PENDING"
                                ? "status-text-pending"
                                : ""
                            }`}
                          >
                            {data?.status}
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft MuiTableCell-sizeSmall">
                            {data?.remark}
                          </td>
                          <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft MuiTableCell-sizeSmall">
                            N/A
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile view */}
            <div className="mct-ctn mob-view">
              <div className="mct">
                <div className="mct-h">
                  <div className="mct-h-c0 mct-h-c" style={{ width: "40%" }}>
                    {getLanguage(LanguageKey.TRANSACTION_TYPE)}
                  </div>
                  <div className="mct-h-c1 mct-h-c" style={{ width: "20%" }}>
                    {getLanguage(LanguageKey.TRANSACTION_STATUS)}
                  </div>
                  <div className="mct-h-c2 mct-h-c" style={{ width: "20%" }}>
                    {getLanguage(LanguageKey.AMOUNT)}
                  </div>
                  <div className="mct-h-c3 mct-h-c" style={{ width: "20%" }}>
                    Txn ID
                  </div>
                </div>
                <div className="mct-b">
                  <div className="mct-b-r">
                    {accountStatement?.map((data, idx) => {
                      return (
                        <>
                          <div
                            key={idx}
                            className="mct-b-sr1"
                            style={{ height: "18px" }}
                          >
                            <div
                              className="mct-b-c mct-b-c0"
                              style={{ width: "40%" }}
                            >
                              <div className="mb-event-name-date">
                                <div className="b-700">
                                  {getLanguage(LanguageKey.WITHDRAW)}
                                </div>
                                {/* <div className="mb-bet-date">
                              04-11-24, 5:24:58 PM
                            </div> */}
                              </div>
                            </div>
                            <div
                              className="mct-b-c mct-b-c1"
                              style={{ width: "20%" }}
                            >
                              <div className="p-5">
                                <div
                                  className={`b-700 ${
                                    data?.status === "APPROVED"
                                      ? "status-text-approved"
                                      : ""
                                  } ${
                                    data?.status === "REJECTED"
                                      ? "status-text-rejected"
                                      : ""
                                  } ${
                                    data?.status === "PENDING"
                                      ? "status-text-pending"
                                      : ""
                                  }`}
                                >
                                  {" "}
                                  {data?.status}
                                </div>
                              </div>
                            </div>
                            <div
                              className="mct-b-c mct-b-c2"
                              style={{ width: "20%" }}
                            >
                              {data?.amount}
                            </div>
                            <div
                              className="mct-b-c mct-b-c3"
                              style={{ width: "20%" }}
                            >
                              N/A
                            </div>
                          </div>

                          <div className="mct-b-sr1">
                            <div
                              className="mct-b-c mct-b-c0"
                              style={{ width: "40%" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "5px",
                                  padding: "5px",
                                }}
                                className="display-flex"
                              >
                                <div className="b-500">
                                  {getLanguage(LanguageKey.PAYMENT_METHODS)}:
                                </div>
                                <div className="b-400">N/A</div>
                              </div>
                            </div>
                            <div
                              className="mct-b-c mct-b-c1"
                              style={{ width: "60%" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "5px",
                                  padding: "5px",
                                }}
                                className="display-flex space-between"
                              >
                                <div className="b-700">
                                  {getLanguage(LanguageKey.NOTES)}:
                                </div>
                                <div className="b-400">{data?.remark}</div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="md hydrated" />
          </div>
        </div>
        <div
          className="MuiBackdrop-root backdrop-ctn"
          aria-hidden="true"
          style={{ opacity: 0, visibility: "hidden" }}
        />
        <div
          className="MuiBackdrop-root backdrop-ctn"
          aria-hidden="true"
          style={{ opacity: 0, visibility: "hidden" }}
        />
      </div>
    </div>
  );
};

export default DepositStatement;
