import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import LeftSidebar from "../ui/LeftSidebar/LeftSidebar";
import MobileHeader from "../shared/Header/MobileHeader";
import MobileSidebar from "../ui/LeftSidebar/MobileSidebar";
import { settings } from "../../api";

const MainLayout = () => {
  return (
    <>
      {Settings.metaDescription && (
        <meta name="description" content={Settings.metaDescription} />
      )}
      {Settings.metaKeywords && (
        <meta name="keywords" content={Settings.metaKeywords} />
      )}
      {Settings.gscTag && (
        <meta name="google-site-verification" content={Settings.gscTag} />
      )}
      {Settings.metaTitle && <title>{Settings.metaTitle}</title>}
      <meta name="robots" content="index, follow" />
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
