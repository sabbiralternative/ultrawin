import "./affiliate.css";
import Footer from "../../components/modules/Affiliate/Footer";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import UserList from "../../components/modules/Affiliate/UserList";
import ProfitLoss from "../../components/modules/Affiliate/ProfitLoss";
import Reports from "../../components/modules/Affiliate/Reports";
import { useLocation } from "react-router-dom";
// import ReferralStatement from "../ReferralStatement/ReferralStatement";

const Affiliate = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const tab = params.get("tab");
  return (
    <div className="router-ctn">
      <div className="ds-view-ctn">
        <div className="punter-view" id="main-content">
          <div className="sports-view-ctn">
            <div className="no-scrollbar h-full overflow-y-auto">
              <div className="px-2 w-full">
                <div className="main-content">
                  <Footer />
                  {(tab === "dashboard" || !tab) && (
                    <div data-v-4c49d924 className="">
                      <TodayStatusSection />
                      {/* <ReferralStatement /> */}
                      <InviteSection />
                      {/* <TopFiveLossUser /> */}
                      <BonusInformation />
                      <TodayProfitLoss />
                    </div>
                  )}

                  {tab === "user-list" && (
                    <div data-v-4c49d924 className="">
                      <UserList />
                    </div>
                  )}
                  {tab === "pnl" && (
                    <div data-v-4c49d924 className="">
                      <ProfitLoss />
                    </div>
                  )}
                  {tab === "reports" && (
                    <div data-v-4c49d924 className="">
                      <Reports />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
