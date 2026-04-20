import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useBonusMutation, useBonusQuery } from "../../hooks/bonus";
import { useEffect, useState } from "react";
import assets from "../../assets";

const LossBackClaims = () => {
  const bonusMessage = [
    "Lossback can be claimed only if you have a net loss on the specified date. If your total bets result in any profit, you are not eligible for this lossback bonus.Loss is calculated after all wins, losses, and settlements for that date.",
    "लॉसबैक का दावा केवल उसी स्थिति में किया जा सकता है जब निर्धारित तिथि पर आपका कुल शुद्ध नुकसान (नेट लॉस) हो। यदि उस दिन आपकी कुल बेटिंग का परिणाम किसी भी प्रकार का मुनाफ़ा (प्रॉफिट) दिखाता है, तो आप इस लॉसबैक बोनस के लिए पात्र नहीं होंगे। लॉस की गणना उस तिथि की सभी जीत, हार और सेटलमेंट को जोड़ने के बाद की जाएगी।",
  ];
  const navigate = useNavigate();
  const { mutate: claimBonus } = useBonusMutation();
  const { data, refetch } = useBonusQuery({
    type: "viewLossbackBonus",
    visible_on: "all",
  });

  const handleClaimBonus = (lossback_bonus_id) => {
    claimBonus(
      {
        type: "claimLossbackBonus",
        lossback_bonus_id,
        visible_on: "all",
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            refetch();
            toast.success(data?.result);
          } else {
            toast.error(data?.error);
          }
        },
      },
    );
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => {
          return (prev + 1) % bonusMessage?.length;
        });
        setFade(true);
      }, 500); // fade out duration
    }, 30000); // 30s display time

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="router-ctn">
      <div className="ds-view-ctn">
        <div className="punter-view" id="main-content">
          <div className="sports-view-ctn">
            <div
              style={{
                backgroundColor: "var(--table-bg)",
                textAlign: "start",
                marginTop: "10px",
                paddingLeft: "0.625rem", // px-2.5
                paddingRight: "0.625rem",
                paddingTop: "0.25rem", // py-1
                paddingBottom: "0.25rem",
                color: "white",
                borderRadius: "0.25rem", // rounded
                fontSize: "12px", // text-[12px]
                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", // shadow-sm
                marginLeft: "12px", // mx-2
                marginRight: "10px",
                display: "flex", // flex
                alignItems: "center", // items-center
                gap: "0.5rem", // gap-2
                transitionProperty: "opacity", // transition-opacity
                transitionDuration: "500ms", // duration-500
                opacity: fade ? 1 : 0,
                fontWeight: 500, // for font-medium in <span>
              }}
            >
              <img style={{ height: "15px" }} src={assets.info} alt="" />
              <span>{bonusMessage[currentIndex]}</span>
            </div>
            {data?.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 py-6 ">
                {data?.map((item) => {
                  return (
                    <div
                      key={item?.lossback_bonus_id}
                      className="w-full  bg-bg_color_quaternary2 rounded-lg p-4 border border-border_color_primary shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <h4 className="font-bold text-white text-[12px] mb-2 tracking-wide min-w-fit">
                          Title :
                        </h4>
                        <p className="text-white text-[12px] leading-relaxed ">
                          {item?.title}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <h4 className="font-bold text-white text-[12px] mb-2 tracking-wide min-w-fit">
                          Minimum Loss Amount :
                        </h4>
                        <p className="text-white text-[12px] leading-relaxed ">
                          {item?.minimum_loss_amount}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <h4 className="font-bold text-white text-[12px] mb-2 tracking-wide min-w-fit">
                          Maximum Bonus Amount :
                        </h4>
                        <p className="text-white text-[12px] leading-relaxed">
                          {item?.maximum_bonus_amount}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <h4 className="font-bold text-white text-[12px] mb-2 tracking-wide min-w-fit">
                          Status :
                        </h4>
                        <p
                          className={`text-[12px] leading-relaxed ${item?.status === "ACTIVE" ? "text-green-500" : item?.status === "INACTIVE" ? "text-orange-500" : "text-red-500"}`}
                        >
                          {item?.status}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <h4 className="font-bold text-white text-[12px] mb-2 tracking-wide min-w-fit">
                          Expiry :
                        </h4>
                        <p className="text-white text-[12px] leading-relaxed">
                          {item?.expires_at}
                        </p>
                      </div>
                      {item?.claim_button == 1 && (
                        <button
                          onClick={() =>
                            handleClaimBonus(item?.lossback_bonus_id)
                          }
                          className="relative overflow-hidden bg-primary py-1 px-4 rounded-md active:scale-[99%] transition-all duration-300 text-primary  text-sm font-bold"
                          type="button"
                        >
                          Claim
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {data?.length === 0 && (
              <div className="flex items-center justify-center h-full flex-col gap-4 px-4 py-6 ">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="size-16 animate-shake rotate-12"
                    fill="var(--primary-color)"
                  >
                    <path d="M190.5 68.8L225.3 128l-1.3 0-72 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40l-72 0-1.3 0 34.8-59.2C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40zM32 288l0 176c0 26.5 21.5 48 48 48l144 0 0-224L32 288zM288 512l144 0c26.5 0 48-21.5 48-48l0-176-192 0 0 224z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-black text-xs font-black">!</span>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    No Loss Back Claims Available!
                  </h3>
                  <p className="text-white text-sm max-w-sm leading-relaxed font-medium">
                    Continue playing to earn loss back bonuses! New claims are
                    typically processed on Tuesday, Wednesday, and Thursday.
                  </p>
                </div>
                <div className="w-full max-w-sm bg-bg_color_quaternary2 rounded-lg p-4 border border-border_color_primary shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm bg-bg_color_tertiary">
                      <span className="text-text_color_primary2 text-sm font-bold">
                        💡
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm mb-2 tracking-wide">
                        How Loss Back Works
                      </h4>
                      <p className="text-white text-sm leading-relaxed font-medium">
                        When you experience losses while playing, a percentage
                        gets credited back to your main balance automatically.
                        The more you play, the more you can earn back!
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="text-center">
                      <div className="size-7 rounded-full flex items-center justify-center mx-auto mb-2 bg-bg_color_tertiary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white  size-4  "
                        >
                          <path d="M16 7h6v6" />
                          <path d="m22 7-8.5 8.5-5-5L2 17" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium text-white">
                        Play Games
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="size-7 rounded-full flex items-center justify-center mx-auto mb-2 bg-bg_color_tertiary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white  size-4  "
                        >
                          <circle cx={12} cy={12} r={10} />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium text-white">
                        Auto Calculate
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="size-7 rounded-full flex items-center justify-center mx-auto mb-2 bg-bg_color_tertiary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white  size-4  "
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                          <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium text-white">
                        Get Rewarded
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="relative overflow-hidden bg-primary py-2 px-4 rounded-lg active:scale-[99%] transition-all duration-300 text-primary  text-sm font-bold"
                  type="button"
                >
                  Continue Playing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossBackClaims;
