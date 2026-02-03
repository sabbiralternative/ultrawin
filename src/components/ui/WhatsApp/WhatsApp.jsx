import { useSelector } from "react-redux";
import assets from "../../../assets";
import { settings } from "../../../api";

const WhatsApp = () => {
  const { token } = useSelector((state) => state.auth);

  const navigateWhatsApp = () => {
    const link =
      token && settings?.branchWhatsapplink
        ? settings.branchWhatsapplink
        : settings?.whatsapplink;
    if (link) window.open(link, "_blank");
  };

  return (
    <>
      {settings?.whatsapplink || settings?.branchWhatsapplink ? (
        <div
          className="whatsapp-position"
          onClick={navigateWhatsApp}
          title="WhatsAppContact"
          style={{
            position: "absolute",
            cursor: "pointer",
            zIndex: 9999999,
            display: "flex",
            width: "fit-content",
            height: "fit-content",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
            transition: "all 0.5s",
          }}
        >
          <div
            style={{
              marginTop: "-3px",
              marginLeft: "-3px",
              background: "transparent",
            }}
          >
            <img style={{ height: "40px" }} src={assets.whatsapp} alt="" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WhatsApp;
