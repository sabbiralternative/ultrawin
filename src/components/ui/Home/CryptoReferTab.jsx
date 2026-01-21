import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import assets from "../../../assets";

const CryptoReferTab = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigate = () =>
    token ? navigate("/affiliate") : dispatch(setShowLoginModal(true));

  return (
    <div className="w-full grid  gap-2 grid-cols-2">
      <div>
        <div
          onClick={() => {
            window.open(
              "https://onramp.money/main/buy/?appId=1&mode=overlay&origin=https://onramp.money&defaultCoinCode=USDT",
            );
          }}
          id="add Crypto"
          title="Add Crypto"
          className="relative overflow-hidden bg_color_secondary border shadow-sm hover:shadow-md transition-all duration-300 group rounded-md py-2 px-3 cursor-pointer active:scale-95 font-sans border_color_secondary "
        >
          <div className="flex items-center gap-3 relative">
            <div className="relative flex-shrink-0 group-hover:animate-shake">
              <div className="relative overflow-hidden size-7 xs1:size-8 rounded-xl flex items-center justify-center">
                <img
                  src={assets.usdt}
                  alt="usdt"
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 625px"
                  className="  min-w-full min-h-full max-w-full max-h-full object-contain"
                  loading="eager"
                  width={18}
                  height={18}
                  title="usdt - 10Sports"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-text_color_primary leading-tight truncate">
                Buy Crypto
              </div>
              <div className="text-x  xs1:text-xs text-text_color_primary truncate">
                USDT, BTC, etc.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div onClick={handleNavigate} className="group">
        <div
          id="referAndEarnCard"
          title="Refer & Earn"
          className="relative overflow-hidden bg_color_secondary  border border-primary shadow-sm hover:shadow-md transition-all duration-300 group rounded-md py-2 px-3 cursor-pointer active:scale-95 font-sans"
        >
          <div className="flex items-center gap-3 relative">
            <div className="relative flex-shrink-0 group-hover:animate-shake">
              <div className="size-7 xs1:size-8 rounded-xl bg-primary flex items-center justify-center shadow-md">
                <svg
                  className=" size-4 xs1:size-5 text-primary"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x={3} y={8} width={18} height={4} rx={1} />
                  <path d="M12 8v13" />
                  <path d="M19 12v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9" />
                  <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-text_color_primary1 leading-tight truncate">
                Refer &amp; Earn
              </div>
              <div className="text-x  xs1:text-xs truncate">
                Earn commissions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoReferTab;
