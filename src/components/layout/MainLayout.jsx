import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import LeftSidebar from "../ui/LeftSidebar/LeftSidebar";
import MobileHeader from "../shared/Header/MobileHeader";
import MobileSidebar from "../ui/LeftSidebar/MobileSidebar";

const MainLayout = () => {
  return (
    <>
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
              // minHeight: "calc(100vh - 114px)",
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
