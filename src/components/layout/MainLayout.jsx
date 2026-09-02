import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import LeftSidebar from "../ui/LeftSidebar/LeftSidebar";
import MobileHeader from "../shared/Header/MobileHeader";
import MobileSidebar from "../ui/LeftSidebar/MobileSidebar";
import { settings } from "../../api";

const MainLayout = () => {
  return (
    <>
      <meta name="description" content={settings.metaDescription} />
      <meta name="keywords" content={settings.metaKeywords} />
      <div className="MuiBox-root jss31"></div>
      <div className="ion-app md ion-page hydrated">
        <div className="web-view" style={{ position: "fixed" }}>
          <LeftSidebar />
        </div>
        <div className="support">
          <Header />

          <div
            style={{
              marginBottom: "75px",
              height: "100%",
              minHeight: "calc(100vh - 150px)",
            }}
          >
            <Outlet />
          </div>
          {/* <div className="rules-regulations-footer">
            <div>Rules &amp; Regulations © 2024</div>
          </div> */}
          <MobileHeader />
        </div>
      </div>
      <MobileSidebar />
    </>
  );
};

export default MainLayout;
