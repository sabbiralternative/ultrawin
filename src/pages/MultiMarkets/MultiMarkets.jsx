import assets from "../../assets";
import { LanguageKey } from "../../const";
import useLanguage from "../../hooks/use-language";

const MultiMarkets = () => {
  const { getLanguage } = useLanguage();
  return (
    <div className="router-ctn">
      <div className="ds-view-ctn">
        <div className="punter-view" id="main-content">
          <div className="sports-view-ctn">
            <div className="eam-ctn md hydrated">
              <div className="eam-events-table-section md hydrated">
                <div className="casino-header-ctn mt-12">
                  <div className="casino-heading">
                    <div className="casino-icon-img">
                      <img src={assets.multipin} />
                    </div>
                    {getLanguage(LanguageKey.MULTI_MARKET)}
                  </div>
                  <div className="casino-search-ctn">
                    <div className="eventTypes-menu-tabs" />
                  </div>
                </div>
                <div className="nd-ctn">
                  <div className="nd-sub-ctn">
                    <div className="nd-img">
                      <img src={assets.no_multi_market_icon} alt="" />
                    </div>
                    <div className="nd-title">No Market Followed</div>
                    <div className="nd-bc">
                      There is currently no multi-market followed.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiMarkets;
