import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetIndex } from "../../hooks";
import moment from "moment";

const AffiliateUserProfitLoss = () => {
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  const toDate = new Date().toISOString().split("T")[0];
  const { token } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const punter_id = params.get("punter_id");
  const { data } = useGetIndex({
    type: "get_affiliate_pl",
    punter_id,
    from_date: fromDate,
    to_date: toDate,
  });

  const getUniqueDate = Array.from(
    new Set(data?.result?.map((item) => item?.settledTime)),
  );
  return (
    <div className="router-ctn">
      <div className="ds-view-ctn">
        <div className="punter-view" id="main-content">
          <div className="sports-view-ctn">
            <div className="flex flex-col h-full">
              <div className="pt-2 lg:pt-0 border-t border-border_color_primary lg:border-none">
                <div className="relative w-full" />
              </div>
              {token && getUniqueDate?.length > 0 ? (
                getUniqueDate?.map((category) => {
                  const filterData = data?.result?.filter(
                    (item) => item.settledTime === category,
                  );
                  const totalPnl = filterData?.reduce((acc, curr) => {
                    return acc + Number(curr.memberWin);
                  }, 0);
                  return (
                    <div
                      key={category}
                      title="Profit & Loss Statement"
                      className="w-full px-1 my-1.5 font "
                    >
                      <div className="w-full rounded-[4px] flex items-center justify-between px-2.5 py-[9px] bg-primary">
                        <div className="text-xs text-primary  font-[600] leading-[140%]">
                          {moment(category).format("Do-MMM-YYYY")}
                        </div>
                        <div className="text-xs text-text_color_primary2  font-[600] flex items-center justify-center leading-[140%]">
                          <span className="text-primary">Total PL</span>
                          <span className="-mt-0.5 ml-1 text-primary">:</span>
                          <span
                            className={`ml-1 ${
                              totalPnl > 0
                                ? "text-green-500"
                                : totalPnl < 0
                                  ? "text-red-500"
                                  : "text-white"
                            }`}
                            style={{ textShadow: "1px 1px #000000" }}
                          >
                            {totalPnl}
                          </span>
                        </div>
                      </div>
                      {filterData?.map((item) => (
                        <div
                          key={item?.eventId}
                          className="w-full flex bg_color_secondary  text-white active:scale-95 transition-all ease-in-out duration-200 flex-col rounded-[4px] items-center justify-start gap-y-1 my-1 shadow-md cursor-pointer"
                        >
                          <div className="w-full text-start   px-2.5 py-2 text-xs font-[550] capitalize flex items-center justify-between">
                            <span>{item?.narration}</span>
                            <span className="text-gray-400">{item?.time}</span>
                          </div>
                          <div className="w-full bg-bg_color_tertiary1 px-2.5 py-2 flex items-center justify-between  text-xs sm:text-sm">
                            <span className=" w-1/2 border-r border-r-gray-600 flex items-center justify-start gap-x-1">
                              <span>PL:</span>
                              <span
                                className={`font-semibold  ${
                                  item?.memberWin > 0
                                    ? "text-text_color_success"
                                    : item?.memberWin < 0
                                      ? "text-text_color_danger"
                                      : "text-black"
                                }`}
                              >
                                ₹ {item?.memberWin}
                              </span>
                            </span>
                            <span className="w-1/2 flex items-center justify-end gap-x-1">
                              <span>Balance:</span>
                              <span className="font-semibold ">
                                ₹ {item?.balance}
                              </span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center w-full pt-20">
                  <h2 className="text-base text-white">
                    No betting profit and loss yet!
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateUserProfitLoss;
